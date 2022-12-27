package response_param

import modelSystem "technical-blog-server/model/system"

type BlogResponse struct {
	modelSystem.SysBlog
}

type BlogAddResponse struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Tag         string `json:"tag"`
	Categories  string `json:"categories"`
	BlogImage   string `json:"blogImage"`
}

type BlogDeleteResponse struct {
	ID string `json:"id"`
}
