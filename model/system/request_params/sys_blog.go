package request

type ArticleDetail struct {
	ArticleName        string `json:"articleName"`        // 博客名称
	Description string `json:"description"` // 文章简要
	Content     string `json:"content"`     // 文章内容
	Tag         string `json:"tag"`         // 文章标签
	Category    string `json:"category"`    // 文章类型
	ArticleImage   string `json:"articleImage"`   // 文章封面
}
