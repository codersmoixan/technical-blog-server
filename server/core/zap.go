package core

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
	"technical-blog-server/global"
	"technical-blog-server/internal"
	"technical-blog-server/utils"
)

func Zap() (logger *zap.Logger) {
	// TODO 判断是否有Director文件夹
	if ok, _ := utils.PathExists(global.TB_CONFIG.Zap.Director); !ok {
		fmt.Printf("create #{global.TB_CONFIG.Zap.Director} directore\n")
		_ = os.Mkdir(global.TB_CONFIG.Zap.Director, os.ModePerm)
	}

	cores := internal.Zap.GetZapCores()
	logger = zap.New(zapcore.NewTee(cores...))

	if global.TB_CONFIG.Zap.ShowLine {
		logger = logger.WithOptions(zap.AddCaller())
	}

	return logger
}
