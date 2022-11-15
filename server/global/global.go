package global

import (
	"github.com/songzhibin97/gkit/cache/local_cache"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"technical-blog-server/config"
)

var (
	TB_DB     *gorm.DB
	TB_VP     *viper.Viper
	TB_LOG    *zap.Logger
	TB_CONFIG config.Server

	BlackCache local_cache.Cache
)
