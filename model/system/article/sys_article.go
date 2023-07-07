package article

import (
	"technical-blog-server/global"
)

type SysArticle struct {
	global.TB_MODEL
	ArticleId      string `json:"articleId" gorm:"comment:文章唯一标识"`
	AuthorId      string `json:"authorId" gorm:"comment:作者id"`
	ArticleName        string `json:"articleName" gorm:"comment:文章名"`
	CategoryId    string `json:"categoryId" gorm:"comment:类别ID"`
	Description string `json:"description" gorm:"comment:文章简要"`
	Content     string `json:"content" gorm:"comment:文章内容;type:text"`
	ArticleCoverUrl   string `json:"articleCoverUrl" gorm:"comment:文章封面url"`
	ArticleCoverKey   string `json:"articleCoverKey" gorm:"comment:文章封面图片key"`
	Liked int `json:"liked" gorm:"comment:文章点赞数;default: 0"`
	Favors      int    `json:"favors" gorm:"comment:文章收藏次数;default:0"`
	Views       int    `json:"views" gorm:"comment:文章阅读次数;default:0"`
	Shares      int    `json:"shares" gorm:"comment:文章分享次数;default:0"`
	Status      int    `json:"status" gorm:"comment:文章状态;default:1"` // 1 待发布 2 已发布
}

func (SysArticle) TableName() string {
	return "sys_article"
}

type ArticleBindUser struct {
	ID uint `json:"id"`
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	UserId string `json:"userId" gorm:"comment:用户ID"`
}
