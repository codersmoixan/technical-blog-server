package request

type BlogDetail struct {
	Name        string `json:"name"`        // 博客名称
	Description string `json:"description"` // 文章简要
	Content     string `json:"content"`     // 文章内容
	Tag         string `json:"tag"`         // 文章标签
	Category    string `json:"category"`    // 文章类型
	BlogImage   string `json:"blogImage"`   // 文章封面
}
