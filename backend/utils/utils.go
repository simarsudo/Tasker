package utils

import (
	"errors"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
)

// TODO: Move the secret to env file
const SECRETKEY = "secret"

// Takes an error of shouldBindJSON and returns a map of validation errors
func GenerateValidationErros(err error) map[string]string {

	validationErrors := make(map[string]string)
	if errs, ok := err.(validator.ValidationErrors); ok {
		for _, fieldErr := range errs {
			fieldName := fieldErr.Field()
			switch fieldErr.Tag() {
			case "required":
				validationErrors[strings.ToLower(fieldName)] = fieldName + " is required."
			case "email":
				validationErrors[strings.ToLower(fieldName)] = fieldName + " must be a valid email address."
			case "min":
				validationErrors[strings.ToLower(fieldName)] = fieldName + " must be at least " + fieldErr.Param() + " characters."
			case "max":
				validationErrors[strings.ToLower(fieldName)] = fieldName + " must be less than " + fieldErr.Param() + " characters."
			default:
				validationErrors[strings.ToLower(fieldName)] = "Invalid value for " + fieldName
			}
		}
	} else {
		validationErrors["error"] = "There was some error please try again."
		// TODO: Log the error
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
