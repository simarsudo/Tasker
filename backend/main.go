package main

import (
	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
	"github.com/simarsudo/tasker/routes"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

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
