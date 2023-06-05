package article

import (
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/system"
	responseParam "technical-blog-server/model/system/response"
)

type ViewsService struct {}

// UpdateViews
// @author: zhengji.su
// @description: 文章阅读量+1
// @param: id string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ViewsService) UpdateViews(id string) (articleInter responseParam.ArticleDetail, err error) {
	db := global.TB_DB.Model(&system.SysArticle{})
	err = db.Where("article_id = ?", id).Update("views", gorm.Expr("views + ?", 1)).Error
	if err != nil {
		return articleInter, err
	}

	articleInter, err = articleService.GetArticleById(id)

	return articleInter, err
}

// RecordViews
// @author: zhengji.su
// @description: 记录文章阅读
// @param: id string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ViewsService) RecordViews(views system.SysArticleViews) (success bool, err error) {
	err = global.TB_DB.Create(&views).Error

	if err != nil {
		return false, err
	}

	return true, nil
}
