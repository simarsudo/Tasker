package routes

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/common"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/forms"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/types"
	"github.com/simarsudo/tasker/utils"
	"gorm.io/gorm"
)

func RegisterCompanyEmailDomain(c *gin.Context) {
	userID, exist := c.Get("userID")
	if !exist {
		c.Status(http.StatusUnauthorized)
		return
	}

	var user models.User
	if result2 := db.DB.First(&user, userID.(int64)); result2.Error != nil {
		c.Status(http.StatusUnauthorized)
		return
	}

	emailDomainParts := strings.Split(user.Email, "@")

	emailDomain := emailDomainParts[len(emailDomainParts)-1]

	c.JSON(http.StatusOK, gin.H{
		"emailDomain": emailDomain,
	})
}

func RegisterCompany(c *gin.Context) {
	var companyInfo forms.CompanyRegistrationForm

	err := c.ShouldBindJSON(&companyInfo)

	if err != nil {
		validationErrors := utils.GenerateValidationErrors(err)

		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	userID, exist := c.Get("userID")
	if !exist {
		c.Status(http.StatusUnauthorized)
		return
	}

	var user models.User
	if result2 := db.DB.First(&user, userID.(int64)); result2.Error != nil {
		c.Status(http.StatusUnauthorized)
		return
	}

	emailDomainParts := strings.Split(user.Email, "@")

	emailDomain := emailDomainParts[len(emailDomainParts)-1]

	company := models.Company{
		Name:        companyInfo.CompanyName,
		WebsiteLink: companyInfo.Website,
		CompanySize: companyInfo.CompanySize,
		EmailDomain: emailDomain,
		CompanyAddress: models.CompanyAddress{
			Address: companyInfo.Address,
			City:    companyInfo.City,
			State:   companyInfo.State,
			ZipCode: companyInfo.ZipCode,
		},
		ContactDetails: models.CompanyContactDetails{
			Name:  companyInfo.ContactPersonName,
			Role:  companyInfo.ContactPersonRole,
			Email: companyInfo.ContactPersonEmail,
			Phone: companyInfo.ContactPersonPhone,
		},
	}

	result := db.DB.Create(&company)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	user.CompanyID = &company.ID
	if result3 := db.DB.Save(&user); result3.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": "Company registered and user updated",
	})
}

func CreateProject(c *gin.Context) {
	userID, _ := c.Get("userID")

	userIDInt := userID.(uint)

	var user models.User
	db.DB.Preload("Company").First(&user, userIDInt)

	var newProject forms.NewProjectForm
	if err := c.ShouldBindJSON(&newProject); err != nil {
		validationErrors := utils.GenerateValidationErrors(err)
		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	// Starting transaction
	tx := db.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	project := models.CompanyProject{
		ProjectName:        newProject.ProjectName,
		ProjectDescription: newProject.ProjectDescription,
		CompanyID:          user.Company.ID,
		CreatedByID:        user.ID,
	}

	if result := tx.Create(&project); result.Error != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	if err := tx.Model(&user).Updates(models.User{DefaultProjectID: &project.ID}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	teamMembers := models.TeamMember{
		UserID:    user.ID,
		ProjectID: project.ID,
		Role:      types.AdminRole,
	}

	if result := tx.Create(&teamMembers); result.Error != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	utils.SetCookie(c, "currentProject", fmt.Sprintf("%d", *user.DefaultProjectID), false)

	c.Status(http.StatusOK)
}

func GetUserSidebarData(c *gin.Context) {
	user, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}

	projectID := c.Param("projectid")

	projectid, err := strconv.ParseInt(projectID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot process ID"})
		return
	}

	type ProjectInfo struct {
		ID          uint   `json:"id"`
		ProjectName string `json:"projectName"`
	}

	var projects []ProjectInfo

	// FIXME: check if better can be implemented
	// Query only the specific fields we need
	if err := db.DB.Table("company_projects").
		Select("company_projects.id, company_projects.project_name").
		Joins("JOIN team_members ON team_members.project_id = company_projects.id").
		Where("team_members.user_id = ?", user.ID).
		Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	if len(projects) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No projects found"})
		return
	}

	teamMember := models.TeamMember{
		UserID:    user.ID,
		ProjectID: uint(projectid),
	}

	if result := db.DB.Select("role").
		Where("user_id = ? AND project_id = ?", user.ID, uint(projectid)).
		First(&teamMember); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found in team"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"projects": projects,
		"userData": map[string]any{
			"id":       user.ID,
			"fullName": user.FirstName + " " + user.LastName,
			"email":    user.Email,
			"role":     teamMember.Role,
		},
	})
}

