package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"technical-blog-server/config"
	"technical-blog-server/global"
)

// Cors
// @author: zhengji.su
// @description: CORE 放行所有跨域请求并放行所有 OPTIONS 方法
// @return: gin.HandlerFunc
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")

		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type, New-Token, New-Expires-At")
		c.Header("Access-Control-Allow-Credentials", "true")

		// 放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}

		// 处理请求
		c.Next()
	}
}

// CorsByRules
// @author: zhengji.su
// @description: 根据配置处理跨域请求
// @return: gin.HandlerFunc
func CorsByRules() gin.HandlerFunc {
	// 放行全部
	if global.TB_CONFIG.Cors.Mode == "allow-all" {
		return Cors()
	}

	return func(c *gin.Context) {
		whitelist := checkCors(c.GetHeader("origin"))

		// 通过检车，添加请求头
		if whitelist != nil {
			c.Header("Access-Control-Allow-Origin", whitelist.AllowOrigin)
			c.Header("Access-Control-Allow-Headers", whitelist.AllowHeaders)
			c.Header("Access-Control-Allow-Methods", whitelist.AllowMethods)
			c.Header("Access-Control-Expose-Headers", whitelist.ExposeHeaders)

			if whitelist.AllowCredentials {
				c.Header("Access-Control-Allow-Credentials", "true")
			}
		}

		// 严格白名单模式未通过检查，直接拒绝请求
		if whitelist == nil && global.TB_CONFIG.Cors.Mode == "strict-whitelist" {
			c.AbortWithStatus(http.StatusForbidden)
		} else {
			// 非严格模式白名单，放行所有OPTIONS方法
			if c.Request.Method == "OPTIONS" {
				c.AbortWithStatus(http.StatusNoContent)
			}
		}

		// 处理请求
		c.Next()
	}
}

// @author: zhengji.su
// @description: 检查跨域白名单
// @param: currentOrigin string
// @return: *config.CORSWhitelist
func checkCors(currentOrigin string) *config.CORSWhitelist {
	for _, whitelist := range global.TB_CONFIG.Cors.Whitelist {
		// 遍历配置中的跨域头，寻找匹配项
		return &whitelist
	}

	return nil
}
