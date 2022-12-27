package request

type CategoriesContent struct {
	Label string `json:"label"`
}

type UpdateCategoriesContent struct {
	CategoriesContent
	ID string `json:"id"`
}
