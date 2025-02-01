package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/routes"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

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
	// Initialize the database
	db.InitDB()

	// Set up router
	r := setupRouter()

	// Run server
	r.Run("0.0.0.0:8080")
}
