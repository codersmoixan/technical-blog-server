package article

import (
	"fmt"
	"github.com/gin-gonic/gin"
	goNanoid "github.com/matoous/go-nanoid/v2"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	article2 "technical-blog-server/model/system/article"
	requestParams "technical-blog-server/model/system/request"
	responseParams "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
)

type Api struct{}

// GetArticleList
// @Tags Base
// @Summary 获取文章列表
// @Description 获取文章列表
// @Param page query int true "当前页"
// @Param pageSize query int true "每页请求数量"
// @Param keyWord query string false "搜索内容"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/article/list [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *Api) GetArticleList(c *gin.Context) {
	var articleParams request.GetArticleListParams
	_ = c.ShouldBindQuery(&articleParams)

	if err := utils.Verify(articleParams, utils.PageInfoVerify); err != nil {
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
	var articleParam requestParams.ArticleDetail
	_ = c.ShouldBindJSON(&articleParam)

	if err := utils.Verify(articleParam, utils.ArticleDetailVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	id, err := goNanoid.New()
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	article := &article2.SysArticle{
		ArticleId: id,
		ArticleName:        articleParam.ArticleName,
		Description: articleParam.Description,
		Content:     articleParam.Content,
		CategoryId:    articleParam.Category,
		ArticleCoverUrl:   articleParam.ArticleCoverUrl,
		ArticleCoverKey: articleParam.ArticleCoverKey,
	}
	// 保存文章
	if _, err := articleService.AddArticle(*article); err != nil {
		response.FailWithMessage(err.Error(), c)
		global.TB_LOG.Error(err.Error())
		return
	}

	// 保存文章标签
	if err := articleService.AppendArticleTags(id, articleParam.Tags); err != nil {
		response.FailWithMessage("TBError: 创建标签表失败！", c)
		global.TB_LOG.Error(fmt.Sprintf("TBError: 创建标签表失败！%v", err))
		return
	}

	response.OkWithDetailed(responseParams.ArticleAddResponse{
		ArticleName:        article.ArticleName,
		Description: article.Description,
		TagId:         article.TagId,
		CategoryId:    article.CategoryId,
		ArticleCoverUrl:   article.ArticleCoverUrl,
		ArticleCoverKey: article.ArticleCoverKey,
	}, "文章保存成功!", c)
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
	var article request.GetById
	_ = c.ShouldBindQuery(&article)

	if err := utils.Verify(article, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := articleService.DeleteArticle(article.ID); err != nil {
		global.TB_LOG.Error(fmt.Sprintf("%s%d%s", "日志:", article.ID, "删除失败!"), zap.Error(err))
		response.FailWithMessage("删除失败!", c)
	} else {
		response.OkWithDetailed(responseParams.ArticleDeleteResponse{
			ID: article.ID,
		}, "日志删除成功!", c)
	}
}

// GetArticleById
// @Tags Base
// @Summary 根据id获取文章详情
// @Description 根据id获取文章详情
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/article [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *Api) GetArticleById(c *gin.Context) {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := utils.Verify(byId, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if article, err := articleService.GetArticleById(byId.ID); err != nil {
		global.TB_LOG.Error(fmt.Sprintf("%s%d%s", "blog:", byId.ID, "查询失败!"), zap.Error(err))
		response.FailWithMessage("error", c)
	} else {
		response.OkWithDetailed(article, "success", c)
		viewsApi.RecordViews(c)
	}
}
