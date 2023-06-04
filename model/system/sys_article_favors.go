package system

import "technical-blog-server/global"

type SysArticleFavors struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	UserId string `json:"userId" gorm:"comment:用户ID"`
}

func (SysArticleFavors) TableName() string {
	return "sys_article_favors"
}
