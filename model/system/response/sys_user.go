package response_param

import (
	modelSystem "technical-blog-server/model/system"
)

type SysUserResponse struct {
	User modelSystem.SysUser
}

type LoginResponse struct {
	Token     string         `json:"token"`
}
