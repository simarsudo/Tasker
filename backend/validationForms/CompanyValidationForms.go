package validationForms

type ProjectID struct {
	ID uint `json:"projectID" binding:"required"`
}
