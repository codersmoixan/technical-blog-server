package article

import (
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	"time"
)

type ViewsService struct {}

// UpdateViews
// @author: zhengji.su
// @description: 文章阅读量+1
// @param: id string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ViewsService) UpdateViews(id string) (articleInter responseParam.ArticleDetail, err error) {
	db := global.TB_DB.Model(&article.SysArticle{})
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
// @param: views article.SysArticleViews
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ViewsService) RecordViews(views article.SysArticleViews) (success bool, err error) {
	err = global.TB_DB.Create(&views).Error

	if err != nil {
		return false, err
	}

	return true, nil
}

// UpdateViewsDate
// @author: zhengji.su
// @description: 更新阅读时间
// @param: userId uint
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ViewsService) UpdateViewsDate(userId uint) {
	db := global.TB_DB.Model(&article.SysArticleViews{})
	db.Where("user_id = ?", userId).Update("updated_at", time.Now())
}

// GetUserViews
// @author: zhengji.su
// @description: 用户阅读列表
// @param: userId uint, pageInfo request.PageInfo
// @return: []responseParam.ArticleDetail, error
func (service *ViewsService) GetUserViews(userId uint, pageInfo request.PageInfo) ([]responseParam.ArticleViewsResponse, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(&article.SysArticleViews{})
	var viewsList []responseParam.ArticleViewsResponse

	err := db.Where("user_id = ?", userId).Limit(limit).Offset(offset).Find(&viewsList).Error

	return viewsList, err
}

// GetUserIsViews
// @author: zhengji.su
// @description: 获取用户是否已经阅读
// @param: userId uint
// @return: bool, error
func (service *ViewsService) GetUserIsViews(userId uint) (bool, error) {
	var list []responseParam.ArticleViewsResponse

	db := global.TB_DB.Model(&article.SysArticleViews{})
	err := db.Where("user_id = ?", userId).First(&list).Error

	return len(list) != 0, err
}
