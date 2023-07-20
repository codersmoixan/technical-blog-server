package article

import "technical-blog-server/global"

type SysArticleCommentLiked struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"文章id"`
	CommentId string `json:"commentId" gorm:"comment:评论id"`
	UserId string `json:"userId" gorm:"comment:点赞的用户id"`
}

func (SysArticleCommentLiked) TableName() string {
	return "sys_article_comment_liked"
}
