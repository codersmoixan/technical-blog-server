package request

type CategoryContent struct {
	Label string `json:"label"`
}

type UpdateCategoryContent struct {
	CategoryContent
	ID string `json:"id"`
}
