package middleware

import (
	"github.com/gin-gonic/gin"
	"strconv"
	"technical-blog-server/global"
	"technical-blog-server/model/common/response"
	"technical-blog-server/utils"
	"time"
)

func JwtAuth() gin.HandlerFunc {
	return func (c *gin.Context) {
		// 我们这里jwt鉴权取头部信息 x-token 登录时回返回token信息 这里前端需要把token存储到cookie或者本地localStorage中 不过需要跟后端协商过期时间 可以约定刷新令牌或者重新登录
		token := c.Request.Header.Get("x-token")
		if token == "" {
			response.UnauthorizedDetailed(gin.H{"reload": true}, "未登录或非法访问", c)
			c.Abort()
			return
		}

		j := utils.NewJWT()
		// 解析token包含的信息
		claims, err := j.ParseToken(token)
		if err != nil {
			if err == utils.TokenExpired {
				response.UnauthorizedDetailed(gin.H{"reload": true}, "授权已过期", c)
				c.Abort()
				return
			}
			response.UnauthorizedDetailed(gin.H{"reload": true}, err.Error(), c)
			c.Abort()
			return
		}

		if claims.ExpiresAt-time.Now().Unix() < claims.BufferTime {
			claims.ExpiresAt = time.Now().Unix() + global.TB_CONFIG.JWT.ExpiresTime
			newToken, _ := j.CreateTokenByOldToken(token, *claims)
			newClaims, _ := j.ParseToken(newToken)
			c.Header("new-token", newToken)
			c.Header("new-expires-at", strconv.FormatInt(newClaims.ExpiresAt, 10))
		}
		c.Set("claims", claims)
		c.Next()
	}
}
