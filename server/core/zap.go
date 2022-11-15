package core

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
	internal2 "technical-blog-server/core/internal"
	"technical-blog-server/global"
	"technical-blog-server/utils"
)

func Zap() (logger *zap.Logger) {
	// TODO 判断是否有Director文件夹 没有的话则创建一个
	if ok, _ := utils.PathExists(global.TB_CONFIG.Zap.Director); !ok {
		fmt.Printf("create #{global.TB_CONFIG.Zap.Director} directore\n")
		_ = os.Mkdir(global.TB_CONFIG.Zap.Director, os.ModePerm)
	}

	cores := internal2.Zap.GetZapCores()
	logger = zap.New(zapcore.NewTee(cores...))

	if global.TB_CONFIG.Zap.ShowLine {
		logger = logger.WithOptions(zap.AddCaller())
	}

	return logger
}
