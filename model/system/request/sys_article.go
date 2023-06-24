package request

type ArticleDetail struct {
	ArticleId string `json:"articleId"`
	ArticleName        string `json:"articleName"`        // 博客名称
	Description string `json:"description"` // 文章简要
	Content     string `json:"content"`     // 文章内容
	Tags         []string `json:"tags"`         // 文章标签
	Category    string `json:"category"`    // 文章类型
	ArticleCoverUrl   string `json:"articleCoverUrl"`   // 文章封面
	ArticleCoverKey string `json:"articleCoverKey"` // 文章封面key
	UserId string `json:"userId"`
}

type ArticleLikedRequest struct {
	ArticleId string `json:"articleId"`
	UserId uint `json:"userId"`
}

type ArticleCommentRequest struct {
	ArticleId string `json:"articleId"`
	TargetId uint `json:"targetId"`
	Content string `json:"content"`
	ParentId uint `json:"parentId"`
	ParentCommentId uint `json:"parentCommentId"`
	OriginId uint `json:"originId"`
}

type GetReplyListIds struct {
	ArticleId string `json:"articleId"`
	ReplyCommentId string `json:"replyCommentId"`
}

type GetReplyGroupIds struct {
	ArticleId string `json:"articleId"`
	ReplyCommentIds []string `json:"replyCommentIds"`
}
