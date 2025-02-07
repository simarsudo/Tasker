package routes

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/middleware"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/utils"
	"gorm.io/gorm"
)

func RegisterRoutes(server *gin.Engine) {
	v1 := server.Group("/api/v1")

	// Public routes
	auth := v1.Group("/auth")
	{
		auth.POST("/login", login)
		auth.POST("/signup", signup)
	}

	// Protected routes
	protected := v1.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/auth/logout", logout)

		protected.GET("/test", test)
	}
}

func test(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "You are authorized"})
}

func login(ctx *gin.Context) {
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
	ctx.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

func logout(ctx *gin.Context) {
	utils.DeleteCookie(ctx, "token")

	ctx.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

func signup(ctx *gin.Context) {
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

	ctx.JSON(http.StatusOK, gin.H{"message": "User signed up"})
}
