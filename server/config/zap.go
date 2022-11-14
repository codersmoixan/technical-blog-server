package config

import (
	"go.uber.org/zap/zapcore"
	"strings"
)

type Zap struct {
	Level         string `mapstructure:"level" json:"level" yaml:"level"`
	Prefix        string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`
	Format        string `mapstructure:"format" json:"format" yaml:"format"`
	Director      string `mapstructure:"director" json:"director" yaml:"director"`
	StacktraceKey string `mapstructure:"stacktrace_ey" json:"stacktrace_key" yaml:"stacktrace_key"`

	MaxAge       int  `mapstructure:"max_age" json:"max_age" yaml:"max_age"`                      // 日期的留存时间
	ShowLine     bool `mapstructure:"show_line" json:"show_line" yaml:"show_line"`                // 显示行
	LogInConsole bool `mapstructure:"log_in_console" json:"log_in_console" yaml:"log_in_console"` // 输出控制台
}

// TransportLevel 根据字符串转化为zapcore.Level
func (z *Zap) TransportLevel() zapcore.Level {
	z.Level = strings.ToLower(z.Level)

	switch z.Level {
	case "debug":
		return zapcore.DebugLevel
	case "info":
		return zapcore.InfoLevel
	case "warn":
		return zapcore.WarnLevel
	case "error":
		return zapcore.ErrorLevel
	case "dpanic":
		return zapcore.DPanicLevel
	case "fatal":
		return zapcore.FatalLevel
	default:
		return zapcore.DebugLevel
	}
}
