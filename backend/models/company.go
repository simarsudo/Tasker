package models

import (
	"strings"

	"gorm.io/gorm"
)

type Role string

const (
	OwnerRole  Role = "owner"
	AdminRole  Role = "admin"
	MemberRole Role = "member"
)

type InvitationStatus string

const (
	PendingStatus  InvitationStatus = "pending"
	AcceptedStatus InvitationStatus = "accepted"
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

type CompanyRegistrationForm struct {
	CompanyName string `json:"companyName" binding:"required"`
	Website     string `json:"website" binding:"required"`
	EmailDomain string `json:"emailDomain"`
	CompanySize string `json:"companySize" binding:"required"`

	Address string `json:"address" binding:"required"`
	City    string `json:"city" binding:"required"`
	State   string `json:"state" binding:"required"`
	ZipCode string `json:"zipCode" binding:"required"`

	ContactPersonName  string `json:"contactPersonName" binding:"required"`
	ContactPersonRole  string `json:"contactPersonRole" binding:"required"`
	ContactPersonEmail string `json:"contactPersonEmail" binding:"required"`
	ContactPersonPhone string `json:"contactPersonPhone" binding:"required"`
}

func (c *Company) BeforeCreate(*gorm.DB) error {
	c.EmailDomain = strings.ToLower(c.EmailDomain)
	return nil
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

type NewProjectForm struct {
	ProjectName        string `json:"projectName" binding:"required"`
	ProjectDescription string `json:"projectDescription" binding:"required"`
}

type TeamMember struct {
	gorm.Model
	UserID    uint
	ProjectID uint
	Role      Role `gorm:"not null" binding:"required" json:"role"`

	User    User           `gorm:"foreignKey:UserID"`
	Project CompanyProject `gorm:"foreignKey:ProjectID"`
}

type Invitation struct {
	gorm.Model
	InviteeEmail string           `gorm:"not null" binding:"required" json:"inviteeEmail"`
	Token        string           `gorm:"not null;unique" binding:"required" json:"token"`
	Status       InvitationStatus `gorm:"not null" binding:"required" json:"status"`
	Role         Role             `gorm:"not nll" binding:"required" json:"role"`

	// Foreign keys
	ProjectID uint           `gorm:"not null" binding:"required" json:"projectID"`
	Project   CompanyProject `gorm:"foreignKey:ProjectID"`
}

type InvitationForm struct {
	Email string `json:"email" binding:"required,email"`
	Role  Role   `json:"role" binding:"required,validRole"`
}
