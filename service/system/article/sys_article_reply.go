package article

import (
	"errors"
	"github.com/samber/lo"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	requestParams "technical-blog-server/model/system/request"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
)

type ReplyService struct {}

// AddReply
// @author: zhengji.su
// @description: 新增回复
// @param: replyParams article.SysArticleReply
// @return: error
func (service *ReplyService) AddReply(replyParams article.SysArticleReply) (*responseParam.ArticleReplyResponse, error) {
	err := global.TB_DB.Create(&replyParams).Error
	if err != nil {
		global.TB_LOG.Error("回复提交失败!", zap.Error(err))
		return nil, err
	}

	// 更新回复数量
	err = articleCommentService.UpdateReplyCount(replyParams.ArticleId, replyParams.ReplyCommentId, 1)
	if err != nil {
		global.TB_LOG.Error("回复条数统计更新失败!", zap.Error(err))
	}

	var list []article.SysArticleReply
	sql := `article_id = ? AND reply_comment_id = ? AND reply_id = ?`
	if err := global.TB_DB.Model(article.SysArticleReply{}).Where(sql, replyParams.ArticleId, replyParams.ReplyCommentId, replyParams.ReplyId).First(&list).Error; err != nil {
		return nil, err
	}

	if replyList := service.GetFormatReplyList(list, requestParams.GetReplyListIds{
		ArticleId: replyParams.ArticleId,
		ReplyCommentId: replyParams.ReplyCommentId,
	}); len(replyList) > 0 {
		return &replyList[0], nil
	}

	return nil, errors.New("查询为空！")
}

// GetReplyList
// @author: zhengji.su
// @description: 获取回复列表
// @param: ids requestParams.GetReplyListIds, pageInfo request.PageInfo
// @return: []article.SysArticleReply, error
func (service *ReplyService) GetReplyList(ids requestParams.GetReplyListIds, pageInfo request.PageInfo) ([]responseParam.ArticleReplyResponse, int64, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(article.SysArticleReply{})

	var list []article.SysArticleReply
	var total int64

	if err := db.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	if err := db.Where("article_id = ? AND reply_comment_id = ?", ids.ArticleId, ids.ReplyCommentId).Limit(limit).Offset(offset).Find(&list).Error; err != nil {
		return nil, 0, err
	}

	replyList := service.GetFormatReplyList(list, ids)

	return replyList, total, nil
}

// GetFormatReplyList
// @author: zhengji.su
// @description: 获取整理的回复列表
// @param: list []article.SysArticleReply, ids requestParams.GetReplyListIds
// @return: []responseParam.ArticleReplyResponse, error
func (service *ReplyService) GetFormatReplyList(list []article.SysArticleReply, ids requestParams.GetReplyListIds) []responseParam.ArticleReplyResponse {
	var parentReplyIds []string
	var userIds []string
	lo.ForEach(list, func(item article.SysArticleReply, index int) {
		if lo.IndexOf(userIds, item.ReplyUserId) == -1 {
			userIds = append(userIds, item.ReplyUserId)
		}
		if lo.IndexOf(userIds, item.ReplyToReplyId) == -1 {
			userIds = append(userIds, item.ReplyToReplyId)
		}
		parentReplyIds = append(parentReplyIds, item.ReplyToReplyId)
	})

	parentReplyList, _ := service.GetReplyListByIds(ids.ArticleId, ids.ReplyCommentId, parentReplyIds)
	userList, _ := userService.GetUserByIds(userIds)
	replyList := articleUtils.GetFormatReply(articleUtils.FormatReplyParams{
		ReplyList: list,
		UserList: userList,
		ParentReplyList: parentReplyList,
	})

	return replyList
}

// GetReplyListByIds
// @author: zhengji.su
// @description: 根据id获取回复列表
// @param: articleId, commentId string, ids []string
// @return: []article.SysArticleReply, error
func (service *ReplyService) GetReplyListByIds(articleId, commentId string, ids []string) ([]article.SysArticleReply, error) {
	var list []article.SysArticleReply
	db := global.TB_DB.Model(article.SysArticleReply{})
	err := db.Where("article_id = ? AND reply_comment_id = ? AND reply_id IN (?)", articleId, commentId, ids).Find(&list).Error
	return list, err
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

	return service.ScanReplyList(sql, ids.ArticleId, ids.ReplyCommentIds, 2)
}

// ScanReplyList
// @author: zhengji.su
// @description: 自定义sql语句查询
// @param: sql string, values ...interface{}
// @return: []article.SysArticleReply, error
func (service *ReplyService) ScanReplyList(sql string, values ...interface{}) ([]article.SysArticleReply, error) {
	var replyList []article.SysArticleReply
	err := global.TB_DB.Raw(sql, values...).Scan(&replyList).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		replyList = nil
	}

	return replyList, err
}

// GetParentReplyList
// @author: zhengji.su
// @description: 查询被回复者的回复信息
// @param: ids requestParams.GetReplyGroupIds, size int
// @return: []article.SysArticleReply, error
func (service *ReplyService) GetParentReplyList(ids requestParams.GetReplyGroupIds, size int) ([]article.SysArticleReply, error) {
	sql := `
		SELECT reply.* FROM (SELECT *
		FROM (SELECT *,ROW_NUMBER() OVER (PARTITION BY reply_comment_id) num
    		FROM sys_article_reply
    		WHERE article_id = ? AND reply_comment_id IN (?)) tmp
		WHERE num <= ?) g JOIN sys_article_reply reply ON g.reply_to_reply_id = reply.reply_id
	`
	return service.ScanReplyList(sql, ids.ArticleId, ids.ReplyCommentIds, size)
}
