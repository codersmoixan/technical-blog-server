package request

type CategoryContent struct {
	CategoryName string `json:"categoryName"`
}

type UpdateCategoryContent struct {
	CategoryContent
	ID string `json:"id"`
}
