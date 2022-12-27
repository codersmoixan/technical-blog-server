package response_param

import modelSystem "technical-blog-server/model/system"

type CategoriesResponse struct {
	modelSystem.SysCategories
}

type AddCategoriesResponse struct {
	ID    string `json:"id"`
	Label string `json:"label"`
}

type UpdateCategoriesResponse struct {
	ID    string `json:"id"`
	Label string `json:"label"`
}

type DeleteCategoriesResponse struct {
	ID string `json:"id"`
}
