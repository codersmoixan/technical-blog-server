package tag

import (
	"errors"
	"fmt"
	goNanoid "github.com/matoous/go-nanoid/v2"
	"gorm.io/gorm"
	"technical-blog-server/global"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request"
	responseParams "technical-blog-server/model/system/response"
)

type Service struct{}

// GetTagList
// @author: zhengji.su
// @description: 获取tag列表
// @return: list interface{}, total int64, err error
func (service *Service) GetTagList() (list interface{}, total int64, err error) {
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
func (service *Service) AddTag(t modelSystem.SysTag) (tagInter modelSystem.SysTag, err error) {
	var tag modelSystem.SysTag

	// todo 判断tag是否已经存在
	if !errors.Is(global.TB_DB.Where("tag_name = ?", t.TagName).First(&tag).Error, gorm.ErrRecordNotFound) {
		fmt.Println(tag, 9899)
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
// @return: tag modelSystem.SysTag, err error
func (service *Service) UpdateTag(update requestParams.UpdateTag) (tagInter modelSystem.SysTag, err error) {
	var tag modelSystem.SysTag
	db := global.TB_DB.Model(&modelSystem.SysTag{})

	// todo 更新信息
	if err = db.Where("tag_id = ?", update.ID).Update("tag_name", update.TagName).Error; err != nil {
		return tagInter, err
	}

	// todo 查找更新后的信息
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
func (service *Service) DeleteTag(id string) (err error) {
	var tag modelSystem.SysTag
	err = global.TB_DB.Where("tag_id = ?", id).First(&tag).Delete(&tag).Error

	return err
}

// GetTagById
// @author: zhengji.su
// @description: 根据id获取tag信息
// @param: id string
// @return: tagInter modelSystem.SysTag, err error
func (service *Service) GetTagById(id string) (tagInter modelSystem.SysTag, err error) {
	var tag modelSystem.SysTag
	db := global.TB_DB.Model(&modelSystem.SysTag{})
	err = db.Where("tag_id = ?", id).First(&tag).Error

	return tag, nil
}
