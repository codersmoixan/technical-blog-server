package system

import (
	goNanoid "github.com/matoous/go-nanoid/v2"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	modelSystem "technical-blog-server/model/system"
	responseParams "technical-blog-server/model/system/response_params"
)

type ArticleService struct{}

var tagService = new(TagService)
var categoryService = new(CategoryService)

// GetArticleList
// @author: zhengji.su
// @description: 获取文章列表
// @param: pageInfo request.PageInfo
// @return: list interface{}, total int, err error
func (articleService *ArticleService) GetArticleList(pageInfo request.PageInfo) (list interface{}, total int64, err error) {
	limit := pageInfo.PageSize
	offset := pageInfo.PageSize * (pageInfo.Page - 1)
	db := global.TB_DB.Model(&modelSystem.SysArticle{})

	var articleList []responseParams.ArticleResponse

	if err = db.Count(&total).Error; err != nil {
		return
	}
	err = db.Limit(limit).Offset(offset).Find(&articleList).Error

	for index, article := range articleList {
		tag, _ := tagService.GetTagById(article.TagId)
		category, _ := categoryService.GetCategoryById(article.CategoryId)
		articleList[index].Tag = tag.TagName
		articleList[index].Category = category.CategoryName
	}

	return articleList, total, err
}

// AddArticle
// @author: zhengji.su
// @description: 新增文章
// @param: b modelSystem.SysBlog
// @return: blog modelSystem.SysArticle, err error
func (articleService *ArticleService) AddArticle(b modelSystem.SysArticle) (blog modelSystem.SysArticle, err error) {
	id, er := goNanoid.New()
	if er != nil {
		return blog, er
	}

	b.ArticleId = id
	err = global.TB_DB.Create(&b).Error

	return b, err
}

// UpdateArticle
// @description: 更新文章
func (articleService *ArticleService) UpdateArticle() {

}

// DeleteArticle
// @author: zhengji.su
// @description: 删除文章
// @param: id string
// @return: err error
func (articleService *ArticleService) DeleteArticle(id string) (err error) {
	var article modelSystem.SysArticle
	err = global.TB_DB.Where("blog_id = ?", id).First(&article).Delete(&article).Error

	return err
}

// GetArticleById
// @author: zhengji.su
// @description: 根据ID获取博客详情
// @param: id string
// @return: blogInter responseParams.BlogResponse
func (articleService *ArticleService) GetArticleById(id string) (blogInter responseParams.ArticleDetail, err error)  {
	var article responseParams.ArticleDetail
	db := global.TB_DB.Model(&modelSystem.SysArticle{})
	err = db.Where("blog_id = ?", id).First(&article).Error

	tag, _ := tagService.GetTagById(article.TagId)
	category, _ := categoryService.GetCategoryById(article.CategoryId)
	article.Tag = tag.TagName
	article.Category = category.CategoryName

	return article, err
}
