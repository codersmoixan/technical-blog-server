package article

import (
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/system/article"
)

type CommentLikedService struct {}

// GetUserLiked
// @author: zhengji.su
// @description: 查询用户评论点赞记录
// @param: params article.SysArticleCommentLiked
// @return: []article.SysArticleCommentLiked, error
func (service *CommentLikedService) GetUserLiked(params article.SysArticleCommentLiked) ([]article.SysArticleCommentLiked, error) {
	var list []article.SysArticleCommentLiked
	sql := `article_id = ? AND comment_id = ? AND user_id = ?`
	db := global.TB_DB.Model(&article.SysArticleCommentLiked{})
	err := db.Unscoped().Where(sql, params.ArticleId, params.CommentId, params.UserId).First(&list).Error

	return list, err
}

// AddLikedRecord
// @author: zhengji.su
// @description: 添加点赞记录
// @param: params article.SysArticleCommentLiked
// @return: error
func (service *CommentLikedService) AddLikedRecord(params article.SysArticleCommentLiked) error {
	err := global.TB_DB.Create(&params).Error
	return err
}

// ResetCommentLikedDeletedAt
// @author: zhengji.su
// @description: 回复点赞
// @param: params article.SysArticleReplyLiked, count int64
// @return: error
func (service *CommentLikedService) ResetCommentLikedDeletedAt(params article.SysArticleCommentLiked) error {
	sql := `article_id = ? AND comment_id = ? AND user_id = ?`
	db := global.TB_DB.Model(&article.SysArticleCommentLiked{})
	err := db.Unscoped().Where(sql, params.ArticleId, params.CommentId, params.UserId).Update("deleted_at", nil).Error

	return err
}

// UpdateCommentLiked
// @author: zhengji.su
// @description: 回复点赞
// @param: params article.SysArticleReplyLiked, count int64
// @return: error
func (service *CommentLikedService) UpdateCommentLiked(params article.SysArticleCommentLiked, count int) error  {
	sql := `article_id = ? AND comment_id = ?`
	db := global.TB_DB.Model(&article.SysArticleComment{})
	err := db.Where(sql, params.ArticleId, params.CommentId).Update("liked", gorm.Expr("liked + ?", count)).Error

	return err
}

// GetCommentLikedList
// @author: zhengji.su
// @description: 获取评论点赞列表
// @param: params string
// @return: []string, error
func (service *CommentLikedService) GetCommentLikedList(id string) ([]string, error) {
	var commentIds []string
	db := global.TB_DB.Model(&article.SysArticleCommentLiked{})
	if err := db.Where("article_id = ?", id).Select("comment_id").Find(&commentIds).Error; err != nil {
		return nil, err
	}

	return commentIds, nil
}

// CancelLikedRecord
// @author: zhengji.su
// @description: 取消点赞
// @param: liked article.SysArticleReplyLiked
// @return: error
func (service *CommentLikedService) CancelLikedRecord(params article.SysArticleCommentLiked) error {
	sql := `article_id = ? AND comment_id = ? AND user_id = ?`
	err := global.TB_DB.Where(sql, params.ArticleId, params.CommentId, params.UserId).Delete(&article.SysArticleCommentLiked{}).Error

	return err
}
