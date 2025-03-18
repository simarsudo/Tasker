package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/middleware"
)

func RegisterRoutes(server *gin.Engine) {
	v1 := server.Group("/api/v1")

	// Public routes
	v1.GET("/get-invitation-details", GetInvitationDetails)
	v1.POST("/join-team-using-invite-link", JoinTeamUsingInviteLink)

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
	protected.GET("/get-current-project/:projectid", GetUserSidebarData)
	protected.GET("/get-project-team-members", GetProjectTeamMembers)
	protected.POST("/invite-team-member", InviteTeamMember)
	protected.POST("/change-user-role", ChangeUserRole)
	protected.POST("/create-new-task", CreateNewTask)
	protected.GET("/get-project-tasks", GetProjectTasks)
	protected.POST("/update-task-status", UpdateTaskStatus)
	protected.POST("/reassign-task", ReassignTask)
}
