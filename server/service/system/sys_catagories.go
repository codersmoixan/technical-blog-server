package system

import (
	"errors"
	goNanoid "github.com/matoous/go-nanoid/v2"
	"gorm.io/gorm"
	"technical-blog-server/global"
	modelSystem "technical-blog-server/model/system"
	request "technical-blog-server/model/system/request_params"
	responseParams "technical-blog-server/model/system/response_params"
)

type CategoriesService struct{}

// GetCategoriesList
// @author: zhengji.su
// @description: 获取分类列表
// @return: list interface{}, total int64, err error
func (cate CategoriesService) GetCategoriesList() (list interface{}, total int64, err error) {
	db := global.TB_DB.Model(&modelSystem.SysCategories{})

	var categoriesList []responseParams.CategoriesResponse
	if err = db.Count(&total).Error; err != nil {
		return
	}

	err = db.Find(&categoriesList).Error
	return categoriesList, total, err
}

// AddCategories
// @author: zhengji.su
// @description: 新增分类
// @param: c modelSystem.SysCategories
// @return: categoriesInter modelSystem.SysCategories, err error
func (cate CategoriesService) AddCategories(c modelSystem.SysCategories) (categoriesInter modelSystem.SysCategories, err error) {
	var categories modelSystem.SysCategories

	// todo 判断categories是否存在
	if !errors.Is(global.TB_DB.Where("label = ?", c.Label).First(&categories).Error, gorm.ErrRecordNotFound) {
		return categoriesInter, errors.New("分类已存在")
	}

	// todo 如不不存在就新建一个categories
	// 生成一个唯一标识
	id, er := goNanoid.New()
	if er != nil {
		return categoriesInter, er
	}

	c.CategoriesId = id
	err = global.TB_DB.Create(&c).Error

	return c, err
}

// UpdateCategories
// @author: zhengji.su
// @description: 更新分类
// @param: update requestParams.UpdateCategoriesContent
// @return: categoriesInter requestParams.UpdateCategoriesContent, err error
func (cate CategoriesService) UpdateCategories(update request.UpdateCategoriesContent) (categoriesInter modelSystem.SysCategories, err error) {
	var categories modelSystem.SysCategories
	db := global.TB_DB.Model(&modelSystem.SysCategories{})

	// todo 更新信息
	if err = db.Where("categories_id = ?", update.ID).Update("label", update.Label).Error; err != nil {
		return categoriesInter, err
	}

	// todo 查找更新后的信息
	if err = db.Where("categories_id = ?", update.ID).First(&categories).Error; err != nil {
		return categoriesInter, err
	}

	return categories, err
}

// DeleteCategories
// @author: zhengji.su
// @description: 删除分类
// @param: id string
// @return: err error
func (cate CategoriesService) DeleteCategories(id string) (err error) {
	var categories modelSystem.SysCategories
	err = global.TB_DB.Where("categories_id = ?", id).First(&categories).Delete(&categories).Error

	return err
}
