package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	// Check if we're running on Cloud Run (with Cloud SQL)
	instanceUnixSocket := os.Getenv("INSTANCE_UNIX_SOCKET")

	var dsn string
	if instanceUnixSocket != "" {
		log.Printf("Cloud SQL mode: Using instance socket: %s", instanceUnixSocket)
		// We're on Cloud Run - use Unix Socket connection
		dsn = buildCloudSQLConnectionString(instanceUnixSocket)
	} else {
		log.Printf("Local mode: Using TCP connection")
		// We're in local/dev - use standard connection string
		var ok bool
		dsn, ok = os.LookupEnv("POSTGRES_CONN_STR")
		if !ok {
			return fmt.Errorf("environment variable POSTGRES_CONN_STR is required for local development")
		}
	}

	// TranslateError enables more descriptive error messages from the database
	gormDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		TranslateError:                           true,
		DisableForeignKeyConstraintWhenMigrating: true,
	})
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

// buildCloudSQLConnectionString creates a PostgreSQL connection string for Cloud SQL
func buildCloudSQLConnectionString(instanceUnixSocket string) string {
	mustGetenv := func(k string) string {
		v := os.Getenv(k)
		if v == "" {
			log.Fatalf("Fatal Error: %s environment variable not set", k)
		}
		return v
	}

	var (
		dbUser = mustGetenv("DB_USER")     // e.g. 'postgres'
		dbPwd  = mustGetenv("DB_PASSWORD") // e.g. 'my-db-password'
		dbName = mustGetenv("DB_NAME")     // e.g. 'tasker'
	)

	// The correct format for PostgreSQL Unix socket connection on Cloud SQL
	return fmt.Sprintf("host=/cloudsql/%s user=%s password=%s dbname=%s sslmode=disable",
		instanceUnixSocket, dbUser, dbPwd, dbName)
}
