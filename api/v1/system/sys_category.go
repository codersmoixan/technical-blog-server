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

type CategoryApi struct{}

// GetCategoryList
// @author: zhengji.su
// @description: 获取分类列表
// @param: c *gin.Context
func (cate *CategoryApi) GetCategoryList(c *gin.Context) {
	if list, total, err := categoryService.GetCategoryList(); err != nil {
		global.TB_LOG.Error("获取分类列表失败!", zap.Error(err))
		response.FailWithMessage("获取分类列表失败!", c)
	} else {
		response.OkWithDetailed(response.CommonResult{
			Data:  list,
			Total: total,
		}, "获取分类列表成功!", c)
	}
}

// AddCategory
// @author: zhengji.su
// @description: 添加分类
// @param: c *gin.Context
func (cate *CategoryApi) AddCategory(c *gin.Context) {
	var categoryParam requestParams.CategoryContent
	_ = c.ShouldBindJSON(&categoryParam)

	if err := utils.Verify(categoryParam, utils.CategoriesVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	category := &modelSystem.SysCategory{
		Label: categoryParam.Label,
	}

	if categoryInter, err := categoryService.AddCategory(*category); err != nil {
		global.TB_LOG.Error("分类新增失败!", zap.Error(err))
		response.FailWithDetailed(responseParams.AddCategoryResponse{
			Label: categoryParam.Label,
		}, err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.AddCategoryResponse{
			ID:    categoryInter.CategoryId,
			Label: categoryInter.Label,
		}, "分类新增成功!", c)
	}
}

// UpdateCategory
// @author: zhengji.su
// @description: 更新分类
// @param: c *gin.Context
func (cate *CategoryApi) UpdateCategory(c *gin.Context) {
	var updateContent requestParams.UpdateCategoryContent
	_ = c.ShouldBindJSON(&updateContent)

	if err := utils.Verify(updateContent, utils.UpdateCategoriesVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if category, err := categoryService.UpdateCategory(updateContent); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "更新失败!", c)
	} else {
		response.OkWithDetailed(responseParams.UpdateCategoryResponse{
			ID:    category.CategoryId,
			Label: category.Label,
		}, "更新成功!", c)
	}
}

// DeleteCategory
// @author: zhengji.su
// @description: 删除分类
// @param: c *gin.Context
func (cate *CategoryApi) DeleteCategory(c *gin.Context) {
	var category request.GetById
	_ = c.ShouldBindQuery(&category)

	if err := utils.Verify(category, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := categoryService.DeleteCategory(category.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "删除失败!", c)
	} else {
		response.OkWithDetailed(responseParams.DeleteCategoryResponse{
			ID: category.ID,
		}, "删除成功!", c)
	}
}

// GetCategoryById
// @author: zhengji.su
// @description: 根据id获取分类详情
// @param: c *gin.Context
func (cate *CategoryApi) GetCategoryById(c *gin.Context)  {
	var id request.GetById
	id.ID = c.Param("id")

	if err := utils.Verify(id, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if category, err := categoryService.GetCategoryById(id.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "查询失败!", c)
	} else {
		response.OkWithDetailed(category, "success", c)
	}
}
