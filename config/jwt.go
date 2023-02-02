package config

type JWT struct {
	SigningKey  string `mapstructure:"signing_key" json:"signing_key" yaml:"signing_key"`
	ExpiresTime int64  `mapstructure:"expires_time" json:"expires_time" yaml:"expires_time"`
	BufferTime  int64  `mapsturecture:"buffer_time" json:"buffer_time" yaml:"buffer_time"`
	Issuer      string `mapstructure:"issuer" json:"issuer" yaml:"issuer"`
}
