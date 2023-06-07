package system

import (
	"technical-blog-server/api/v1/system/article"
	"technical-blog-server/api/v1/system/base"
	"technical-blog-server/api/v1/system/category"
	"technical-blog-server/api/v1/system/link"
	"technical-blog-server/api/v1/system/tag"
	"technical-blog-server/api/v1/system/user"
)

type ApiGroup struct {
	BaseApi base.Api
	UserApi user.Api
	ArticleApi article.Api
	ArticleLikedApi article.LikedApi
	ArticleFavorApi article.FavorApi
	ArticleViewsApi article.ViewsApi
	ArticleCommentApi article.CommentApi
	TagApi tag.Api
	CategoryApi category.Api
	LinkApi link.Api
}
