package system

import (
	"technical-blog-server/service/system/article"
	"technical-blog-server/service/system/base"
	"technical-blog-server/service/system/category"
	"technical-blog-server/service/system/link"
	"technical-blog-server/service/system/tag"
	"technical-blog-server/service/system/user"
)

type ServiceGroup struct {
	base.BaseService
	UserService user.Service
	ArticleService article.Service
	ArticleLikedService article.LikedService
	ArticleFavorService article.FavorService
	ArticleViewsService article.ViewsService
	ArticleCommentService article.CommentService
	ArticleCommentLikedService article.CommentLikedService
	ArticleReplyService article.ReplyService
	ArticleReplyLikedService article.ReplyLikedService
	TagService tag.Service
	CategoryService category.Service
	LinkService link.Service
}
