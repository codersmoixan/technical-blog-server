package article

import (
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/system/article"
)

type ReplyLikedService struct {}

// GetUserLiked
// @author: zhengji.su
// @description: 查询用户回复点赞记录
// @param: liked article.SysArticleReplyLiked
// @return: []article.SysArticleReplyLiked, error
func (service *ReplyLikedService) GetUserLiked(liked article.SysArticleReplyLiked) ([]article.SysArticleReplyLiked, error) {
	var list []article.SysArticleReplyLiked
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ? AND user_id = ?`
	db := global.TB_DB.Model(&article.SysArticleReplyLiked{})
	err := db.Unscoped().Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId, liked.UserId).First(&list).Error

	return list, err
}

// AddLikedRecord
// @author: zhengji.su
// @description: 添加点赞记录
// @param: liked article.SysArticleReplyLiked
// @return: error
func (service *ReplyLikedService) AddLikedRecord(liked article.SysArticleReplyLiked) error {
	err := global.TB_DB.Create(&liked).Error
	return err
}

// UpdateReplyLiked
// @author: zhengji.su
// @description: 回复点赞
// @param: liked article.SysArticleReplyLiked, count int64
// @return: error
func (service *ReplyLikedService) UpdateReplyLiked(liked article.SysArticleReplyLiked, count int) error  {
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ?`
	db := global.TB_DB.Model(&article.SysArticleReply{})
	err := db.Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId).Update("reply_liked", gorm.Expr("reply_liked + ?", count)).Error

	return err
}

// CancelLikedRecord
// @author: zhengji.su
// @description: 取消点赞
// @param: liked article.SysArticleReplyLiked
// @return: error
func (service *ReplyLikedService) CancelLikedRecord(liked article.SysArticleReplyLiked) error {
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ? AND user_id = ?`
	err := global.TB_DB.Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId, liked.UserId).Delete(&article.SysArticleReplyLiked{}).Error

	return err
}

// ResetReplyLikedDeletedAt
// @author: zhengji.su
// @description: 回复点赞
// @param: liked article.SysArticleReplyLiked, count int64
// @return: error
func (service *ReplyLikedService) ResetReplyLikedDeletedAt(liked article.SysArticleReplyLiked) error {
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ? AND user_id = ?`
	db := global.TB_DB.Model(&article.SysArticleReplyLiked{})
	err := db.Unscoped().Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId, liked.UserId).Update("deleted_at", nil).Error

	return err
}

// GetReplyLikedList
// @author: zhengji.su
// @description: 获取回复点赞列表
// @param: params string
// @return: []string, error
func (service *ReplyLikedService) GetReplyLikedList(id string) ([]string, error) {
	var replyIds []string
	db := global.TB_DB.Model(&article.SysArticleReplyLiked{})
	if err := db.Where("article_id = ?", id).Select("reply_id").Find(&replyIds).Error; err != nil {
		return nil, err
	}

	return replyIds, nil
}
