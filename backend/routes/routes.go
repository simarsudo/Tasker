package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/middleware"
)

func RegisterRoutes(server *gin.Engine) {
	v1 := server.Group("/api/v1")

	// Public routes
	auth := v1.Group("/auth")
	{
		auth.POST("/login", Login)
		auth.POST("/signup", Signup)
	}

	// Protected routes
	protected := v1.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/auth/logout", Logout)

		protected.GET("/test", test)
	}
}

// TODO: Remove this route
func test(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "You are authorized"})
}
