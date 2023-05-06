package response_param

import (
	modelSystem "technical-blog-server/model/system"
)

type SysUserResponse struct {
	User modelSystem.SysUser
}

type LoginResponse struct {
	User      modelSystem.SysUser `json:"user"`
	Token     string         `json:"token"`
	ExpiresAt int64          `json:"expiresAt"`
}
