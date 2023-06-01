package system

import (
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
func (articleService *ArticleService) GetArticleList(articleParams request.GetArticleListParams) (list interface{}, total int64, err error) {
	limit := articleParams.PageSize
	offset := articleParams.PageSize * (articleParams.Page - 1)
	categoryId := articleParams.CategoryId
	db := global.TB_DB.Model(&modelSystem.SysArticle{})

	var articleList []responseParams.ArticleResponse

	if categoryId == "" {
		if err = db.Count(&total).Error; err != nil {
			return articleList, 0, err
		}
		err = db.Limit(limit).Offset(offset).Find(&articleList).Error
	} else {
		if err = db.Where("category_id = ?", categoryId).Count(&total).Error; err != nil {
			return articleList, 0, err
		}
		err = db.Where("category_id = ?", categoryId).Limit(limit).Offset(offset).Find(&articleList).Error
	}

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
func (articleService *ArticleService) AddArticle(a modelSystem.SysArticle) (article modelSystem.SysArticle, err error) {
	err = global.TB_DB.Create(&a).Error

	return a, err
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
	err = global.TB_DB.Where("article_id = ?", id).First(&article).Delete(&article).Error

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
	err = db.Where("article_id = ?", id).First(&article).Error

	tag, _ := tagService.GetTagById(article.TagId)
	category, _ := categoryService.GetCategoryById(article.CategoryId)
	article.Tag = tag.TagName
	article.Category = category.CategoryName

	return article, err
}

func (articleService *ArticleService) AppendArticleTags(id string, t []string) error {
	db := global.TB_DB
	if err := db.AutoMigrate(&modelSystem.SysArticleTags{}); err != nil {
		return err
	}

	var tags []modelSystem.SysArticleTags
	for _, tagId := range t {
		tag := modelSystem.SysArticleTags{
			ArticleId: id,
			TagId: tagId,
		}
		tags = append(tags, tag)
	}

	if err := db.Create(&tags).Error; err != nil {
		return err
	}

	return nil
}
