package core

import (
	"fmt"
	"github.com/fvbock/endless"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/initialize"
	"time"
)

type server interface {
	ListenAndServe() error
}

// @author: zhengji.su
// @description: 初始化服务器
// @param: address string, router *gin.Engine
// @return: server
func initServer(address string, router *gin.Engine) server {
	s := endless.NewServer(address, router)
	s.ReadHeaderTimeout = 20 * time.Second
	s.WriteTimeout = 20 * time.Second
	s.MaxHeaderBytes = 1 << 20

	return s
}

// RunServer
// @author: zhengji.su
// @description: 运行服务
func RunServer() {
	if global.TB_CONFIG.System.UseRedis {
		// 初始化redis服务
		initialize.Redis()
	}

	Router := initialize.Routers()
	Router.Static("/form-generator", "./resource/page")

	address := fmt.Sprintf(":%d", global.TB_CONFIG.System.Addr)
	s := initServer(address, Router)

	time.Sleep(10 * time.Microsecond)
	global.TB_LOG.Info("server run success on", zap.String("address", address))

	fmt.Printf("服务器启动成功：访问http://127.0.0.1%s\n", address)

	global.TB_LOG.Error(s.ListenAndServe().Error())
}
