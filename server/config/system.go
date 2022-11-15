package config

type System struct {
	Env      string `mapstructure:"env" json:"env" yaml:"env"`
	Addr     string `mapstructure:"addr" json:"addr" yaml:"addr"`
	DbType   string `mapstructure:"db_type" json:"db_type" yaml:"db_type"`
	OssType  string `mapstructure:"oss_type" json:"oss_type" yaml:"oss_type"`
	UseRedis bool   `mapstructure:"use_redis" json:"use_redis" yaml:"use_redis"`
}
