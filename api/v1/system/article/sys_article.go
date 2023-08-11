package article

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	requestParams "technical-blog-server/model/system/request"
	responseParams "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	"technical-blog-server/utils/verify"
)

type Api struct{}

// GetArticleList
// @Tags  文章管理
// @Summary 获取文章列表
// @Description 获取文章列表
// @Param page query int true "当前页"
// @Param pageSize query int true "每页请求数量"
// @Param keyWord query string false "搜索内容"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/list [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *Api) GetArticleList(c *gin.Context) {
	var articleParams request.GetArticleListParams
	_ = c.ShouldBindQuery(&articleParams)

	if err := verify.Verify(articleParams, verify.PageInfoVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	list, total, err := articleService.GetArticleList(articleParams)
	if err != nil {
		global.TB_LOG.Error("获取博客列表失败!", zap.Error(err))
		response.FailWithMessage("获取博客列表失败!", c)
		return
	}

	response.OkWithDetailed(response.PageResult{
		List:     list,
		Total:    total,
		Page:     articleParams.Page,
		PageSize: articleParams.PageSize,
	}, "获取成功", c)
}

// AddArticle
// @Tags 文章管理
// @Summary 新增文章
// @Description 新增文章
// @Accept json
// @Produce json
// @Param data body requestParams.ArticleDetail true "博客信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/add [post]
// @author: zhengji.su
// @description: 新增文章
// @param: c *gin.Context
func (api *Api) AddArticle(c *gin.Context) {
	var articleParams requestParams.ArticleDetail
	_ = c.ShouldBindJSON(&articleParams)

	if err := verify.Verify(articleParams, verify.ArticleDetailVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	articleParams.ArticleId = utils.GenerateIntStringUUID()
	articleParams.UserId = utils.GetUserId(c)

	// 保存文章
	article, err := articleService.AddArticle(articleParams)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	response.OkWithDetailed(article, "文章保存成功!", c)
}

// UpdateArticle
// @author: zhengji.su
// @description: 更新博客
// @param: c *gin.Context
func (api *Api) UpdateArticle(c *gin.Context) {

}

// DeleteArticle
// @Tags 文章管理
// @Summary 删除文章
// @Description 删除文章
// @Param id query int true "当前页"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/delete [delete]
// @author: zhengji.su
// @param: c *gin.Context
func (api *Api) DeleteArticle(c *gin.Context) {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := verify.Verify(byId, verify.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := articleService.DeleteArticle(byId.ID); err != nil {
		global.TB_LOG.Error(fmt.Sprintf("%s%d%s", "日志:", byId.ID, "删除失败!"), zap.Error(err))
		response.FailWithMessage("删除失败!", c)
	} else {
		response.OkWithDetailed(responseParams.ArticleDeleteResponse{
			ID: byId.ID,
		}, "日志删除成功!", c)
	}
}

// GetArticleById
// @Tags 文章管理
// @Summary 根据id获取文章详情
// @Description 根据id获取文章详情
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *Api) GetArticleById(c *gin.Context) {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := verify.Verify(byId, verify.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if _, err := articleService.GetArticleById(byId.ID); err != nil {
		global.TB_LOG.Error(fmt.Sprintf("%s%d%s", "blog:", byId.ID, "查询失败!"), zap.Error(err))
		response.FailWithMessage("error", c)
	} else {
		viewsApi.RecordViews(c)
	}
}
