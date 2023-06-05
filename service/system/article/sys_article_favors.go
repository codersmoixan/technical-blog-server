package article

import (
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/system"
	responseParam "technical-blog-server/model/system/response"
)

type FavorService struct {}

// SaveFavor
// @author: zhengji.su
// @description: 文章收藏
// @param: id string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *FavorService) SaveFavor(id string) (articleInter responseParam.ArticleDetail, err error) {
	db := global.TB_DB.Model(&system.SysArticle{})
	err = db.Where("article_id = ?", id).Update("favors", gorm.Expr("favors + ?", 1)).Error
	if err != nil {
		return articleInter, err
	}

	articleInter, err = articleService.GetArticleById(id)

	return articleInter, err
}

// CancelFavor
// @author: zhengji.su
// @description: 文章取消收藏
// @param: id string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *FavorService) CancelFavor(id string) (articleInter responseParam.ArticleDetail, err error) {
	db := global.TB_DB.Model(&system.SysArticle{})
	err = db.Where("article_id = ?", id).Update("favors", gorm.Expr("favors - ?", 1)).Error
	if err != nil {
		return articleInter, err
	}

	articleInter, err = articleService.GetArticleById(id)

	return articleInter, err
}

// AddFavorRecord
// @author: zhengji.su
// @description: 添加收藏记录
// @param: liked system.SysArticleLiked
// @return: success bool, err error
func (service *FavorService) AddFavorRecord(favor system.SysArticleFavors) (success bool, err error) {
	err = global.TB_DB.Create(&favor).Error

	if err != nil {
		return false, err
	}

	return true, nil
}

// DeleteFavorRecord
// @author: zhengji.su
// @description: 删除收藏记录
// @param: liked system.SysArticleLiked
// @return: success bool, err error
func (service *FavorService) DeleteFavorRecord(favor system.SysArticleFavors) (success bool, err error) {
	err = global.TB_DB.Where("user_id = ? AND article_id = ?", favor.UserId, favor.ArticleId).Delete(&system.SysArticleFavors{}).Error
	if err != nil {
		return false, err
	}

	return true, nil
}

// GetUserIsFavor
// @author: zhengji.su
// @description: 查询用户是否已经收藏
// @param: userId uuid.UUID
// @return: likedList []responseParam.ArticleLikedResponse, err error
func (service *FavorService) GetUserIsFavor(userId uuid.UUID) (favorList []responseParam.ArticleFavorResponse, err error) {
	var list []responseParam.ArticleFavorResponse
	db := global.TB_DB.Model(&system.SysArticleFavors{})
	err = db.Where("user_id = ?", userId).First(&list).Error

	return list, err
}
