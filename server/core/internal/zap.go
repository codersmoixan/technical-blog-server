package internal

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"technical-blog-server/global"
	"time"
)

type _zap struct{}

var Zap = new(_zap)

// GetZapCores
// @author: zhengji.su
// @description: 根据配置文件的 Leve 获取 []zapCore.Core
// @return: []zapcore.Core
func (z *_zap) GetZapCores() []zapcore.Core {
	cores := make([]zapcore.Core, 0, 7)

	for level := global.TB_CONFIG.Zap.TransportLevel(); level <= zapcore.FatalLevel; level++ {
		cores = append(cores, z.GetEncodeCore(level, z.GetLevelPriority(level)))
	}

	return cores
}

// GetEncoder
// @author: zhengji.su
// @description: 获取 zapcore.Encoder
// @return: zapcore.Encoder
func (z *_zap) GetEncoder() zapcore.Encoder {
	if global.TB_CONFIG.Zap.Format == "json" {
		return zapcore.NewJSONEncoder(z.GetEncoderConfig())
	}

	return zapcore.NewConsoleEncoder(z.GetEncoderConfig())
}

// GetEncoderConfig
// @author: zhengji.su
// @description: 获取zapcore.EncoderConfig
// @return: zapcore.EncoderConfig
func (z *_zap) GetEncoderConfig() zapcore.EncoderConfig {
	return zapcore.EncoderConfig{
		MessageKey:     "message",
		LevelKey:       "level",
		TimeKey:        "time",
		NameKey:        "logger",
		CallerKey:      "caller",
		SkipLineEnding: false,
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeLevel:    nil,
		EncodeTime:     z.CustomTimeEncoder,
		EncodeDuration: zapcore.SecondsDurationEncoder,
		EncodeCaller:   zapcore.FullCallerEncoder,
	}
}

// CustomTimeEncoder
// @author: zhengji.su
// @description: 自定义日志输出时间格式
// @param: t time.Time, encoder zapcore.PrimitiveArrayEncoder
func (z *_zap) CustomTimeEncoder(t time.Time, encoder zapcore.PrimitiveArrayEncoder) {
	encoder.AppendString(global.TB_CONFIG.Zap.Prefix + t.Format("2006/01/02 - 15:04:05.000"))
}

// GetEncodeCore
// @author: zhengji.su
// @description: 获取Encoder的zapcore.Core
// @param: l zapcore.Level, level zap.LevelEnablerFunc
// @return: zapcore.Core
func (z *_zap) GetEncodeCore(l zapcore.Level, level zap.LevelEnablerFunc) zapcore.Core {
	writer, err := FileRotateLogs.GetWriteSyncer(l.String()) // 使用file-rotatelogs 进行日志分割

	if err != nil {
		fmt.Printf("Get Write Syncer Failed err: %v", err.Error())
	}

	return zapcore.NewCore(z.GetEncoder(), writer, level)
}

// GetLevelPriority
// @author: zhengji.su
// @description: 根据 zapcore.Level 获取zap.LevelEncoderFunc
// @param: level zapcore.Level
// @return: zap.LevelEnablerFunc
func (z *_zap) GetLevelPriority(level zapcore.Level) zap.LevelEnablerFunc {
	switch level {
	case zapcore.DebugLevel:
		return func(level zapcore.Level) bool { // 调试
			return level == zap.DebugLevel
		}
	case zapcore.InfoLevel:
		return func(level zapcore.Level) bool { // 日志
			return level == zap.InfoLevel
		}
	case zapcore.WarnLevel:
		return func(level zapcore.Level) bool { // 警告
			return level == zap.WarnLevel
		}
	case zapcore.ErrorLevel:
		return func(level zapcore.Level) bool { // 错误
			return level == zap.ErrorLevel
		}
	case zapcore.DPanicLevel:
		return func(level zapcore.Level) bool { // Dpanic
			return level == zap.DPanicLevel
		}
	case zapcore.PanicLevel:
		return func(level zapcore.Level) bool { // Panic
			return level == zap.PanicLevel
		}
	case zapcore.FatalLevel:
		return func(level zapcore.Level) bool { // 终止
			return level == zap.FatalLevel
		}

	default:
		return func(level zapcore.Level) bool { // 调试
			return level == zap.DebugLevel
		}
	}
}
