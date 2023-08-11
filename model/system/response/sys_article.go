package response_param

import (
	"technical-blog-server/global"
	"technical-blog-server/model/system"
	"technical-blog-server/model/system/article"
)

type ArticleTags struct {
	TagId string `json:"tagId"`
	TagName string `json:"tagName"`
}

type ArticleResponse struct {
	global.TB_MODEL
	article.SysArticle
	Author      string `json:"author"`
	Tags []ArticleTags `json:"tags"`
	Category    string `json:"category"`
	AuthorInfo *system.SysUser `json:"authorInfo"`
}

type ArticleBindUserId struct {
	UserId string `json:"userId"`
	ArticleId string `json:"articleId"`
}

type ArticleDetail = ArticleResponse

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
	CommentId string `json:"commentId"`
	CommentInfo article.SysArticleComment `json:"commentInfo"`
	UserInfo system.SysUser `json:"userInfo"`
	ReplyInfos []ArticleReplyResponse `json:"replyInfos"`
}

type ArticleReplyResponse struct {
	IsAuthor bool `json:"isAuthor"`
	ReplyId string `json:"replyId"`
	ReplyInfo *article.SysArticleReply `json:"replyInfo"`
	ReplyUserInfo *system.SysUser `json:"replyUserInfo"`
	ReplyToUserInfo *system.SysUser `json:"replyToUserInfo"`
	ParentReply *article.SysArticleReply `json:"parentReply"`
}
