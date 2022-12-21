package response_param

type BlogAddResponse struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Tag         string `json:"tag"`
	Categories  string `json:"categories"`
	BlogImage   string `json:"blogImage"`
}

type BlogDeleteResponse struct {
	ID int `json:"id"`
}
