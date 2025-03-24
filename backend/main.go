package main

import (
	"fmt"
	"os"

	"github.com/go-playground/validator/v10"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/routes"
	"github.com/simarsudo/tasker/utils"
)

// TODO: Maybe move jwt, cors related settings in config file and also load all env variables there

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:3000", "https://tasker.simar.work"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	routes.RegisterRoutes(r)

	return r
}

func main() {
	// TODO: Add loggin in file
	// Initialize the database
	err := db.InitDB()

	if err != nil {
		panic(fmt.Sprintf("Error initializing database: %v", err))
	}

	// Auto migrate the User model
	// NOTE: During auto migrations columns are not deleted automatically to preserve data
	err = db.DB.AutoMigrate(
		&models.User{},
		&models.Company{},
		&models.CompanyAddress{},
		&models.CompanyContactDetails{},
		&models.CompanyProject{},
		&models.TeamMember{},
		&models.Invitation{},
		&models.Task{},
	)

	if err != nil {
		panic(fmt.Sprintf("Could not auto migrate database: %v", err))
	}

	// Register custom validations
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		utils.RegisterCustomValidations(v)
	}

	// Set up router
	r := setupRouter()

	mode, exists := os.LookupEnv("MODE")
	if !exists {
		mode = "d"
		fmt.Println("Is_Prod environment variable not set, defaulting to 'dev'")
	}

	var port int16

	if mode == "p" {
		port = 8080
		gin.SetMode(gin.ReleaseMode)
		fmt.Println("Running in production mode on port 8080")
	} else {
		port = 8000
		fmt.Println("Running in development mode on port 8000")
	}

	err = r.Run(fmt.Sprintf("0.0.0.0:%d", port))
	if err != nil {
		panic(fmt.Sprintf("Failed to start server: %v", err))
	}
}
