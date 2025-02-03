package routes

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/utils"
	"gorm.io/gorm"
)

func RegisterRoutes(server *gin.Engine) {
	server.POST("/login", login)
	server.POST("/register", register)

	// TODO: Look for token invalidation logic for protected routes
}

func login(ctx *gin.Context) {
	// TODO: Save the user token in db
	var user models.User

	err := ctx.ShouldBindJSON(&user)

	if err != nil {
		validationErrors := utils.GenerateValidationErrors(err)

		ctx.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	err = user.GetUser()

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := utils.GenerateToken(user.Email, int64(user.ID))

	// TODO: Move common messages to common file
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "There was an error while loggin in please try again"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User logged in", "token": token})
}

func register(ctx *gin.Context) {
	// FIXME: Integrate frontend and check for any missing case
	var userRegistration models.UserRegistration

	err := ctx.ShouldBindJSON(&userRegistration)

	if err != nil {
		validationErrors := utils.GenerateValidationErrors(err)

		// Check for confirm password field error and change the message
		if _, ok := validationErrors["confirmpassword"]; ok {
			validationErrors["confirmpassword"] = "Passwords do not match"
		}

		ctx.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	// Map the validated data to the User model
	user := models.User{
		Email:    userRegistration.Email,
		Password: userRegistration.Password,
		Name:     userRegistration.Name,
	}

	result := db.DB.Create(&user)

	if result.Error != nil {
		// Check if the error is due to a duplicate key (user already exists)
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			ctx.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		} else {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": utils.UnknownError})
		}
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User created"})
}
