package category

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request"
	responseParams "technical-blog-server/model/system/response"
	"technical-blog-server/utils/verify"
)

type Api struct{}

// GetCategoryList
// @Tags Base
// @Summary 获取分类列表
// @Description 获取分类列表
// @Param page query int true "当前页"
// @Param pageSize query int true "每页请求数量"
// @Param keyWord query string false "搜索内容"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/category/list [get]
// @author: zhengji.su
// @param: c *gin.Context
func (cate *Api) GetCategoryList(c *gin.Context) {
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
// @Tags 分类管理
// @Summary 添加分类
// @Description 添加分类
// @Accept json
// @Produce json
// @Param data body requestParams.CategoryContent true "分类信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /category/add [post]
// @author: zhengji.su
// @param: c *gin.Context
func (cate *Api) AddCategory(c *gin.Context) {
	var categoryParam requestParams.CategoryContent
	_ = c.ShouldBindJSON(&categoryParam)

	if err := verify.Verify(categoryParam, verify.CategoryVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	category := &modelSystem.SysCategory{
		CategoryName: categoryParam.CategoryName,
	}

	if categoryInter, err := categoryService.AddCategory(*category); err != nil {
		global.TB_LOG.Error("分类新增失败!", zap.Error(err))
		response.FailWithDetailed(responseParams.AddCategoryResponse{
			CategoryName: categoryParam.CategoryName,
		}, err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.AddCategoryResponse{
			ID:    categoryInter.CategoryId,
			CategoryName: categoryInter.CategoryName,
		}, "分类新增成功!", c)
	}
}

// UpdateCategory
// @Tags 分类管理
// @Summary 更新分类
// @Description 更新分类
// @Accept json
// @Produce json
// @Param data body requestParams.UpdateCategoryContent true "分类信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /category/update [put]
// @author: zhengji.su
// @param: c *gin.Context
func (cate *Api) UpdateCategory(c *gin.Context) {
	var updateContent requestParams.UpdateCategoryContent
	_ = c.ShouldBindJSON(&updateContent)

	if err := verify.Verify(updateContent, verify.UpdateCategoryVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if category, err := categoryService.UpdateCategory(updateContent); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "更新失败!", c)
	} else {
		response.OkWithDetailed(responseParams.UpdateCategoryResponse{
			ID:    category.CategoryId,
			CategoryName: category.CategoryName,
		}, "更新成功!", c)
	}
}

// DeleteCategory
// @Tags 分类管理
// @Summary 删除分类
// @Description 删除分类
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /category/delete [delete]
// @author: zhengji.su
// @param: c *gin.Context
func (cate *Api) DeleteCategory(c *gin.Context) {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := verify.Verify(byId, verify.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := categoryService.DeleteCategory(byId.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "删除失败!", c)
	} else {
		response.OkWithDetailed(responseParams.DeleteCategoryResponse{
			ID: byId.ID,
		}, "删除成功!", c)
	}
}

// GetCategoryById
// @Tags Base
// @Summary 根据id获取分类详情
// @Description 根据id获取分类详情
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/category [get]
// @author: zhengji.su
// @param: c *gin.Context
func (cate *Api) GetCategoryById(c *gin.Context)  {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := verify.Verify(byId, verify.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if category, err := categoryService.GetCategoryById(byId.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "查询失败!", c)
	} else {
		response.OkWithDetailed(category, "success", c)
	}
}
