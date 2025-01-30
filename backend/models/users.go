package models

import (
	"time"
)

type User struct {
	ID        int
	Email     string    `db:"created_at" json:"email" validate:"required"`
	Password  string    `db:"password" json:"password" validate:"required"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

func GetUser() {
	return
}
