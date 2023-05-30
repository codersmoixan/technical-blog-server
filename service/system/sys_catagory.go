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

type CategoryService struct{}

// GetCategoryList
// @author: zhengji.su
// @description: 获取分类列表
// @return: list interface{}, total int64, err error
func (cate *CategoryService) GetCategoryList() (list interface{}, total int64, err error) {
	db := global.TB_DB.Model(&modelSystem.SysCategory{})

	var categoryList []responseParams.CategoryResponse
	if err = db.Count(&total).Error; err != nil {
		return
	}

	err = db.Find(&categoryList).Error
	return categoryList, total, err
}

// AddCategory
// @author: zhengji.su
// @description: 新增分类
// @param: c modelSystem.SysCategory
// @return: categoryInter modelSystem.SysCategory, err error
func (cate *CategoryService) AddCategory(c modelSystem.SysCategory) (categoryInter modelSystem.SysCategory, err error) {
	var category modelSystem.SysCategory

	// todo 判断category是否存在
	if !errors.Is(global.TB_DB.Where("category_name = ?", c.CategoryName).First(&category).Error, gorm.ErrRecordNotFound) {
		return categoryInter, errors.New("分类已存在")
	}

	// todo 如不不存在就新建一个categories
	// 生成一个唯一标识
	id, er := goNanoid.New()
	if er != nil {
		return categoryInter, er
	}

	c.CategoryId = id
	err = global.TB_DB.Create(&c).Error

	return c, err
}

// UpdateCategory
// @author: zhengji.su
// @description: 更新分类
// @param: update requestParams.UpdateCategoryContent
// @return: categoryInter requestParams.UpdateCategoryContent, err error
func (cate *CategoryService) UpdateCategory(update request.UpdateCategoryContent) (categoryInter modelSystem.SysCategory, err error) {
	var category modelSystem.SysCategory
	db := global.TB_DB.Model(&modelSystem.SysCategory{})

	// todo 更新信息
	if err = db.Where("category_id = ?", update.ID).Update("category_name", update.CategoryName).Error; err != nil {
		return categoryInter, err
	}

	// todo 查找更新后的信息
	if err = db.Where("category_id = ?", update.ID).First(&category).Error; err != nil {
		return categoryInter, err
	}

	return category, err
}

// DeleteCategory
// @author: zhengji.su
// @description: 删除分类
// @param: id string
// @return: err error
func (cate *CategoryService) DeleteCategory(id string) (err error) {
	var category modelSystem.SysCategory
	err = global.TB_DB.Where("category_id = ?", id).First(&category).Delete(&category).Error

	return err
}

// GetCategoryById
// @author: zhengji.su
// @description: 根据id查找分类
// @param: id string
// @return: categoryInter modelSystem.SysCategory, err error
func (cate *CategoryService) GetCategoryById(id string) (categoryInter modelSystem.SysCategory, err error) {
	var category modelSystem.SysCategory
	db := global.TB_DB.Model(&modelSystem.SysCategory{})
	err = db.Where("category_id = ?", id).First(&category).Error

	return category, err
}
