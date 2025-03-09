package utils

import (
	"github.com/go-playground/validator/v10"
	"github.com/simarsudo/tasker/types"
)

func ValidateRole(fl validator.FieldLevel) bool {
	role := fl.Field().String()
	switch types.Role(role) {
	case types.OwnerRole, types.AdminRole, types.MemberRole:
		return true
	default:
		return false
	}
}

func RegisterCustomValidations(validate *validator.Validate) {
	validate.RegisterValidation("validRole", ValidateRole)
}
