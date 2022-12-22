package system

import (
	"errors"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"gorm.io/gorm"
	"technical-blog-server/global"
	modelSystem "technical-blog-server/model/system"
)

type TagService struct{}

// GetTagList
// @description: 获取tag列表
func (tagService *TagService) GetTagList() {

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
	id, er := gonanoid.Generate(t.Label, 54)
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
func (tagService *TagService) UpdateTag() {

}

// DeleteTag
// @description: 删除标签
func (tagService *TagService) DeleteTag() {

}
