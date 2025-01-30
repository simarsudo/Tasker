package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/db"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

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
