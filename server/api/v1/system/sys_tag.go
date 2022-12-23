package system

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/response"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request_params"
	responseParams "technical-blog-server/model/system/response_params"
	"technical-blog-server/utils"
)

type TagApi struct{}

// GetTagList
// @author: zhengji.su
// @description: 获取标签列表
// @param: c *gin.Context
func (t *TagApi) GetTagList(c *gin.Context) {
	if list, total, err := tagService.GetTagList(); err != nil {
		global.TB_LOG.Error("获取标签列表失败!", zap.Error(err))
		response.FailWithMessage("获取标签列表失败!", c)
	} else {
		response.OkWithDetailed(response.CommonResult{
			Data:  list,
			Total: total,
		}, "获取标签列表成功!", c)
	}
}

// AddTag
// @author: zhengji.su
// @description: 添加标签
// @param: c *gin.Context
func (t *TagApi) AddTag(c *gin.Context) {
	var tagParam requestParams.TagContent
	_ = c.ShouldBindJSON(&tagParam)

	if err := utils.Verify(tagParam, utils.TagContentRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	tag := &modelSystem.SysTag{
		Label: tagParam.Label,
	}

	if tagInter, err := tagService.AddTag(*tag); err != nil {
		global.TB_LOG.Error("标签新增失败!", zap.Error(err))
		response.FailWithDetailed(responseParams.TagAddResponse{
			Label: tagParam.Label,
		}, err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.TagAddResponse{
			Label: tagParam.Label,
			TagId: tagInter.TagId,
		}, "标签新增成功!", c)
	}
}

// UpdateTag
// @author: zhengji.su
// @description: 更新标签
// @param: c *gin.Context
func (t *TagApi) UpdateTag(c *gin.Context) {
	var updateContent requestParams.UpdateTag
	_ = c.ShouldBindJSON(&updateContent)

	if err := utils.Verify(updateContent, utils.UpdateTagRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if tag, err := tagService.UpdateTag(updateContent); err != nil {
		response.FailWithMessage("更新标签信息失败!", c)
		response.FailWithDetailed(err.Error(), "更新失败!", c)
	} else {
		response.OkWithDetailed(responseParams.TagAddResponse{
			TagId: tag.TagId,
			Label: tag.Label,
		}, "更新成功!", c)
	}
}

// DeleteTag
// @author: zhengji.su
// @description: 删除标签
// @param: c *gin.Context
func (t *TagApi) DeleteTag(c *gin.Context) {

}
