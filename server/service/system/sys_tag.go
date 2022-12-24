package system

import (
	"errors"
	goNanoid "github.com/matoous/go-nanoid/v2"
	"gorm.io/gorm"
	"technical-blog-server/global"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request_params"
	responseParams "technical-blog-server/model/system/response_params"
)

type TagService struct{}

// GetTagList
// @author: zhengji.su
// @description: 获取tag列表
// @return: list interface{}, total int64, err error
func (tagService *TagService) GetTagList() (list interface{}, total int64, err error) {
	db := global.TB_DB.Model(&modelSystem.SysTag{})

	var tagList []responseParams.TagResponse

	if err = db.Count(&total).Error; err != nil {
		return
	}

	err = db.Find(&tagList).Error
	return tagList, total, err
}

// AddTag
// @author: zhengji.su
// @description: 添加标签
// @param: tag modelSystem.SysTag
// @return: tag modelSystem.SysTag, err error
func (tagService *TagService) AddTag(t modelSystem.SysTag) (tagInter modelSystem.SysTag, err error) {
	var tag modelSystem.SysTag

	// todo 判断tag是否已经存在
	if !errors.Is(global.TB_DB.Where("label = ?", t.Label).First(&tag).Error, gorm.ErrRecordNotFound) {
		return tagInter, errors.New("标签已存在")
	}

	// todo 如果不存在那么就新建一个tag
	// 生成一个唯一标识
	//id, er := goNanoid.Generate(t.Label, 54)
	id, er := goNanoid.New()
	if er != nil {
		return tagInter, er
	}

	t.TagId = id
	err = global.TB_DB.Create(&t).Error

	return t, err
}

// UpdateTag
// @author: zhengji.su
// @description: 更新标签
// @param: update requestParams.UpdateTag
// @return: tag requestParams.UpdateTag, err error
func (tagService *TagService) UpdateTag(update requestParams.UpdateTag) (tagInter modelSystem.SysTag, err error) {
	var tag modelSystem.SysTag
	db := global.TB_DB.Model(&modelSystem.SysTag{})

	// todo 查找到相应id的信息
	if err = db.Where("tag_id = ?", update.ID).Update("label", update.Label).Error; err != nil {
		return tagInter, err
	}

	// todo 更新信息
	if err = db.Where("tag_id = ?", update.ID).First(&tag).Error; err != nil {
		return tagInter, err
	}

	return tag, err
}

// DeleteTag
// @author: zhnegji.su
// @description: 删除标签
// @param: id string
// @return: err error
func (tagService *TagService) DeleteTag(id string) (err error) {
	var tag modelSystem.SysTag
	err = global.TB_DB.Where("tag_id = ?", id).First(&tag).Delete(&tag).Error

	return err
}
