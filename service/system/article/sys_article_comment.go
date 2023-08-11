package article

import (
	"github.com/samber/lo"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system"
	"technical-blog-server/model/system/article"
	requestParam "technical-blog-server/model/system/request"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
)

type CommentService struct {}
type Comment = article.SysArticleComment
type CommentIds struct {
	userIds []string
	commentIds []string
}

// GetCommentList
// @author: zhengji.su
// @description: 获取评论列表
// @param: id string pageInfo request.PageInfo
// @return: []Comment, error
func (service *CommentService) GetCommentList(id string, pageInfo request.PageInfo) ([]responseParam.ArticleCommentResponse, int64, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(&Comment{})
	var list []Comment
	var total int64

	//if err := db.Where("article_id = ?", id).Count(&total).Error; err != nil {
	//	return nil, 0, err
	//}

	err := db.Where("article_id = ?", id).Count(&total).Limit(limit).Offset(offset).Find(&list).Error

	var ids CommentIds
	lo.ForEach(list, func(item article.SysArticleComment, index int) {
		if lo.IndexOf(ids.userIds, item.UserId) == -1 {
			ids.userIds = append(ids.userIds, item.UserId)
		}
		if item.ReplyCount > 0 {
			ids.commentIds = append(ids.commentIds, item.CommentId)
		}
	})

	// 获取评论回复列表
	replyList, _ := articleReplyService.GetGroupReply(requestParam.GetReplyGroupIds{
		ArticleId: id,
		ReplyCommentIds: ids.commentIds,
	}, 2)
	lo.ForEach(replyList, func(item article.SysArticleReply, index int) {
		if lo.IndexOf(ids.userIds, item.ReplyUserId) == -1 {
			ids.userIds = append(ids.userIds, item.ReplyUserId)
		}
	})

	// 获取用户信息
	userList, _ := userService.GetUserByIds(ids.userIds)
	// 获取父回复列表
	parentReplyList, _ := articleReplyService.GetParentReplyList(requestParam.GetReplyGroupIds{
		ArticleId: id,
		ReplyCommentIds: ids.commentIds,
	}, 2)

	commentList := make([]responseParam.ArticleCommentResponse, len(list))
	lo.ForEach(list, func(comment article.SysArticleComment, index int) {
		userInfo, _ := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == comment.UserId
		})
		filterReplyList := lo.Filter(replyList, func(item article.SysArticleReply, index int) bool {
			return item.ReplyCommentId == comment.CommentId
		})
		replyInfos := articleUtils.GetFormatReply(articleUtils.FormatReplyParams{
			ReplyList: filterReplyList,
			UserList: userList,
			ParentReplyList: parentReplyList,
		})
		commentList[index].CommentId = comment.CommentId
		commentList[index].UserInfo = userInfo
		commentList[index].CommentInfo = comment
		commentList[index].ReplyInfos = replyInfos
	})

	return commentList, total, err
}

// SubmitComment
// @author: zhengji.su
// @description: 提交评论
// @param: commentParam article.SysArticleComment
// @return: responseParam.ArticleCommentResponse, error
func (service *CommentService) SubmitComment(commentParams Comment) (Comment, error) {
	err := global.TB_DB.Create(&commentParams).Error

	return commentParams, err
}

// UpdateReplyCount
// @author: zhengji.su
// @description: 更新评论的回复条数
// @param: articleId, id string, count int
// @return: error
func (service *CommentService) UpdateReplyCount(articleId, id string, count int) error {
	db := global.TB_DB.Model(&article.SysArticleComment{})
	err := db.Where("article_id = ? AND comment_id = ?", articleId, id).Update("reply_count", gorm.Expr("reply_count + ?", count)).Error

	return err
}
