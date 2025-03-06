package routes

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/utils"
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
	var companyInfo models.CompanyRegistrationForm

	err := c.ShouldBindBodyWithJSON(&companyInfo)

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

	var newProject models.NewProjectForm
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
		Role:      models.AdminRole,
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

	c.Status(http.StatusOK)
}

func InviteTeamMember(c *gin.Context) {
	// TODO: fix _
	_, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}

	// FIXME: IMPLEMENT it
	var invitationDetails models.InvitationForm

	if err := c.ShouldBindJSON(&invitationDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, invitationDetails)
}

func GetUserProjects(c *gin.Context) {
	user, ok := utils.GetUserFromContext(c)
	if !ok {
		return
	}

	// Create a struct to hold only the fields we want to return
	type ProjectInfo struct {
		ID          uint   `json:"id"`
		ProjectName string `json:"projectName"`
	}

	var projects []ProjectInfo

	// FIXME: check if better can be implemented
	// Query only the specific fields we need
	err := db.DB.Table("company_projects").
		Select("company_projects.id, company_projects.project_name").
		Joins("JOIN team_members ON team_members.project_id = company_projects.id").
		Where("team_members.user_id = ?", user.ID).
		Find(&projects).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	if len(projects) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No projects found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"projects":         projects,
		"currentProjectID": user.DefaultProjectID,
	})
}
