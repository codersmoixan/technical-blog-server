package config

type Server struct {
	Zap Zap `mapstructure:"zap" json:"zap" yaml:"zap"`
}
