package article

import (
	"technical-blog-server/global"
)

type SysArticleComment struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	ParentId uint `json:"parentId" gorm:"comment:父ID"`
	ParentCommentId uint `json:"parentCommentId" gorm:"comment:父评论id"`
	TargetId uint `json:"targetId" gorm:"comment:回复目标者ID"`
	OriginId uint `json:"originId" gorm:"comment:回复者id"`
	ArticleAuthorId uint `json:"articleAuthorId" gorm:"comment:文章作者id"`
	Content string `json:"content" gorm:"comment:回复内容;type:text"`
	Liked int `json:"liked" gorm:"comment:点赞数量;default:0"`
}

func (SysArticleComment) TableName() string {
	return "sys_article_comment"
}
