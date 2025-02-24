package routes

import (
	_ "errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/utils"
)

func RegisterCompany(c *gin.Context) {
	var companyInfo models.CompanyRegistrationForm

	err := c.ShouldBindBodyWithJSON(&companyInfo)

	if err != nil {
		validationErrors := utils.GenerateValidationErrors(err)

		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}

	result := db.DB.Create(&models.Company{
		Name:        companyInfo.CompanyName,
		WebsiteLink: companyInfo.Website,
		CompanySize: companyInfo.CompanySize,
		EmailDomain: "",
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
	})

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.UnknownError})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": "Done bish",
	})
}
