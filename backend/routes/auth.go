package routes

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/utils"
	"gorm.io/gorm"
)

func Login(ctx *gin.Context) {
	var loginReq models.LoginRequest

	if err := ctx.ShouldBindJSON(&loginReq); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	user, err := models.GetUserByEmail(loginReq.Email)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": utils.InvalidCredentials})
		return
	}

	if !user.VerifyPassword(loginReq.Password) {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": utils.InvalidCredentials})
		return
	}

	token, err := utils.GenerateToken(user.Email, int64(user.ID))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	utils.SetCookie(ctx, "token", token)
	utils.SetCookie(ctx, "currentProject", fmt.Sprintf("%d", *user.DefaultProjectID), false)
	ctx.JSON(http.StatusOK, gin.H{"currentProject": user.DefaultProjectID})
}

func Logout(ctx *gin.Context) {
	utils.DeleteCookie(ctx, "token")
	utils.DeleteCookie(ctx, "currentProject")

	ctx.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

func Signup(ctx *gin.Context) {
	var userRegistration models.UserRegistration

	err := ctx.ShouldBindJSON(&userRegistration)

	if err != nil {
		validationErrors := utils.GenerateValidationErrors(err)

		// Checks for confirm password field error and change the message
		if _, ok := validationErrors["confirmpassword"]; ok {
			validationErrors["confirmpassword"] = "Passwords do not match"
		}

		ctx.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	// Map the validated data to the User model
	user := models.User{
		Email:         userRegistration.Email,
		Password:      userRegistration.Password,
		FirstName:     userRegistration.FirstName,
		LastName:      userRegistration.LastName,
		ContactNumber: userRegistration.ContactNumber,
	}

	// Hash the user's password
	if err := user.HashPassword(); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	result := db.DB.Create(&user)

	if result.Error != nil {
		// Check if the error is due to a duplicate key (user already exists)
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			ctx.JSON(http.StatusConflict, gin.H{"error": utils.AccountAlreadyExist})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		}
		return
	}

	token, err := utils.GenerateToken(user.Email, int64(user.ID))

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	utils.SetCookie(ctx, "token", token)

	emailParts := strings.Split(strings.ToLower(user.Email), "@")

	emailDomain := emailParts[len(emailParts)-1]

	var company models.Company

	result2 := db.DB.First(&company, &models.Company{EmailDomain: emailDomain})

	if errors.Is(result2.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusOK, gin.H{"redirectLink": "register"})
	} else {
		ctx.JSON(http.StatusOK, gin.H{"redirectLink": "dashboard"})
	}
}
