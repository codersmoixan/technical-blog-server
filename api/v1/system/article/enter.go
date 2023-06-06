package article

import "technical-blog-server/service"

var (
	articleService = service.GroupApp.SystemServiceGroup.ArticleService
	articleLikedService = service.GroupApp.SystemServiceGroup.ArticleLikedService
	articleFavorService = service.GroupApp.SystemServiceGroup.ArticleFavorApi
	articleViewsService = service.GroupApp.SystemServiceGroup.ArticleViewsApi
)

var viewsApi = new(ViewsApi)
