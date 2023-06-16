package response_param

import modelSystem "technical-blog-server/model/system"

type CategoryResponse struct {
	modelSystem.SysCategory
}

type AddCategoryResponse struct {
	ID    string `json:"id"`
	CategoryName string `json:"categoryName"`
}

type UpdateCategoryResponse struct {
	ID    string `json:"id"`
	CategoryName string `json:"label"`
}

type DeleteCategoryResponse struct {
	ID string `json:"id"`
}
