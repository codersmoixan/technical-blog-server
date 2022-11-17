package request

// Login 用户登录参数
type Login struct {
	Username  string `json:"username"`  // 用户名
	Password  string `json:"password"`  // 密码
	Captcha   string `json:"captcha"`   // 验证码
	CaptchaId string `json:"captchaId"` // 验证码ID
}

// Register 用户注册
type Register struct {
	Username string `json:"username"`
	Password string `json:"password"`
	NickName string `json:"nickName"`
	Enable   int    `json:"enable"`
}
