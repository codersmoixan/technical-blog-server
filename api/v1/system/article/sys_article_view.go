package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system/article"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
)

type ViewsApi struct {}

// RecordViews
// @Tags 文章阅读量管理
// @Summary 记录文章阅读数量(请求文章详情时会自动调用，无需再次手动调用)
// @Description 记录文章阅读数量(请求文章详情时会自动调用，无需再次手动调用)
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/views/record [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ViewsApi) RecordViews(c *gin.Context) {
	viewsParam := articleUtils.GetArticleBindUserParams(c)

	verify := utils.Rules{"ArticleId": {utils.NotEmpty()}}
	if err := utils.Verify(viewsParam, verify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if !viewsParam.UserIsEmpty {
		isView, err := articleViewsService.GetUserIsViews(viewsParam.UserId)

		if isView {
			articleViewsService.UpdateViewsDate(viewsParam.UserId)
			response.OkWithDetailed("更新成功!","OK!", c)
			return
		}

		var views = &article.SysArticleViews{
			ArticleId: viewsParam.ArticleId,
			UserId: viewsParam.UserId,
		}

		_, err = articleViewsService.RecordViews(*views)
		if err != nil {
			response.FailWithMessage(err.Error(), c)
			return
		}
	}

	ar, err := articleViewsService.UpdateViews(viewsParam.ArticleId)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	response.OkWithDetailed(ar, "OK", c)
}
