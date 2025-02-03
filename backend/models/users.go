package models

import (
	"github.com/simarsudo/tasker/db"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `gorm:"not null" binding:"required"`
	Email    string `gorm:"unique;not null" binding:"required,email"`
	Password string `gorm:"not null" binding:"required"`
}

func (u *User) GetUser() error {
	return db.DB.Where("email = ? AND password = ?", u.Email, u.Password).First(u).Error
}

type UserRegistration struct {
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required"`
	ConfirmPassword string `json:"confirmPassword" binding:"required,eqfield=Password"`
	Name            string `json:"name" binding:"required"`
}
