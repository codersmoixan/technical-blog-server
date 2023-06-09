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
type ArticleRes = responseParam.ArticleCommentResponse
type SysArticle = article.SysArticleComment

// GetCommentList
// @author: zhengji.su
// @description: 获取评论列表
// @param: id string
// @return: []responseParam.ArticleCommentResponse, error
func (service *CommentService) GetCommentList(id string, pageInfo request.PageInfo) ([]ArticleRes, int64, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(&SysArticle{})

	var commentList []SysArticle
	var total int64

	if err := db.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	err := db.Where("article_id = ?", id).Limit(limit).Offset(offset).Find(&commentList).Error
	userIds := lodash.Reduce[SysArticle, uint](commentList, func(item SysArticle, _ int, result []uint) []uint {
		var ids []uint
		for _, uId := range []uint{item.OriginId, item.ParentId, item.TargetId} {
			if uId != 0 {
				val := lo.IndexOf(result, uId)
				if val == -1 {
					ids = append(ids, uId)
				}
			}
		}
		return ids
	})

	userList, err := userService.GetUserByIds(userIds)
	if err != nil {
		return nil, 0, err
	}

	list := lo.Map[SysArticle, ArticleRes](commentList, func(item SysArticle, _ int) ArticleRes {
		var interUser ArticleRes
		interUser.SysArticleComment = item
		for _, user := range userList {
			if item.OriginId == user.ID {
				interUser.OriginName = user.NickName
			}
			if item.TargetId == user.ID {
				interUser.TargetName = user.NickName
			}
			if item.ParentId == user.ID {
				interUser.ParentName = user.NickName
			}
		}

		return interUser
	})

	return list, total, err
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
