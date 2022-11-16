package utils

import "golang.org/x/crypto/bcrypt"

// BcryptHash
// @description: 使用 bcrypt 对密码进行加密
// @return: string
func BcryptHash(password string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return string(bytes)
}

// BcryptCheck
// @description: 对比明文密码和数据库的哈希值，是否匹配
// @return: bool
func BcryptCheck(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	return err == nil
}
