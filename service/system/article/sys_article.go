package article

import (
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	modelSystem "technical-blog-server/model/system"
	responseParams "technical-blog-server/model/system/response"
	"technical-blog-server/service/system/category"
)

type ArticleService struct{}
type articleTag struct {
	responseParams.ArticleTags
	ArticleId string
}

var categoryService = new(category.CategoryService)

// GetArticleList
// @author: zhengji.su
// @description: 获取文章列表
// @param: pageInfo request.PageInfo
// @return: list interface{}, total int, err error
func (service *ArticleService) GetArticleList(articleParams request.GetArticleListParams) (list []responseParams.ArticleResponse, total int64, err error) {
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

	var articleIds []string
	for _, article := range articleList {
		articleIds = append(articleIds, article.ArticleId)
	}

	articleTags := service.GetArticleTags(articleIds)

	for index, article := range articleList {
		var tags []responseParams.ArticleTags
		for _, tag := range articleTags {
			if article.ArticleId == tag.ArticleId {
				tags = append(tags, responseParams.ArticleTags{
					TagName: tag.TagName,
					TagId: tag.TagId,
				})
			}
		}
		articleList[index].Tags = tags
	}

	return articleList, total, err
}

// AddArticle
// @author: zhengji.su
// @description: 新增文章
// @param: b modelSystem.SysBlog
// @return: blog modelSystem.SysArticle, err error
func (service *ArticleService) AddArticle(a modelSystem.SysArticle) (article modelSystem.SysArticle, err error) {
	err = global.TB_DB.Create(&a).Error

	return a, err
}

// UpdateArticle
// @description: 更新文章
func (service *ArticleService) UpdateArticle() {

}

// DeleteArticle
// @author: zhengji.su
// @description: 删除文章
// @param: id string
// @return: err error
func (service *ArticleService) DeleteArticle(id string) (err error) {
	var article modelSystem.SysArticle
	err = global.TB_DB.Where("article_id = ?", id).First(&article).Delete(&article).Error

	return err
}

// GetArticleById
// @author: zhengji.su
// @description: 根据ID获取博客详情
// @param: id string
// @return: articleInter responseParams.BlogResponse
func (service *ArticleService) GetArticleById(id string) (articleInter responseParams.ArticleDetail, err error)  {
	var article responseParams.ArticleDetail
	db := global.TB_DB.Model(&modelSystem.SysArticle{})
	err = db.Where("article_id = ?", id).First(&article).Error

	var articleTags []responseParams.ArticleTags
	tags := service.GetArticleTags([]string{id})
	for _, tag := range tags {
		articleTags = append(articleTags, responseParams.ArticleTags{
			TagId: tag.TagId,
			TagName: tag.TagName,
		})
	}

	articleCategory, _ := categoryService.GetCategoryById(article.CategoryId)
	article.Category = articleCategory.CategoryName
	article.Tags = articleTags

	return article, err
}

// AppendArticleTags
// @author: zhengji.su
// @description: 保存文章标签到表中
// @param: id string, t string
// @return: error
func (service *ArticleService) AppendArticleTags(id string, t []string) error {
	db := global.TB_DB

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

func (service *ArticleService) GetArticleTags(ids []string) []articleTag {
	sql := `
		SELECT tags.*, tag.tag_name 
		FROM sys_article_tags tags 
		JOIN sys_tag tag 
		ON tags.tag_id = tag.tag_id 
		WHERE tags.article_id IN (?)
 	`

	var tags []articleTag
	global.TB_DB.Raw(sql, ids).Scan(&tags)

	return tags
}
