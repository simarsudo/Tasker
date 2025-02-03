package utils

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
)

// TODO: Move the secret to env file
const SECRETKEY = "secret"

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

func GenerateToken(email string, userId int64) (string, error) {
	// TODO: Add the data base logic
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":  email,
		"userId": userId,
		"exp":    time.Now().Add(time.Hour * 2).Unix(),
	})

	return token.SignedString([]byte(SECRETKEY))
}

func VerifyToken(token string) (int64, error) {
	// TODO: Add the data base logic
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("unepected signing token")
		}

		return []byte(SECRETKEY), nil
	})

	if err != nil {
		return 0, errors.New("could not parse token")
	}

	tokenIsValid := parsedToken.Valid

	if !tokenIsValid {
		return 0, errors.New("token is not valid")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)

	if !ok {
		return 0, errors.New("could not parse claims")
	}

	userIdFloat64 := claims["userId"].(float64)

	userId := int64(userIdFloat64)

	return userId, nil

}
