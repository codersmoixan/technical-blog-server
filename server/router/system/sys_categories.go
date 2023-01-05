package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type CategoryRouter struct{}

// SetupCategoryRouter
// @author: zhengji.su
// @description: 初始化分类路由
// @param: Router *gin.RouterGroup
func (c *CategoryRouter) SetupCategoryRouter(Router *gin.RouterGroup) {
	categoryRouter := Router.Group("category")
	categoryApi := v1.ApiGroupApp.SystemApiGroup.CategoryApi
	{
		categoryRouter.GET("list", categoryApi.GetCategoryList)
		categoryRouter.POST("add", categoryApi.AddCategory)
		categoryRouter.PUT("update", categoryApi.UpdateCategory)
		categoryRouter.DELETE("delete", categoryApi.DeleteCategory)
	}
}
