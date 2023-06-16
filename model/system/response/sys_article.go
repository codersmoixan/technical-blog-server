package response_param

import (
	"technical-blog-server/global"
	"technical-blog-server/model/system"
	"technical-blog-server/model/system/article"
)

type ArticleTags struct {
	TagId string
	TagName string
}

type ArticleResponse struct {
	global.TB_MODEL
	ArticleId      string `json:"id" gorm:"comment:博客唯一标识"`
	Author      string `json:"author" gorm:"comment:作者"`
	ArticleName        string `json:"articleName" gorm:"comment:文章名"`
	TagId         string `json:"tagId" gorm:"comment:标签ID"`
	Tag			string `json:"tag" gorm:"comment:标签"`
	Tags []ArticleTags
	CategoryId    string `json:"categoryId" gorm:"comment:类别ID"`
	Category    string `json:"category" gorm:"comment:类别"`
	Description string `json:"description" gorm:"comment:文章简要"`
	ArticleCoverUrl   string `json:"articleCoverUrl" gorm:"comment:文章封面"`
	ArticleCoverKey string `json:"articleCoverKey" gorm:"comment:文章封面key"`
	Liked string `json:"liked"`
	Favors      int    `json:"favors" gorm:"comment:文章收藏次数"`
	Views       int    `json:"views" gorm:"comment:文章阅读次数"`
	Shares      int    `json:"shares" gorm:"comment:文章分享次数"`
	Status      int    `json:"status" gorm:"comment:文章状态"` // 1 待发布 2 已发布
}

type ArticleBindUserId struct {
	UserId string `json:"userId"`
	ArticleId string `json:"articleId"`
}

type ArticleDetail struct {
	ArticleResponse
	Content string `json:"content"`
}

type ArticleAddResponse struct {
	ArticleName        string `json:"articleName"`
	Description string `json:"description"`
	Tags         []ArticleTags `json:"tags"`
	CategoryId    string `json:"categoryId"`
	CategoryName string `json:"categoryName"`
	ArticleCoverUrl   string `json:"articleCoverUrl"`
	ArticleCoverKey string `json:"articleCoverKey"`
}

type ArticleDeleteResponse struct {
	ID string `json:"id"`
}

type ArticleLikedResponse = ArticleBindUserId

type ArticleIsLikedResponse struct {
	IsLiked bool `json:"isLiked"`
}

type ArticleFavorResponse = ArticleBindUserId

type ArticleIsFavorResponse struct {
	IsFavor bool `json:"isFavor"`
}

type ArticleViewsResponse = ArticleBindUserId

type ArticleCommentResponse struct {
	CommentInfo article.SysArticleComment `json:"commentInfo"`
	UserInfo system.SysUser `json:"userInfo"`
}

type ArticleReplyResponse struct {
	ReplyInfo article.SysArticleReply `json:"replyInfo"`
	ReplyUserInfo system.SysUser `json:"replyUserInfo"`
	ReplyToUserInfo system.SysUser `json:"replyToUserInfo"`
}
