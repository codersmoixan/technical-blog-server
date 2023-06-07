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
	UserId uint `json:"userId" gorm:"comment:用户ID"`
	Content string `json:"content" gorm:"comment:回复内容;type:text"`
	Liked int `json:"liked" gorm:"comment:点赞数量;default:0"`
}

func (SysArticleComment) TableName() string {
	return "sys_article_comment"
}
