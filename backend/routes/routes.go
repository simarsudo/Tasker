package routes

import (
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

	protected.POST("/auth/logout", Logout)
	protected.GET("/register-company", RegisterCompanyEmailDomain)
	protected.POST("/register-company", RegisterCompany)
	protected.POST("/create-project", CreateProject)
	protected.GET("/get-current-project", GetUserProjects)
	protected.POST("/invite-team-member", InviteTeamMember)
}
