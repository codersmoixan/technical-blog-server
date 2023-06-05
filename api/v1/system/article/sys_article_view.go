package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
)

type ViewsApi struct {}

// RecordViews
// @Tags 文章管理
// @Summary 记录文章阅读数量
// @Description 记录文章阅读数量
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/views/record [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ViewsApi) RecordViews(c *gin.Context) {
	viewParam := articleUtils.GetArticleBindUserParams(c)

	if err := utils.Verify(viewParam, utils.ArticleBindUserVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	var views = &system.SysArticleViews{
		ArticleId: viewParam.ArticleId,
		UserId: viewParam.UserId,
	}
	
	_, err := articleViewsService.RecordViews(*views)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	article, err := articleViewsService.UpdateViews(viewParam.ArticleId)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	response.OkWithDetailed(article, "OK", c)
}
