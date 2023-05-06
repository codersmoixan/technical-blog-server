package config

type System struct {
	Env      string `mapstructure:"env" json:"env" yaml:"env"`
	Addr     int    `mapstructure:"addr" json:"addr" yaml:"addr"`
	DbType   string `mapstructure:"db_type" json:"db_type" yaml:"db_type"`
	OssType  string `mapstructure:"oss_type" json:"oss_type" yaml:"oss_type"`
	UseRedis bool   `mapstructure:"use_redis" json:"use_redis" yaml:"use_redis"`
	UseMultipoint bool   `mapstructure:"use-multipoint" json:"use-multipoint" yaml:"use-multipoint"` // 多点登录拦截
}
