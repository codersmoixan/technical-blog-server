package article

import (
	"errors"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/system/article"
	responseParam "technical-blog-server/model/system/response"
	articleUtils "technical-blog-server/utils/article"
)

type FavorService struct {}

// SaveFavor
// @author: zhengji.su
// @description: 文章收藏
// @param: favorParams articleUtils.ArticleBindUser
// @return: *responseParam.ArticleDetail, error
func (service *FavorService) SaveFavor(favorParams articleUtils.ArticleBindUser) (*responseParam.ArticleDetail, error) {
	list, _ := articleFavorService.GetUserFavor(favorParams.UserId)
	if len(list) != 0 {
		return nil, errors.New("文章已在收藏列表中，无法继续添加。")
	}

	var favor = &article.SysArticleFavors{
		ArticleId: favorParams.ArticleId,
		UserId: favorParams.UserId,
	}
	if _, err := articleFavorService.AddFavorRecord(*favor); err != nil {
		return nil, err
	}

	db := global.TB_DB.Model(&article.SysArticle{})
	if err := db.Where("article_id = ?", favorParams.ArticleId).Update("favors", gorm.Expr("favors + ?", 1)).Error; err != nil {
		return nil, err
	}

	articleInter, err := articleService.GetArticleById(favorParams.ArticleId)

	return &articleInter, err
}

// CancelFavor
// @author: zhengji.su
// @description: 文章取消收藏
// @param: favorParams article.ArticleBindUser
// @return: responseParam.ArticleDetail, error
func (service *FavorService) CancelFavor(favorParams articleUtils.ArticleBindUser) (*responseParam.ArticleDetail, error) {
	list, _ := articleFavorService.GetUserFavor(favorParams.UserId)
	if len(list) == 0 {
		return nil, errors.New("该文章并未收藏，无法移除收藏列表。")
	}

	var favor = &article.SysArticleFavors{
		ArticleId: favorParams.ArticleId,
		UserId: favorParams.UserId,
	}
	if _, err := articleFavorService.DeleteFavorRecord(*favor); err != nil {
		return nil, err
	}

	db := global.TB_DB.Model(&article.SysArticle{})
	if err := db.Where("article_id = ?", favorParams.ArticleId).Update("favors", gorm.Expr("favors - ?", 1)).Error; err != nil {
		return nil, err
	}

	articleInter, err := articleService.GetArticleById(favorParams.ArticleId)

	return &articleInter, err
}

// AddFavorRecord
// @author: zhengji.su
// @description: 添加收藏记录
// @param: liked system.SysArticleLiked
// @return: success bool, err error
func (service *FavorService) AddFavorRecord(favor article.SysArticleFavors) (success bool, err error) {
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
func (service *FavorService) DeleteFavorRecord(favor article.SysArticleFavors) (success bool, err error) {
	err = global.TB_DB.Where("user_id = ? AND article_id = ?", favor.UserId, favor.ArticleId).Delete(&article.SysArticleFavors{}).Error
	if err != nil {
		return false, err
	}

	return true, nil
}

// GetUserFavor
// @author: zhengji.su
// @description: 查询用户是否已经收藏
// @param: userId string
// @return: likedList []responseParam.ArticleLikedResponse, err error
func (service *FavorService) GetUserFavor(userId string) (favorList []responseParam.ArticleFavorResponse, err error) {
	var list []responseParam.ArticleFavorResponse
	db := global.TB_DB.Model(&article.SysArticleFavors{})
	err = db.Where("user_id = ?", userId).First(&list).Error

	return list, err
}
