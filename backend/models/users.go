package models

import (
	"github.com/simarsudo/tasker/db"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Email    string
	Password string
}

func (u *User) Register() error {
	result := db.DB.Create(&u)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (u *User) GetUser() error {
	return db.DB.Where("email = ? AND password = ?", u.Email, u.Password).First(u).Error
}
