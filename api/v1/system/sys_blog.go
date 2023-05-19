package system

import (
	"fmt"
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

type BlogApi struct{}

// GetBlogList
// @Tags Base
// @Summary 获取博客列表
// @Description 获取博客列表
// @Param page query int true "当前页"
// @Param pageSize query int true "每页请求数量"
// @Param keyWord query string false "搜索内容"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/blog/list [get]
// @author: zhengji.su
// @param: c *gin.Context
func (b *BlogApi) GetBlogList(c *gin.Context) {
	var pageInfo request.PageInfo
	_ = c.ShouldBindQuery(&pageInfo)

	if err := utils.Verify(pageInfo, utils.PageInfoVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if list, total, err := blogService.GetBlogList(pageInfo); err != nil {
		global.TB_LOG.Error("获取博客列表失败!", zap.Error(err))
		response.FailWithMessage("获取博客列表失败!", c)
	} else {
		response.OkWithDetailed(response.PageResult{
			List:     list,
			Total:    total,
			Page:     pageInfo.Page,
			PageSize: pageInfo.PageSize,
		}, "获取成功", c)
	}
}

// AddBlog
// @Tags 博客管理
// @Summary 新增博客
// @Description 新增博客
// @Accept json
// @Produce json
// @Param data body requestParams.BlogDetail true "博客信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /blog/add [post]
// @author: zhengji.su
// @description: 新增博客
// @param: c *gin.Context
func (b *BlogApi) AddBlog(c *gin.Context) {
	var blogParam requestParams.BlogDetail
	_ = c.ShouldBindJSON(&blogParam)

	fmt.Println(blogParam, "2252")

	if err := utils.Verify(blogParam, utils.BlogDetailVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	blog := &modelSystem.SysBlog{
		Name:        blogParam.Name,
		Description: blogParam.Description,
		Content:     blogParam.Content,
		TagId:         blogParam.Tag,
		CategoryId:    blogParam.Category,
		BlogImage:   blogParam.BlogImage,
	}
	if _, err := blogService.AddBlog(*blog); err != nil {
		response.FailWithMessage(err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.BlogAddResponse{
			Name:        blog.Name,
			Description: blog.Description,
			TagId:         blog.TagId,
			CategoryId:    blog.CategoryId,
			BlogImage:   blog.BlogImage,
		}, "文章保存成功!", c)
	}
}

// UpdateBlog
// @author: zhengji.su
// @description: 更新博客
// @param: c *gin.Context
func (b *BlogApi) UpdateBlog(c *gin.Context) {

}

// DeleteBlog
// @Tags 博客管理
// @Summary 删除博客
// @Description 删除博客
// @Param id query int true "当前页"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /blog/delete [delete]
// @author: zhengji.su
// @param: c *gin.Context
func (b *BlogApi) DeleteBlog(c *gin.Context) {
	var blog request.GetById
	_ = c.ShouldBindQuery(&blog)

	if err := utils.Verify(blog, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := blogService.DeleteBlog(blog.ID); err != nil {
		global.TB_LOG.Error(fmt.Sprintf("%s%d%s", "日志:", blog.ID, "删除失败!"), zap.Error(err))
		response.FailWithMessage("删除失败!", c)
	} else {
		response.OkWithDetailed(responseParams.BlogDeleteResponse{
			ID: blog.ID,
		}, "日志删除成功!", c)
	}
}

// GetBlogById
// @Tags Base
// @Summary 根据id获取博客详情
// @Description 根据id获取博客详情
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/blog [get]
// @author: zhengji.su
// @param: c *gin.Context
func (b *BlogApi) GetBlogById(c *gin.Context)  {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := utils.Verify(byId, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if blog, err := blogService.GetBlogById(byId.ID); err != nil {
		global.TB_LOG.Error(fmt.Sprintf("%s%d%s", "blog:", byId.ID, "查询失败!"), zap.Error(err))
		response.FailWithMessage("error", c)
	} else {
		response.OkWithDetailed(blog, "success", c)
	}
}
