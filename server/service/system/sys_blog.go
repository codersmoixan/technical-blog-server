package system

import (
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	modelSystem "technical-blog-server/model/system"
)

type BlogService struct{}

// GetBlogList
// @author: zhengji.su
// @description: 获取博客列表
// @param: pageInfo request.PageInfo
// @return: list interface{}, total int, err error
func (blogService *BlogService) GetBlogList(pageInfo request.PageInfo) (list interface{}, total int64, err error) {
	limit := pageInfo.PageSize
	offset := pageInfo.PageSize * (pageInfo.Page - 1)
	db := global.TB_DB.Model(&modelSystem.SysBlog{})

	var blogList []modelSystem.SysBlog

	if err = db.Count(&total).Error; err != nil {
		return
	}
	err = db.Limit(limit).Offset(offset).Find(&blogList).Error
	return blogList, total, err
}

// AddBlog
// @author: zhengji.su
// @description: 新增博客
// @param: b modelSystem.SysBlog
// @return: blog modelSystem.SysBlog, err error
func (blogService *BlogService) AddBlog(b modelSystem.SysBlog) (blog modelSystem.SysBlog, err error) {
	err = global.TB_DB.Create(&b).Error

	return b, err
}

// UpdateBlog
// @description: 更新博客
func (blogService *BlogService) UpdateBlog() {

}

// DeleteBlog
// @author: zhengji.su
// @description: 删除博客
// @param: id int
// @return: err error
func (blogService *BlogService) DeleteBlog(id int) (err error) {
	var blog modelSystem.SysBlog
	err = global.TB_DB.Where("id = ?", id).First(&blog).Delete(&blog).Error

	return err
}
