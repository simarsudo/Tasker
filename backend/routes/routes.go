package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/utils"
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
		validationErrors := utils.GenerateValidationErros(err)

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
	var user models.User

	err := ctx.ShouldBindJSON(&user)

	if err != nil {
		validationErrors := utils.GenerateValidationErros(err)

		ctx.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	err = user.Register()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save user"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User created"})
}
