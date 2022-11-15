package main

import (
	"fmt"
	"go.uber.org/zap"
	"technical-blog-server/core"
	"technical-blog-server/global"
	"technical-blog-server/initialize"
)

func main() {
	fmt.Printf("Hello Technical-blog")
	global.TB_VP = core.Viper()
	global.TB_LOG = core.Zap()
	zap.ReplaceGlobals(global.TB_LOG)
	global.TB_DB = initialize.Gorm() // gorm连接数据库
}