func GetProjectTeamMembers(c *gin.Context) {
	_, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}

	projectID := c.Query("projectID")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "projectID query parameter is required"})
		return
	}

	onlyNames := c.Query("onlyNames")

	// Create a struct to hold only the fields we want to return
	type TeamMemberInfo struct {
		ID       uint   `json:"id"`
		UserID   uint   `json:"userID"`
		Email    string `json:"email,omitempty"`
		FullName string `json:"fullName"`
		Role     string `json:"role,omitempty"`
	}

	var teamMembers []TeamMemberInfo

	query := db.DB.Model(&models.TeamMember{}).
		Joins("JOIN users ON users.id = team_members.user_id").
		Where("team_members.project_id = ?", projectID)

	if onlyNames == "1" {
		query = query.Select("team_members.id, user_id, CONCAT(users.first_name, ' ', users.last_name) as full_name")
	} else {
		query = query.Select("team_members.id, user_id, users.email, CONCAT(users.first_name, ' ', users.last_name) as full_name, team_members.role")
	}

	err := query.Scan(&teamMembers).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch team members"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"teamMembers": teamMembers,
	})
}

func InviteTeamMember(c *gin.Context) {
	_, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}

	var invitationDetails forms.InvitationForm

	if err := c.ShouldBindJSON(&invitationDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	type TeamMemberInfo struct {
		Email string `json:"email"`
	}

	var teamMembers []TeamMemberInfo

	err := db.DB.Model(&models.TeamMember{}).
		Joins("JOIN users ON users.id = team_members.user_id").
		Select("users.email, users.id").
		Where("users.email = ?", invitationDetails.Email).
		Scan(&teamMembers).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	if len(teamMembers) == 0 {
		// CASE: User is not in the team
		var existingInvitation models.Invitation
		err := db.DB.Where("email = ? AND project_id = ?", invitationDetails.Email, invitationDetails.ProjectID).First(&existingInvitation).Error

		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check existing invitation"})
			return
		}

		//  Case: User is already invited
		if existingInvitation.ID != 0 {
			c.JSON(http.StatusOK, gin.H{"inviteURL": common.BaseInvitationURL + existingInvitation.Token, "alreadySend": false})
			return
		}

		// Case: If invitation is being send for the first time
		invitation := models.Invitation{
			Email:     invitationDetails.Email,
			Status:    types.PendingStatus,
			Role:      invitationDetails.Role,
			ProjectID: invitationDetails.ProjectID,
		}

		if result := db.DB.Create(&invitation); result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
			return
		}

		c.JSON(http.StatusOK, gin.H{"inviteURL": common.BaseInvitationURL + invitation.Token, "alreadySend": false})
	} else {
		// CASE: User is already in the team which means we cannot reinvite the user
		c.JSON(http.StatusBadRequest, gin.H{"error": "The user is already a member of the team"})
	}
}

func GetInvitationDetails(c *gin.Context) {
	token := c.Query("token")

	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "token is required"})
		return
	}

	var existingInvitation models.Invitation
	err := db.DB.Select("email").Where("token = ?", token).First(&existingInvitation).Error

	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "invitation token is invalid"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	c.JSON(http.StatusOK, gin.H{"email": existingInvitation.Email})
}

func JoinTeamUsingInviteLink(c *gin.Context) {
	// Define a struct to hold the registration data and token
	var registrationData struct {
		forms.UserRegistrationForm
		Token string `json:"token" binding:"required"`
	}

	// Bind the JSON input to the registrationData struct
	if err := c.ShouldBindJSON(&registrationData); err != nil {
		validationErrors := utils.GenerateValidationErrors(err)

		// Check for confirm password field error and change the message
		if _, ok := validationErrors["confirmpassword"]; ok {
			validationErrors["confirmpassword"] = "Passwords do not match"
		}

		// Return validation errors
		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	// Check the database if the invitation token is valid
	var existingInvitation models.Invitation
	err := db.DB.Select("email", "project_id", "role").
		Where("token = ?", registrationData.Token).
		First(&existingInvitation).Error

	// Handle errors for invalid or not found token
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "invitation token is invalid"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	// Start a transaction for user registration
	tx := db.DB.Begin()

	// Fetch the project associated with the invitation
	var project models.CompanyProject
	if err := tx.First(&project, existingInvitation.ProjectID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	// Create a new user with the registration data
	user := models.User{
		Email:            registrationData.Email,
		Password:         registrationData.Password,
		FirstName:        registrationData.FirstName,
		LastName:         registrationData.LastName,
		ContactNumber:    registrationData.ContactNumber,
		DefaultProjectID: &existingInvitation.ProjectID,
		CompanyID:        &project.CompanyID,
	}

	// Hash the user's password
	if err := user.HashPassword(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	// Save the new user to the database
	if result := tx.Create(&user); result.Error != nil {
		tx.Rollback()
		// Check if the error is due to a duplicate key (user already exists)
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			c.JSON(http.StatusConflict, gin.H{"error": utils.AccountAlreadyExist})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		}
		return
	}

	// Add the user to the team
	teamMembers := models.TeamMember{
		UserID:    user.ID,
		ProjectID: project.ID,
		Role:      existingInvitation.Role,
	}

	// Save the team member to the database
	if result := tx.Create(&teamMembers); result.Error != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
	}

	// Update the invitation status to accepted
	if err := tx.Model(&existingInvitation).
		Where("token", registrationData.Token).
		Update("status", types.AcceptedStatus).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	// Generate a token for the new user
	token, err := utils.GenerateToken(user.Email, int64(user.ID))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	// Set cookies for the token and current project
	utils.SetCookie(c, "token", token)
	utils.SetCookie(c, "currentProject", fmt.Sprintf("%d", *user.DefaultProjectID), false)

	// Return a success response with a redirect link
	c.JSON(http.StatusOK, gin.H{"redirectLink": fmt.Sprintf("dashboard/projects/%d", *user.DefaultProjectID)})
}

func ChangeUserRole(c *gin.Context) {
	_, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}
	// FIXME: Implement Role check

	type PayloadDetails struct {
		UserID    uint
		ProjectID uint
		Role      types.Role
	}

	var payload PayloadDetails

	if err := c.ShouldBindJSON(&payload); err != nil {
		validationErrors := utils.GenerateValidationErrors(err)
		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	var teamMember models.TeamMember

	if err := db.DB.Select("id", "user_id", "role", "project_id").
		Where("user_id = ? AND project_id = ?", payload.UserID, payload.ProjectID).
		First(&teamMember).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	teamMember.Role = payload.Role

	if err := db.DB.Save(&teamMember).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"sucess": gin.H{
			"userID":    teamMember.UserID,
			"projectID": teamMember.ProjectID,
			"role":      teamMember.Role,
		},
	})
}

