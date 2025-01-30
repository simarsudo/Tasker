package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/models"
)

func RegisterRoutes(server *gin.Engine) {
	server.POST("/login", login)
	server.POST("/register", register)
}

func login(ctx *gin.Context) {
	var user models.User

	err := ctx.ShouldBindJSON(&user)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = user.GetUser()

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User logged in", "user": user})
}

func register(ctx *gin.Context) {
	var user models.User

	err := ctx.ShouldBindJSON(&user)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = user.Register()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save user"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User created"})
}
