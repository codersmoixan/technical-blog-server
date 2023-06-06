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
	base.BaseApi
	user.UserApi
	ArticleApi article.Api
	ArticleLikedApi article.LikedApi
	ArticleFavorApi article.FavorApi
	ArticleViewsApi article.ViewsApi
	ArticleCommentApi article.CommentApi
	tag.TagApi
	category.CategoryApi
	link.LinkApi
}
