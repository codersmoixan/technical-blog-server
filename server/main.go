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

	if global.TB_DB != nil {
		initialize.RegisterTables(global.TB_DB) // 初始化表

		// 程序结束前关闭数据库链接
		db, _ := global.TB_DB.DB()
		defer db.Close()
	}

	core.RunServer()
}
