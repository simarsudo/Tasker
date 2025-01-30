package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	connStr, ok := os.LookupEnv("POSTGRES_CONN_STR")

	if !ok {
		panic("POSTGRES_CONN_STR environment variable not set.")
	}

	fmt.Println("connStr: &s\n", connStr)

	var err error
	DB, err = sql.Open("postgres", connStr)

	if err != nil {
		panic("Could not connect to database.")
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

	CreateDB()
}

func CreateDB() {
	createUserTable := `
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL,
			password TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`

	_, err := DB.Exec(createUserTable)

	if err != nil {
		panic(err)
	}

	fmt.Println("Sucessfully created tables")
}
