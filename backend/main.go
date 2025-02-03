package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/models"
	"github.com/simarsudo/tasker/routes"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	// TODO: Make this CORS prod ready
	// Enable CORS for frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
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
	err = db.DB.AutoMigrate(&models.User{})

	if err != nil {
		panic(fmt.Sprintf("Could not auto migrate database: %v", err))
	}

	// Set up router
	r := setupRouter()

	// Run server
	r.Run("0.0.0.0:8080")
}
