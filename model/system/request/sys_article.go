package request

import uuid "github.com/satori/go.uuid"

type ArticleDetail struct {
	ArticleName        string `json:"articleName"`        // 博客名称
	Description string `json:"description"` // 文章简要
	Content     string `json:"content"`     // 文章内容
	Tags         []string `json:"tags"`         // 文章标签
	Category    string `json:"category"`    // 文章类型
	ArticleCoverUrl   string `json:"articleCoverUrl"`   // 文章封面
	ArticleCoverKey string `json:"articleCoverKey"` // 文章封面key
}

type ArticleLikedRequest struct {
	ArticleId string `json:"articleId"`
	UserId uuid.UUID `json:"userId"`
}

type ArticleCommentRequest struct {
	ArticleId string `json:"articleId"`
	TargetId uint `json:"targetId"`
	Content string `json:"content"`
	ParentId uint `json:"parentId"`
	UserId uint `json:"userId"`
}
