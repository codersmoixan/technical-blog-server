package article

import (
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
)

type CommentService struct {}

// GetCommentList
// @author: zhengji.su
// @description: 获取评论列表
// @param: id string
// @return: []responseParam.ArticleCommentResponse, error
func (service *CommentService) GetCommentList(id string, pageInfo request.PageInfo) ([]responseParam.ArticleCommentResponse, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(&article.SysArticleComment{})

	var commentList []responseParam.ArticleCommentResponse
	if err := db.Where("article_id = ?", id).Limit(limit).Offset(offset).Find(&commentList).Error; err != nil {
		return commentList, err
	}

	return commentList, nil
}

// SubmitComment
// @author: zhengji.su
// @description: 提交评论
// @param: commentParam article.SysArticleComment
// @return: responseParam.ArticleCommentResponse, error
func (service *CommentService) SubmitComment(commentParams article.SysArticleComment) (article.SysArticleComment, error) {
	err := global.TB_DB.Create(&commentParams).Error

	return commentParams, err
}
