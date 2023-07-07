package article

import (
	"fmt"
	"github.com/samber/lo"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	modelArticle "technical-blog-server/model/system/article"
	requestParams "technical-blog-server/model/system/request"
	responseParams "technical-blog-server/model/system/response"
	"technical-blog-server/service/system/category"
)

type Service struct{}
type articleTag struct {
	responseParams.ArticleTags
	ArticleId string
}

var categoryService = new(category.Service)

// GetArticleList
// @author: zhengji.su
// @description: 获取文章列表
// @param: pageInfo request.PageInfo
// @return: list interface{}, total int, err error
func (service *Service) GetArticleList(articleParams request.GetArticleListParams) (list []responseParams.ArticleResponse, total int64, err error) {
	limit := articleParams.PageSize
	offset := articleParams.PageSize * (articleParams.Page - 1)
	categoryId := articleParams.CategoryId
	db := global.TB_DB.Model(&modelArticle.SysArticle{})

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

	articleTags, _ := service.GetArticleTags(articleIds)

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
// @param: articleParams requestParams.ArticleDetail
// @return: responseParams.ArticleAddResponse, error
func (service *Service) AddArticle(articleParams requestParams.ArticleDetail) (*responseParams.ArticleAddResponse, error) {
	article := &modelArticle.SysArticle{
		ArticleId: articleParams.ArticleId,
		AuthorId: articleParams.UserId,
		ArticleName:        articleParams.ArticleName,
		Description: articleParams.Description,
		Content:     articleParams.Content,
		CategoryId:    articleParams.Category,
		ArticleCoverUrl:   articleParams.ArticleCoverUrl,
		ArticleCoverKey: articleParams.ArticleCoverKey,
	}

	if err := global.TB_DB.Create(&article).Error; err != nil {
		return nil, err
	}

	// 保存文章标签
	if err := articleService.AppendArticleTags(articleParams.ArticleId, articleParams.Tags); err != nil {
		global.TB_LOG.Error(fmt.Sprintf("TBError: 创建标签表失败！%v", err))
		return nil, err
	}

	// 获取文章标签
	tags, err := articleService.GetArticleTags([]string{articleParams.ArticleId})
	var articleTags []responseParams.ArticleTags
	for _, tag := range tags {
		articleTags = append(articleTags, responseParams.ArticleTags{
			TagId: tag.TagId,
			TagName: tag.TagName,
		})
	}

	// 获取分类
	articleCategory, err := categoryService.GetCategoryById(article.CategoryId)
	if err != nil {
		return nil, err
	}

	articleDetail := responseParams.ArticleAddResponse{
		ArticleName:        article.ArticleName,
		Description: article.Description,
		Tags:         articleTags,
		CategoryId:    article.CategoryId,
		CategoryName: articleCategory.CategoryName,
		ArticleCoverUrl:   article.ArticleCoverUrl,
		ArticleCoverKey: article.ArticleCoverKey,
	}

	return &articleDetail, err
}

// UpdateArticle
// @description: 更新文章
func (service *Service) UpdateArticle() {

}

// DeleteArticle
// @author: zhengji.su
// @description: 删除文章
// @param: id string
// @return: err error
func (service *Service) DeleteArticle(id string) (err error) {
	var article modelArticle.SysArticle
	err = global.TB_DB.Where("article_id = ?", id).First(&article).Delete(&article).Error

	return err
}

// GetArticleById
// @author: zhengji.su
// @description: 根据ID获取博客详情
// @param: id string
// @return: articleInter responseParams.BlogResponse
func (service *Service) GetArticleById(id string) (articleInter responseParams.ArticleDetail, err error)  {
	var article responseParams.ArticleDetail
	db := global.TB_DB.Model(&modelArticle.SysArticle{})
	err = db.Where("article_id = ?", id).First(&article).Error

	var articleTags []responseParams.ArticleTags
	tags, _ := service.GetArticleTags([]string{id})
	lo.ForEach(tags, func(tag articleTag, index int) {
		articleTags = append(articleTags, responseParams.ArticleTags{
			TagId: tag.TagId,
			TagName: tag.TagName,
		})
	})

	articleCategory, _ := categoryService.GetCategoryById(article.CategoryId)
	article.Category = articleCategory.CategoryName
	article.Tags = articleTags
	article.AuthorInfo, _ = userService.GetUserById(article.AuthorId)

	return article, err
}

// AppendArticleTags
// @author: zhengji.su
// @description: 保存文章标签到表中
// @param: id string, t string
// @return: error
func (service *Service) AppendArticleTags(id string, t []string) error {
	db := global.TB_DB

	var tags []modelArticle.SysArticleTags
	lo.ForEach(t, func(tag string, index int) {
		tags = append(tags, modelArticle.SysArticleTags{
			ArticleId: id,
			TagId: tag,
		})
	})

	if err := db.Create(&tags).Error; err != nil {
		return err
	}

	return nil
}

func (service *Service) GetArticleTags(ids []string) ([]articleTag, error) {
	sql := `
		SELECT tags.*, tag.tag_name 
		FROM sys_article_tags tags 
		JOIN sys_tag tag 
		ON tags.tag_id = tag.tag_id 
		WHERE tags.article_id IN (?)
 	`

	var tags []articleTag
	err := global.TB_DB.Raw(sql, ids).Scan(&tags).Error

	return tags, err
}
