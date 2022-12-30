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
// @author: zhengji.su
// @description: 获取博客列表
// @param: c *gin.Context
func (b *BlogApi) GetBlogList(c *gin.Context) {
	var pageInfo request.PageInfo
	_ = c.ShouldBindQuery(&pageInfo)

	if err := utils.Verify(pageInfo, utils.PageInfoRule); err != nil {
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
// @author: zhengji.su
// @description: 新增博客
// @param: c *gin.Context
func (b *BlogApi) AddBlog(c *gin.Context) {
	var blogParam requestParams.BlogDetail
	_ = c.ShouldBindJSON(&blogParam)

	if err := utils.Verify(blogParam, utils.BlogDetailRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	blog := &modelSystem.SysBlog{
		Name:        blogParam.Name,
		Description: blogParam.Description,
		Content:     blogParam.Content,
		Tag:         blogParam.Tag,
		Categories:  blogParam.Categories,
		BlogImage:   blogParam.BlogImage,
	}
	if _, err := blogService.AddBlog(*blog); err != nil {
		response.FailWithMessage(err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.BlogAddResponse{
			Name:        blog.Name,
			Description: blog.Description,
			Tag:         blog.Tag,
			Categories:  blog.Categories,
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
// @author: zhengji.su
// @description: 删除博客
// @param: c *gin.Context
func (b *BlogApi) DeleteBlog(c *gin.Context) {
	var blog request.GetById
	_ = c.ShouldBindQuery(&blog)

	if err := utils.Verify(blog, utils.IdRule); err != nil {
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
