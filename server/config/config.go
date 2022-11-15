package config

type Server struct {
	JWT      JWT      `mapstructure:"jwt" json:"jwt" yaml:"jwt"`
	Zap      Zap      `mapstructure:"zap" json:"zap" yaml:"zap"`
	AutoCode AutoCode `mapstructure:"auto_code" json:"auto_code" yaml:"auto_code"`
	System   System   `mapstructure:"system" json:"system" yaml:"system"`
	MySql    Mysql    `mapstructure:"mysql" json:"mysql" yaml:"mysql"`
}
