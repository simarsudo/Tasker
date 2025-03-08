package utils

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/simarsudo/tasker/models"
)

var validationMessages = map[string]string{
	"required": "is required",
	"email":    "must be a valid email address",
	"min":      "must be at least %s characters",
	"max":      "must be less than %s characters",
	"eqfield":  "must match the %s field",
}

// GenerateValidationErrors takes an error from ShouldBindJSON and returns a map of validation errors
// It accepts an optional map of custom messages for specific fields
func GenerateValidationErrors(err error, customMessages ...map[string]string) map[string]string {
	// Create a map to hold validation errors
	validationErrors := make(map[string]string)
	// Create a map to hold custom messages
	customMsgs := make(map[string]string)

	// If custom messages are provided, use the first map
	if len(customMessages) > 0 {
		customMsgs = customMessages[0]
	}

	// Handle the case when no data is sent (EOF error)
	if err == io.EOF {
		validationErrors["error"] = "Oops! Looks like you forgot to send any data."
		return validationErrors
	}

	// Check if the error is of type validator.ValidationErrors
	if errs, ok := err.(validator.ValidationErrors); ok {
		// Iterate over each field error
		for _, fieldErr := range errs {
			// Convert the field name to lower case
			fieldName := strings.ToLower(fieldErr.Field())

			// Check if there is a custom message for the field
			if customMsg, exists := customMsgs[fieldName]; exists {
				validationErrors[fieldName] = customMsg
			} else if msg, exists := validationMessages[fieldErr.Tag()]; exists {
				// Check if the validation message requires a parameter
				if fieldErr.Param() != "" {
					validationErrors[fieldName] = fmt.Sprintf("%s %s", fieldName, fmt.Sprintf(msg, fieldErr.Param()))
				} else {
					validationErrors[fieldName] = fmt.Sprintf("%s %s", fieldName, msg)
				}
			} else {
				// Default message if no custom or predefined message exists
				validationErrors[fieldName] = fmt.Sprintf("Invalid value for %s", fieldName)
			}
		}
	} else {
		// If the error is not of type validator.ValidationErrors, add the error message to the map
		validationErrors["error"] = err.Error()
	}
	return validationErrors
}

func GenerateInvitationToken() (string, error) {
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "", fmt.Errorf("failed to generate token: %w", err)
	}
	return hex.EncodeToString(bytes), nil
}

func GetUserFromContext(c *gin.Context) (*models.User, bool) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return nil, false
	}

	user, err := models.GetUserByID(userID.(uint))
	if err != nil {
		c.Status(http.StatusUnauthorized)
		return nil, false
	}

	return user, true
}
