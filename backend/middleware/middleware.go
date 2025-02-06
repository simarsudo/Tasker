package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/simarsudo/tasker/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		cookie, err := ctx.Cookie("token")
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		userID, err := utils.VerifyToken(cookie)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		ctx.Set("userID", userID)
		ctx.Next()
	}
}
