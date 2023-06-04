package article

import (
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/system"
	responseParam "technical-blog-server/model/system/response"
)

func (service *ArticleService) SaveLiked(id string) (articleInter responseParam.ArticleDetail, err error) {
	db := global.TB_DB.Model(&system.SysArticle{})
	err = db.Where("article_id = ?", id).Update("liked", gorm.Expr("liked + ?", 1)).Error
	if err != nil {
		return articleInter, err
	}

	articleInter, err = service.GetArticleById(id)

	return articleInter, err
}

func (service *ArticleService) CancelLiked() {

}

func (service *ArticleService) AddLikedRecord(liked system.SysArticleLiked) (likedInter responseParam.ArticleLikedResponse, err error) {
	err = global.TB_DB.Create(&liked).Error

	likedInter = responseParam.ArticleLikedResponse{
		ArticleId: liked.ArticleId,
		UserId: liked.UserId,
	}
	return likedInter, err
}

