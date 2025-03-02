package routes

import (
	_ "errors"
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
	userID, userIDExist := c.Get("userID")

	if !userIDExist {
		c.JSON(http.StatusForbidden, gin.H{"unauthorized": "unauthorized"})
		return
	}

	userIDInt := userID.(int64)

	var user models.User
	db.DB.Debug().Preload("Company").First(&user, userIDInt)

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
	c.JSON(http.StatusOK, gin.H{"FOUND": "InviteTeamMember"})
}
