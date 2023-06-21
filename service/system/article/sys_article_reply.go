package article

import (
	"errors"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	requestParams "technical-blog-server/model/system/request"
	"technical-blog-server/utils"
)

type ReplyService struct {}

// AddReply
// @author: zhengji.su
// @description: 新增回复
// @param: replyParams article.SysArticleReply
// @return: error
func (service *ReplyService) AddReply(replyParams article.SysArticleReply) error {
	err := global.TB_DB.Create(&replyParams).Error

	return err
}

// GetReplyList
// @author: zhengji.su
// @description: 获取回复列表
// @param: ids requestParams.GetReplyListIds, pageInfo request.PageInfo
// @return: []article.SysArticleReply, error
func (service *ReplyService) GetReplyList(ids requestParams.GetReplyListIds, pageInfo request.PageInfo) ([]article.SysArticleReply, int64, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(article.SysArticleReply{})

	var replyList []article.SysArticleReply
	var total int64

	if err := db.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	if err := db.Where("article_id = ? AND reply_comment_id = ?", ids.ArticleId, ids.ReplyCommentId).Limit(limit).Offset(offset).Find(&replyList).Error; err != nil {
		return replyList, 0, err
	}

	return replyList, total, nil
}

// DeleteReply
// @author: zhengji.su
// @description: 删除回复
// @param: id string
// @return: error
func (service *ReplyService) DeleteReply(id string) error  {
	var reply article.SysArticleReply
	err := global.TB_DB.Where("reply_id = ?", id).First(&reply).Delete(&reply).Error
	return err
}

// UpdateReplyLiked
// @author: zhengji.su
// @description: 回复点赞
// @param: liked article.SysArticleReplyLiked, count int64
// @return: error
func (service *ReplyService) UpdateReplyLiked(liked article.SysArticleReplyLiked, count int) error  {
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ?`
	db := global.TB_DB.Model(&article.SysArticleReply{})
	err := db.Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId).Update("reply_liked", gorm.Expr("reply_liked + ?", count)).Error

	return err
}

// ResetReplyLikedDeletedAt
// @author: zhengji.su
// @description: 回复点赞
// @param: liked article.SysArticleReplyLiked, count int64
// @return: error
func (service *ReplyService) ResetReplyLikedDeletedAt(liked article.SysArticleReplyLiked) error {
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ? AND user_id = ?`
	db := global.TB_DB.Model(&article.SysArticleReplyLiked{})
	err := db.Unscoped().Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId, liked.UserId).Update("deleted_at", nil).Error

	return err
}

// AddLikedRecord
// @author: zhengji.su
// @description: 添加点赞记录
// @param: liked article.SysArticleReplyLiked
// @return: error
func (service *ReplyService) AddLikedRecord(liked article.SysArticleReplyLiked) error {
	err := global.TB_DB.Create(&liked).Error
	return err
}

// CancelLikedRecord
// @author: zhengji.su
// @description: 取消点赞
// @param: liked article.SysArticleReplyLiked
// @return: error
func (service *ReplyService) CancelLikedRecord(liked article.SysArticleReplyLiked) error {
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ? AND user_id = ?`
	err := global.TB_DB.Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId, liked.UserId).Delete(&article.SysArticleReplyLiked{}).Error

	return err
}

// GetUserLiked
// @author: zhengji.su
// @description: 查询用户点赞记录
// @param: liked article.SysArticleReplyLiked
// @return: error
func (service *ReplyService) GetUserLiked(liked article.SysArticleReplyLiked) ([]article.SysArticleReplyLiked, error) {
	var list []article.SysArticleReplyLiked
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ? AND user_id = ?`
	db := global.TB_DB.Model(&article.SysArticleReplyLiked{})
	err := db.Unscoped().Where(sql, liked.ArticleId, liked.ReplyCommentId, liked.ReplyId, liked.UserId).First(&list).Error

	return list, err
}

// GetGroupReply
// @author: zhengji.su
// @description: 查询用户点赞记录
// @param: reply requestParams.GetReplyGroupIds, size int
// @return: []article.SysArticleReply, error
func (service *ReplyService) GetGroupReply(ids requestParams.GetReplyGroupIds, size int) ([]article.SysArticleReply, error) {
	sql := `
		SELECT *
		FROM (SELECT *,ROW_NUMBER() OVER (PARTITION BY reply_comment_id) num
    		FROM sys_article_reply
    		WHERE article_id = ? AND reply_comment_id IN (?)) tmp
		WHERE num <= ?;
	`

	var replyList []article.SysArticleReply
	err := global.TB_DB.Raw(sql, ids.ArticleId, ids.ReplyCommentIds, size).Scan(&replyList).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		replyList = nil
	}

	return replyList, err
}
