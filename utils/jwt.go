package utils

import (
	"github.com/golang-jwt/jwt/v4"
	"technical-blog-server/global"
	"technical-blog-server/model/system/request_params"
	"time"
)

type JWT struct {
	SigningKey []byte
}

func (j *JWT) CreateClaims(baseClaims request.BaseClaims) request.CustomClaims {
	claims := request.CustomClaims{
		BaseClaims: baseClaims,
		BufferTime: global.TB_CONFIG.JWT.BufferTime, // 缓冲时间1天 缓冲时间内会获得新的token刷新令牌 此时一个用户会存在两个有效令牌 但是前端只留一个 另一个会丢失
		StandardClaims: jwt.StandardClaims{
			NotBefore: time.Now().Unix() - 1000,                              // 签名生效时间
			ExpiresAt: time.Now().Unix() + global.TB_CONFIG.JWT.ExpiresTime, // 过期时间 7天  配置文件
			Issuer:    global.TB_CONFIG.JWT.Issuer,                          // 签名的发行者
		},
	}

	return claims
}

// CreateToken 创建一个token
func (j *JWT) CreateToken(claims request.CustomClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(j.SigningKey)
}
