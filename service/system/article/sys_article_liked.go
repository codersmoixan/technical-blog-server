package article

import (
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/system"
	responseParam "technical-blog-server/model/system/response"
)

// SaveLiked
// @author: zhengji.su
// @description: 文章点赞
// @param: id string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ArticleService) SaveLiked(id string) (articleInter responseParam.ArticleDetail, err error) {
	db := global.TB_DB.Model(&system.SysArticle{})
	err = db.Where("article_id = ?", id).Update("liked", gorm.Expr("liked + ?", 1)).Error
	if err != nil {
		return articleInter, err
	}

	articleInter, err = service.GetArticleById(id)

	return articleInter, err
}

// CancelLiked
// @author: zhengji.su
// @description: 文章取消点赞
// @param: id string
// @return: articleInter responseParam.ArticleDetail, err error
func (service *ArticleService) CancelLiked(id string) (articleInter responseParam.ArticleDetail, err error) {
	db := global.TB_DB.Model(&system.SysArticle{})
	err = db.Where("article_id = ?", id).Update("liked", gorm.Expr("liked - ?", 1)).Error
	if err != nil {
		return articleInter, err
	}

	articleInter, err = service.GetArticleById(id)

	return articleInter, err
}

// AddLikedRecord
// @author: zhengji.su
// @description: 添加点赞记录
// @param: liked system.SysArticleLiked
// @return: success bool, err error
func (service *ArticleService) AddLikedRecord(liked system.SysArticleLiked) (success bool, err error) {
	err = global.TB_DB.Create(&liked).Error

	if err != nil {
		return false, err
	}

	return true, nil
}

// DeleteLikedRecord
// @author: zhengji.su
// @description: 删除点赞记录
// @param: liked system.SysArticleLiked
// @return: success bool, err error
func (service *ArticleService) DeleteLikedRecord(liked system.SysArticleLiked) (success bool, err error) {
	err = global.TB_DB.Where("user_id = ? AND article_id = ?", liked.UserId, liked.ArticleId).Delete(&system.SysArticleLiked{}).Error
	if err != nil {
		return false, err
	}

	return true, nil
}

// GetUserIsLiked
// @author: zhengji.su
// @description: 查询用户是否已经点赞
// @param: userId uuid.UUID
// @return: likedList []responseParam.ArticleLikedResponse, err error
func (service *ArticleService) GetUserIsLiked(userId uuid.UUID) (likedList []responseParam.ArticleLikedResponse, err error) {
	var list []responseParam.ArticleLikedResponse
	db := global.TB_DB.Model(&system.SysArticleLiked{})
	err = db.Where("user_id = ?", userId).First(&list).Error

	return list, err
}

