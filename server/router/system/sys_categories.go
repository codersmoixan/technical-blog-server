package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type CategoriesRouter struct{}

func (c *CategoriesRouter) SetupCategoriesRouter(Router *gin.RouterGroup) {
	categoriesRouter := Router.Group("categories")
	categoriesApi := v1.ApiGroupApp.SystemApiGroup.CategoriesApi
	{
		categoriesRouter.GET("list", categoriesApi.GetCategoriesList)
		categoriesRouter.POST("add", categoriesApi.AddCategories)
		categoriesRouter.PUT("update", categoriesApi.UpdateCategories)
		categoriesRouter.DELETE("delete", categoriesApi.DeleteCategories)
	}
}
