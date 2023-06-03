package tag

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request"
	responseParams "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
)

type TagApi struct{}

// GetTagList
// @Tags Base
// @Summary 获取标签列表
// @Description 获取标签列表
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/tag/list [get]
// @author: zhengji.su
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
// @Tags 标签管理
// @Summary 添加标签
// @Description 添加标签
// @Accept json
// @Produce json
// @Param data body requestParams.TagContent true "标签信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /tag/add [post]
// @author: zhengji.su
// @param: c *gin.Context
func (t *TagApi) AddTag(c *gin.Context) {
	var tagParam requestParams.TagContent
	_ = c.ShouldBindJSON(&tagParam)

	if err := utils.Verify(tagParam, utils.TagContentVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	tag := &modelSystem.SysTag{
		TagName: tagParam.TagName,
		Value: tagParam.TagName,
	}

	if tagInter, err := tagService.AddTag(*tag); err != nil {
		global.TB_LOG.Error("标签新增失败!", zap.Error(err))
		response.FailWithDetailed(responseParams.TagAddResponse{
			TagName: tagParam.TagName,
		}, err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.TagAddResponse{
			TagName: tagParam.TagName,
			TagId: tagInter.TagId,
		}, "标签新增成功!", c)
	}
}

// UpdateTag
// @Tags 标签管理
// @Summary 更新标签
// @Description 更新标签
// @Accept json
// @Produce json
// @Param data body requestParams.UpdateTag true "标签信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /tag/update [put]
// @author: zhengji.su
// @param: c *gin.Context
func (t *TagApi) UpdateTag(c *gin.Context) {
	var updateContent requestParams.UpdateTag
	_ = c.ShouldBindJSON(&updateContent)

	if err := utils.Verify(updateContent, utils.UpdateTagVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if tag, err := tagService.UpdateTag(updateContent); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "更新失败!", c)
	} else {
		response.OkWithDetailed(responseParams.TagAddResponse{
			TagId: tag.TagId,
			TagName: tag.TagName,
		}, "更新成功!", c)
	}
}

// DeleteTag
// @Tags 标签管理
// @Summary 删除标签
// @Description 删除标签
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /tag/delete [delete]
// @author: zhengji.su
// @param: c *gin.Context
func (t *TagApi) DeleteTag(c *gin.Context) {
	var tag request.GetById
	_ = c.ShouldBindQuery(&tag)

	if err := utils.Verify(tag, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := tagService.DeleteTag(tag.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "删除失败!", c)
	} else {
		response.OkWithDetailed(responseParams.TagDeleteResponse{
			ID: tag.ID,
		}, "删除成功!", c)
	}
}

// GetTagById
// @Tags Base
// @Summary 根据id获取标签信息
// @Description 根据id获取标签信息
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/tag [get]
// @author: zhengji.su
// @param: c *gin.Context
func (t *TagApi) GetTagById(c *gin.Context)  {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := utils.Verify(byId, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if tag, err := tagService.GetTagById(byId.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		response.FailWithDetailed(err.Error(), "查询失败!", c)
	} else {
		response.OkWithDetailed(tag, "success", c)
	}
}
