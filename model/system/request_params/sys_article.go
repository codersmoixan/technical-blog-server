package request

type ArticleDetail struct {
	ArticleName        string `json:"articleName"`        // 博客名称
	Description string `json:"description"` // 文章简要
	Content     string `json:"content"`     // 文章内容
	Tags         []string `json:"tags"`         // 文章标签
	Category    string `json:"category"`    // 文章类型
	ArticleCoverUrl   string `json:"articleCoverUrl"`   // 文章封面
	ArticleCoverKey string `json:"articleCoverKey"` // 文章封面key
}
