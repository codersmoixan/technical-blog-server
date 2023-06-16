package request

type GetArticleListParams struct {
	PageInfo
	CategoryId string `json:"categoryId" form:"categoryId"`
}
