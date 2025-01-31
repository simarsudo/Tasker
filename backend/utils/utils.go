package utils

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

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
