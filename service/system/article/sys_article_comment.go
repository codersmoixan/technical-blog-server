package article

import (
	lo "github.com/samber/lo"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system"
	"technical-blog-server/model/system/article"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
)

type CommentService struct {}
type CommentRes = responseParam.ArticleCommentResponse
type SysArticle = article.SysArticleComment

// GetCommentList
// @author: zhengji.su
// @description: 获取评论列表
// @param: id string pageInfo request.PageInfo
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
	userIds := lo.Reduce[SysArticle, []string](list, func(agg []string, item SysArticle, index int) []string {
		if lo.IndexOf(agg, item.UserId) == -1 {
			agg = append(agg, item.UserId)
		}
		return agg
	}, make([]string, 0))

	userList, err := userService.GetUserByIds(userIds)
	if err != nil {
		return nil, 0, err
	}

	commentList := make([]CommentRes, len(list))
	lo.ForEach(list, func(comment article.SysArticleComment, index int) {
		userInfo, _ := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == comment.UserId
		})
		commentList[index].UserInfo = userInfo
		commentList[index].CommentInfo = comment
	})

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
