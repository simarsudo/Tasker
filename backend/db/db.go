package db

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	dsn, ok := os.LookupEnv("POSTGRES_CONN_STR")

	if !ok {
		return fmt.Errorf("environment variable POSTGRES_CONN_STR is required")
	}

	// TranslateError enables more descriptive error messages from the database and if checks
	// Eg: if errors.Is(result.Error, gorm.ErrDuplicatedKey)
	gormDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{TranslateError: true})
	if err != nil {
		return fmt.Errorf("could not connect to database: %v", err)
	}

	sqlDB, err := gormDB.DB()
	if err != nil {
		return fmt.Errorf("could not get database instance: %v", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(0)

	DB = gormDB

	return nil
}