func CreateNewTask(c *gin.Context) {
	user, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}

	type Task struct {
		TaskName        string              `json:"taskName" binding:"required"`
		TaskDescription string              `json:"taskDescription" binding:"required"`
		AssignedTo      json.Number         `json:"assignedTo" binding:"required"`
		DueDate         time.Time           `json:"dueDate" binding:"required"`
		Priority        types.PriorityLevel `json:"priority" binding:"required"`
		ProjectID       json.Number         `json:"projectID" binding:"required"`
	}

	var newTask Task

	if err := c.ShouldBindJSON(&newTask); err != nil {
		validationErrors := utils.GenerateValidationErrors(err)
		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	assignedToID, err := newTask.AssignedTo.Int64()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid assignedTo ID"})
		return
	}

	projectID, err := newTask.ProjectID.Int64()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid projectID"})
		return
	}

	var assignedToUser models.User
	if result := db.DB.First(&assignedToUser, assignedToID); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Assigned user not found"})
		return
	}

	task := models.Task{
		TaskName:        newTask.TaskName,
		TaskDescription: newTask.TaskDescription,
		AssignedTo:      assignedToUser,
		DueDate:         newTask.DueDate,
		Priority:        newTask.Priority,
		ProjectID:       uint(projectID),
		CreatedByID:     user.ID,
	}

	if result := db.DB.Create(&task); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	c.Status(http.StatusOK)
}

func GetProjectTasks(c *gin.Context) {
	projectID := c.Query("projectID")

	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing projectID."})
	}

	type TaskResponse struct {
		ID              uint                `json:"id"`
		TaskName        string              `json:"taskName"`
		TaskDescription string              `json:"taskDescription"`
		AssignedName    string              `json:"assignedToName"`
		AssignedToID    uint                `json:"assignedToID"`
		CreatedByName   string              `json:"createdByName"`
		DueDate         types.FormattedTime `json:"dueDate"`
		CreatedAt       types.FormattedTime `json:"createdAt"`
		Priority        types.PriorityLevel `json:"priority"`
		Status          types.TaskStatus    `json:"status"`
	}

	var tasks []TaskResponse

	if err := db.DB.Table("tasks").
		Select(`tasks.id, 
                tasks.task_name, 
                tasks.task_description,
				tasks.assigned_to_id,
				tasks.due_date,
				tasks.created_at,
                tasks.priority,
                tasks.status,
                CONCAT(assigned.first_name, ' ', assigned.last_name) as assigned_name, 
                CONCAT(creator.first_name, ' ', creator.last_name) as created_by_name`).
		Joins("LEFT JOIN users AS assigned ON assigned.id = tasks.assigned_to_id").
		Joins("LEFT JOIN users AS creator ON creator.id = tasks.created_by_id").
		Where("tasks.project_id = ?", projectID).
		Scan(&tasks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tasks"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"tasks": tasks})
}

func UpdateTaskStatus(c *gin.Context) {
	_, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}

	type Task struct {
		ID     json.Number      `json:"id" binding:"required"`
		Status types.TaskStatus `json:"status" binding:"required"`
	}

	var task Task

	if err := c.ShouldBindJSON(&task); err != nil {
		validationErrors := utils.GenerateValidationErrors(err)
		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	var taskToUpdate models.Task

	if result := db.DB.First(&taskToUpdate, task.ID); result.Error != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	taskToUpdate.Status = task.Status

	db.DB.Save(&taskToUpdate)

	c.Status(http.StatusOK)
}
