package models

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"strings"

	"github.com/simarsudo/tasker/types"
	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Name        string `gorm:"not null" binding:"required" json:"companyName"`
	WebsiteLink string `gorm:"not null" binding:"required" json:"websiteLink"`
	EmailDomain string `gorm:"not null" binding:"required" json:"emailDomain"`
	CompanySize string `gorm:"not null" binding:"required" json:"companySize"`

	// Foreign keys
	CompanyAddress CompanyAddress
	ContactDetails CompanyContactDetails

	// One-to-many relationship
	Projects []CompanyProject
}

func (c *Company) BeforeCreate(*gorm.DB) error {
	c.EmailDomain = strings.ToLower(c.EmailDomain)
	return nil
}

type CompanyAddress struct {
	ID      uint   `gorm:"primarykey"`
	Address string `gorm:"not null" binding:"required" json:"address"`
	City    string `gorm:"not null" binding:"required" json:"city"`
	State   string `gorm:"not null" binding:"required" json:"state"`
	ZipCode string `gorm:"not null" binding:"required" json:"zipCode"`

	CompanyID uint
}

type CompanyContactDetails struct {
	ID    uint   `gorm:"primarykey"`
	Name  string `gorm:"not null" binding:"required" json:"name"`
	Role  string `gorm:"not null" binding:"required" json:"role"`
	Email string `gorm:"not null" binding:"required" json:"email"`
	Phone string `gorm:"not null" binding:"required" json:"phone"`

	CompanyID uint
}

type CompanyProject struct {
	gorm.Model
	ProjectName        string `gorm:"not null" binding:"required" json:"projectName"`
	ProjectDescription string `gorm:"not null" binding:"required" json:"projectDescription"`

	// Foreign Keys
	CompanyID   uint `gorm:"not null"`
	CreatedByID uint `gorm:"not null"`
	CreatedBy   User `gorm:"foreignKey:CreatedByID"`
}

type TeamMember struct {
	gorm.Model
	UserID    uint
	ProjectID uint
	Role      types.Role `gorm:"not null" binding:"required" json:"role"`

	User    User           `gorm:"foreignKey:UserID"`
	Project CompanyProject `gorm:"foreignKey:ProjectID"`
}

type Invitation struct {
	gorm.Model
	Email  string                 `gorm:"not null" binding:"required" json:"email"`
	Token  string                 `gorm:"not null;unique" json:"token"`
	Status types.InvitationStatus `gorm:"not null" binding:"required" json:"status"`
	Role   types.Role             `gorm:"not nll" binding:"required" json:"role"`

	// Foreign keys
	ProjectID uint           `gorm:"not null" binding:"required" json:"projectID"`
	Project   CompanyProject `gorm:"foreignKey:ProjectID"`
}

func (invitation *Invitation) BeforeSave(tx *gorm.DB) (err error) {
	for {
		// Generate a random token
		bytes := make([]byte, 16)
		if _, err := rand.Read(bytes); err != nil {
			return fmt.Errorf("failed to generate token: %w", err)
		}
		token := hex.EncodeToString(bytes)

		// Check if the token already exists in the database
		var existingInvitation Invitation
		if err := tx.Where("token = ?", token).First(&existingInvitation).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				// Token is unique
				invitation.Token = token
				break
			}
			return err
		}
		// Token collision, generate a new token and try again
	}
	return nil
}
