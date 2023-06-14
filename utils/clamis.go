package utils

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/global"
	requestParams "technical-blog-server/model/system/request"
)

func GetClaims(c *gin.Context) (*requestParams.CustomClaims, error) {
	token := c.Request.Header.Get("x-token")
	j := NewJWT()
	claims, err := j.ParseToken(token)
	if err != nil {
		global.TB_LOG.Error("从Gin的Context中获取从jwt解析信息失败, 请检查请求头是否存在x-token且claims是否为规定结构")
	}
	return claims, err
}

// GetUserKeyID 从Gin的Context中获取从jwt解析出来的用户ID
func GetUserKeyID(c *gin.Context) uint {
	if claims, exists := c.Get("claims"); !exists {
		if cl, err := GetClaims(c); err != nil {
			return 0
		} else {
			return cl.ID
		}
	} else {
		waitUse := claims.(*requestParams.CustomClaims)
		return waitUse.ID
	}
}

// GetUserId 从Gin的Context中获取从jwt解析出来的用户UUID
func GetUserId(c *gin.Context) string {
	if claims, exists := c.Get("claims"); !exists {
		if cl, err := GetClaims(c); err != nil {
			return ""
		} else {
			return cl.UserId
		}
	} else {
		waitUse := claims.(*requestParams.CustomClaims)
		return waitUse.UserId
	}
}

// GetUserAuthorityId 从Gin的Context中获取从jwt解析出来的用户角色id
func GetUserAuthorityId(c *gin.Context) uint {
	if claims, exists := c.Get("claims"); !exists {
		if cl, err := GetClaims(c); err != nil {
			return 0
		} else {
			return cl.AuthorityId
		}
	} else {
		waitUse := claims.(*requestParams.CustomClaims)
		return waitUse.AuthorityId
	}
}

// GetUserInfo 从Gin的Context中获取从jwt解析出来的用户角色id
func GetUserInfo(c *gin.Context) *requestParams.CustomClaims {
	if claims, exists := c.Get("claims"); !exists {
		if cl, err := GetClaims(c); err != nil {
			return nil
		} else {
			return cl
		}
	} else {
		waitUse := claims.(*requestParams.CustomClaims)
		return waitUse
	}
}

// GetUsername 从Gin的Context中获取从jwt解析出来的用户名
func GetUsername(c *gin.Context) string {
	userInfo := GetUserInfo(c)

	return userInfo.Username
}

func GetIsEmptyUserId(id uint) bool {
	return id == 0
}
