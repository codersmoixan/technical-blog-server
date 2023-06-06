package article

import "technical-blog-server/service"

var (
	articleService = service.GroupApp.SystemServiceGroup.ArticleService
	articleLikedService = service.GroupApp.SystemServiceGroup.ArticleLikedService
	articleFavorService = service.GroupApp.SystemServiceGroup.ArticleFavorApi
	articleViewsService = service.GroupApp.SystemServiceGroup.ArticleViewsApi
	articleCommentService = service.GroupApp.SystemServiceGroup.ArticleCommentService
)

var viewsApi = new(ViewsApi)
