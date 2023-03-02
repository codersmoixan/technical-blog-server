package system

import (
	goNanoid "github.com/matoous/go-nanoid/v2"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	modelSystem "technical-blog-server/model/system"
	responseParams "technical-blog-server/model/system/response_params"
)

type BlogService struct{}

var tagService = new(TagService)
var categoryService = new(CategoryService)

// GetBlogList
// @author: zhengji.su
// @description: 获取博客列表
// @param: pageInfo request.PageInfo
// @return: list interface{}, total int, err error
func (blogService *BlogService) GetBlogList(pageInfo request.PageInfo) (list interface{}, total int64, err error) {
	limit := pageInfo.PageSize
	offset := pageInfo.PageSize * (pageInfo.Page - 1)
	db := global.TB_DB.Model(&modelSystem.SysBlog{})

	var blogList []responseParams.BlogResponse

	if err = db.Count(&total).Error; err != nil {
		return
	}
	err = db.Limit(limit).Offset(offset).Find(&blogList).Error

	for index, blog := range blogList {
		tag, _ := tagService.GetTagById(blog.TagId)
		category, _ := categoryService.GetCategoryById(blog.CategoryId)
		blogList[index].Tag = tag.Label
		blogList[index].Category = category.Label
	}

	return blogList, total, err
}

// AddBlog
// @author: zhengji.su
// @description: 新增博客
// @param: b modelSystem.SysBlog
// @return: blog modelSystem.SysBlog, err error
func (blogService *BlogService) AddBlog(b modelSystem.SysBlog) (blog modelSystem.SysBlog, err error) {
	id, er := goNanoid.New()
	if er != nil {
		return blog, er
	}

	b.BlogId = id
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
// @param: id string
// @return: err error
func (blogService *BlogService) DeleteBlog(id string) (err error) {
	var blog modelSystem.SysBlog
	err = global.TB_DB.Where("blog_id = ?", id).First(&blog).Delete(&blog).Error

	return err
}

// GetBlogById
// @author: zhengji.su
// @description: 根据ID获取博客详情
// @param: id string
// @return: blogInter responseParams.BlogResponse
func (blogService *BlogService) GetBlogById(id string) (blogInter responseParams.BlogDetail, err error)  {
	var blog responseParams.BlogDetail
	db := global.TB_DB.Model(&modelSystem.SysBlog{})
	err = db.Where("blog_id = ?", id).First(&blog).Error

	tag, _ := tagService.GetTagById(blog.TagId)
	category, _ := categoryService.GetCategoryById(blog.CategoryId)
	blog.Tag = tag.Label
	blog.Category = category.Label

	return blog, err
}
