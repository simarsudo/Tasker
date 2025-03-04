package utils

import (
	"github.com/go-playground/validator/v10"
	"github.com/simarsudo/tasker/models"
)

func ValidateRole(fl validator.FieldLevel) bool {
	role := fl.Field().String()
	switch models.Role(role) {
	case models.OwnerRole, models.AdminRole, models.MemberRole:
		return true
	default:
		return false
	}
}

func RegisterCustomValidations(validate *validator.Validate) {
	validate.RegisterValidation("validRole", ValidateRole)
}
