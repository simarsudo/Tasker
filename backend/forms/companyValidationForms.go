package forms

import "github.com/simarsudo/tasker/types"

type CompanyRegistrationForm struct {
	CompanyName string `json:"companyName" binding:"required"`
	Website     string `json:"website" binding:"required"`
	EmailDomain string `json:"emailDomain"`
	CompanySize string `json:"companySize" binding:"required"`

	Address string `json:"address" binding:"required"`
	City    string `json:"city" binding:"required"`
	State   string `json:"state" binding:"required"`
	ZipCode string `json:"zipCode" binding:"required"`

	ContactPersonName  string `json:"contactPersonName" binding:"required"`
	ContactPersonRole  string `json:"contactPersonRole" binding:"required"`
	ContactPersonEmail string `json:"contactPersonEmail" binding:"required"`
	ContactPersonPhone string `json:"contactPersonPhone" binding:"required"`
}

type ProjectID struct {
	ID uint `json:"projectID" binding:"required"`
}

type InvitationForm struct {
	Email string     `json:"email" binding:"required,email"`
	Role  types.Role `json:"role" binding:"required,validRole"`
}

type NewProjectForm struct {
	ProjectName        string `json:"projectName" binding:"required"`
	ProjectDescription string `json:"projectDescription" binding:"required"`
}
