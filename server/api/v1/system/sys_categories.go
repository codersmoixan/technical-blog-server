package system

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request_params"
	responseParams "technical-blog-server/model/system/response_params"
	"technical-blog-server/utils"
)

type CategoriesApi struct{}

// GetCategoriesList
// @author: zhengji.su
// @description: 获取分类列表
// @param: c *gin.Context
func (cate CategoriesApi) GetCategoriesList(c *gin.Context) {
	if list, total, err := categoriesService.GetCategoriesList(); err != nil {
		global.TB_LOG.Error("获取分类列表失败!", zap.Error(err))
		response.FailWithMessage("获取分类列表失败!", c)
	} else {
		response.OkWithDetailed(response.CommonResult{
			Data:  list,
			Total: total,
		}, "获取分类列表成功!", c)
	}
}

// AddCategories
// @author: zhengji.su
// @description: 添加分类
// @param: c *gin.Context
func (cate CategoriesApi) AddCategories(c *gin.Context) {
	var categoriesParam requestParams.CategoriesContent
	_ = c.ShouldBindJSON(&categoriesParam)

	if err := utils.Verify(categoriesParam, utils.CategoriesRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	categories := &modelSystem.SysCategories{
		Label: categoriesParam.Label,
	}

	if categoriesInter, err := categoriesService.AddCategories(*categories); err != nil {
		global.TB_LOG.Error("分类新增失败!", zap.Error(err))
		response.FailWithDetailed(responseParams.AddCategoriesResponse{
			Label: categoriesParam.Label,
		}, err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.AddCategoriesResponse{
			ID:    categoriesInter.CategoriesId,
			Label: categoriesInter.Label,
		}, "分类新增成功!", c)
	}
}

// UpdateCategories
// @author: zhengji.su
// @description: 更新分类
// @param: c *gin.Context
func (cate CategoriesApi) UpdateCategories(c *gin.Context) {
	var updateContent requestParams.UpdateCategoriesContent
	_ = c.ShouldBindJSON(&updateContent)

	if err := utils.Verify(updateContent, utils.UpdateCategoriesRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if categories, err := categoriesService.UpdateCategories(updateContent); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "更新失败!", c)
	} else {
		response.OkWithDetailed(responseParams.UpdateCategoriesResponse{
			ID:    categories.CategoriesId,
			Label: categories.Label,
		}, "更新成功!", c)
	}
}

// DeleteCategories
// @author: zhengji.su
// @description: 删除分类
// @param: c *gin.Context
func (cate CategoriesApi) DeleteCategories(c *gin.Context) {
	var categories request.GetById
	_ = c.ShouldBindJSON(&categories)

	if err := utils.Verify(categories, utils.IdRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := categoriesService.DeleteCategories(categories.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "删除失败!", c)
	} else {
		response.OkWithDetailed(responseParams.DeleteCategoriesResponse{
			ID: categories.ID,
		}, "删除成功!", c)
	}
}
