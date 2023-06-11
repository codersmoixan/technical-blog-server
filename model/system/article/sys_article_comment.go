package article

import (
	"technical-blog-server/global"
)

type SysArticleComment struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	CommentContent string `json:"commentContent" gorm:"comment:回复内容;type:text"`
	CommentId string `json:"commentId" gorm:"comment:评论id"`
	Liked int `json:"liked" gorm:"comment:点赞数量;default:0"`
	UserId uint `json:"userId" gorm:"comment:评论用户ID"`
}

func (SysArticleComment) TableName() string {
	return "sys_article_comment"
}
