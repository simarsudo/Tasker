package models

import (
	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Name        string `gorm:"not null" binding:"required" json:"companyName"`
	WebsiteLink string `gorm:"not null" binding:"required" json:"websiteLink"`
	EmailDomain string `gorm:"not null" binding:"required" json:"emailDomain"`
	CompanySize string `gorm:"not null" binding:"required" json:"companySize"`

	// Foreign keys
	CompanyAddress CompanyAddress        `gorm:"foreignKey:CompanyID"`
	ContactDetails CompanyContactDetails `gorm:"foreignKey:CompanyID"`
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
