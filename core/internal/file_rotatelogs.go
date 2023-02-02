package internal

import (
	rotateLogs "github.com/lestrrat-go/file-rotatelogs"
	"go.uber.org/zap/zapcore"
	"os"
	"path"
	"technical-blog-server/global"
	"time"
)

type fileRotateLogs struct{}

var FileRotateLogs = new(fileRotateLogs)

// GetWriteSyncer
// @author: zhengji.su
// @description: 获取zapcore.WriteSyncer
// @param: level string
// @return: zapcore.WriteSyncer, error
func (r *fileRotateLogs) GetWriteSyncer(level string) (zapcore.WriteSyncer, error) {
	fileWriter, err := rotateLogs.New(
		path.Join(global.TB_CONFIG.Zap.Director, "%Y-%m-%d", level+"log"),
		rotateLogs.WithClock(rotateLogs.Local),
		rotateLogs.WithMaxAge(time.Duration(global.TB_CONFIG.Zap.MaxAge)*24*time.Hour), // 日志留存时间
		rotateLogs.WithRotationTime(time.Hour*24),
	)

	if global.TB_CONFIG.Zap.LogInConsole {
		return zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout), zapcore.AddSync(fileWriter)), err
	}

	return zapcore.AddSync(fileWriter), err
}
