package article

import "technical-blog-server/service"

var (
	articleService = service.GroupApp.SystemServiceGroup.ArticleService
	articleLikedService = service.GroupApp.SystemServiceGroup.ArticleLikedService
	articleFavorService = service.GroupApp.SystemServiceGroup.ArticleFavorService
	articleViewsService = service.GroupApp.SystemServiceGroup.ArticleViewsService
	articleCommentService = service.GroupApp.SystemServiceGroup.ArticleCommentService
	articleCommentLikedService = service.GroupApp.SystemServiceGroup.ArticleCommentLikedService
	articleReplyService = service.GroupApp.SystemServiceGroup.ArticleReplyService
	articleReplyLikedService = service.GroupApp.SystemServiceGroup.ArticleReplyLikedService

	userService = service.GroupApp.SystemServiceGroup.UserService
	categoryService = service.GroupApp.SystemServiceGroup.CategoryService
)

var viewsApi = new(ViewsApi)
