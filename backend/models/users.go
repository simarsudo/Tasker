package models

import (
	"github.com/simarsudo/tasker/db"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName     string `gorm:"not null" binding:"required"`
	LastName      string `gorm:"not null" binding:"required"`
	Email         string `gorm:"unique;not null" binding:"required,email"`
	Password      string `gorm:"not null" binding:"required"`
	ContactNumber string `gorm:"not null" binding:"required"`
}

func (u *User) GetUser() error {
	return db.DB.Where("email = ? AND password = ?", u.Email, u.Password).First(u).Error
}

type UserRegistration struct {
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required"`
	ConfirmPassword string `json:"confirmPassword" binding:"required,eqfield=Password"`
	FirstName       string `json:"firstName" binding:"required"`
	LastName        string `json:"lastName" binding:"required"`
	ContactNumber   string `json:"contactNumber" binding:"required"`
}
