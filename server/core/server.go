package core

import (
	"fmt"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/initialize"
	"time"
)

type server interface {
	ListenAndServer() error
}

// RunServer 运行服务
func RunServer() {
	if global.TB_CONFIG.System.UseRedis {
		// 初始化redis服务
		initialize.Redis()
	}

	router := initialize.Routers()
	router.Static("/form-generator", "./resource/page")

	address := fmt.Sprintf(":%d", global.TB_CONFIG.System.Addr)

	time.Sleep(10 * time.Microsecond)
	global.TB_LOG.Info("server run success on", zap.String("address", address))

	fmt.Printf("服务器启动成功")
}
