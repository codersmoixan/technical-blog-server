package article

import (
	lo "github.com/samber/lo"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	"technical-blog-server/utils/lodash"
)

type CommentService struct {}
type CommentRes = responseParam.ArticleCommentResponse
type SysArticle = article.SysArticleComment

// GetCommentList
// @author: zhengji.su
// @description: 获取评论列表
// @param: id string
// @return: []responseParam.ArticleCommentResponse, error
func (service *CommentService) GetCommentList(id string, pageInfo request.PageInfo) ([]CommentRes, int64, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(&SysArticle{})

	var list []SysArticle
	var total int64

	if err := db.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	err := db.Where("article_id = ?", id).Limit(limit).Offset(offset).Find(&list).Error
	userIds := lodash.Reduce[SysArticle, uint](list, func(item SysArticle, _ int, result []uint) []uint {
		var ids []uint
		val := lo.IndexOf(result, item.UserId)
		if val == -1 {
			ids = append(ids, item.UserId)
		}
		return ids
	})

	userList, err := userService.GetUserByIds(userIds)
	if err != nil {
		return nil, 0, err
	}

	commentList := make([]CommentRes, len(list))
	for index, comment := range list {
		for _, user := range userList {
			if comment.UserId == user.ID {
				commentList[index].UserInfo = user
			}
		}
		commentList[index].CommentInfo = comment
	}

	return commentList, total, err
}

// SubmitComment
// @author: zhengji.su
// @description: 提交评论
// @param: commentParam article.SysArticleComment
// @return: responseParam.ArticleCommentResponse, error
func (service *CommentService) SubmitComment(commentParams SysArticle) (SysArticle, error) {
	err := global.TB_DB.Create(&commentParams).Error

	return commentParams, err
}
