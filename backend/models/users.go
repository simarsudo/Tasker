package models

import (
	"time"

	"github.com/simarsudo/tasker/db"
)

type User struct {
	ID        int64     `db:"id"`
	Email     string    `db:"email" json:"email" binding:"required,email"`
	Password  string    `db:"password" json:"password" binding:"required,min=8,max=32,alphanum"`
	CreatedAt time.Time `db:"created_at"`
}

func (u *User) Register() error {
	q := "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id"

	err := db.DB.QueryRow(q, u.Email, u.Password).Scan(&u.ID)

	if err != nil {
		return err
	}

	return nil
}

func (u *User) GetUser() error {
	q := "SELECT id, email, password, created_at FROM users WHERE email = $1 AND password = $2"

	err := db.DB.QueryRow(q, u.Email, u.Password).Scan(&u.ID, &u.Email, &u.Password, &u.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}
