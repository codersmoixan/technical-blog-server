package article

import (
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
	"time"
)

type ViewsService struct {}

// UpdateViews
// @author: zhengji.su
// @description: 文章阅读量+1
// @param: viewParams articleUtils.ArticleBindUser
// @return: responseParam.ArticleDetail, error
func (service *ViewsService) UpdateViews(viewParams articleUtils.ArticleBindUser) (*responseParam.ArticleDetail, error) {
	articleInter, err := articleService.GetArticleById(viewParams.ArticleId)

	if !viewParams.UserIsEmpty {
		isView, err := articleViewsService.GetUserIsViews(viewParams.UserId)

		if isView {
			articleViewsService.UpdateViewsDate(viewParams.UserId)
			return &articleInter, nil
		}

		var views = &article.SysArticleViews{
			ArticleId: viewParams.ArticleId,
			UserId: viewParams.UserId,
		}

		if _, err = articleViewsService.RecordViews(*views); err != nil {
			return nil, err
		}
	}

	db := global.TB_DB.Model(&article.SysArticle{})
	if err := db.Where("article_id = ?", viewParams.ArticleId).Update("views", gorm.Expr("views + ?", 1)).Error; err != nil {
		return nil, err
	}

	return &articleInter, err
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
// @param: userId string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ViewsService) UpdateViewsDate(userId string) {
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
// @param: userId string
// @return: bool, error
func (service *ViewsService) GetUserIsViews(userId string) (bool, error) {
	var list []responseParam.ArticleViewsResponse

	db := global.TB_DB.Model(&article.SysArticleViews{})
	err := db.Where("user_id = ?", userId).First(&list).Error

	return len(list) != 0, err
}
