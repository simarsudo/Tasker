package models

import (
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName     string `gorm:"not null" binding:"required"`
	LastName      string `gorm:"not null" binding:"required"`
	Email         string `gorm:"unique;not null" binding:"required,email"`
	Password      string `gorm:"not null" binding:"required"`
	ContactNumber string `gorm:"not null" binding:"required"`

	// Foreign Keys
	DefaultProjectID *uint
	DefaultProject   *CompanyProject `gorm:"foreignKey:DefaultProjectID"`

	CompanyID *uint
	Company   Company `gorm:"foreignKey:CompanyID"`
}

// Before user is created this function will be called to normalize email to lowercase
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.Email = strings.ToLower(u.Email)
	return nil
}

func (u *User) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

// VerifyPassword checks if provided password matches
func (u *User) VerifyPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}
