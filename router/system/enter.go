package system

type RouterGroup struct {
	UserRouter
	BaseRouter
	ArticleRouter
	TagRouter
	CategoryRouter
	LinkRouter
}
