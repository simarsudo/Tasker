package main

import (
	"fmt"

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

	// TODO: Make this CORS prod ready
	// Enable CORS for frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:3000"},
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

	// Run server
	r.Run("0.0.0.0:8000")
}
