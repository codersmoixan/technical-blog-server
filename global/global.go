package global

import (
	"github.com/go-redis/redis/v8"
	"github.com/songzhibin97/gkit/cache/local_cache"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"golang.org/x/sync/singleflight"
	"gorm.io/gorm"
	"technical-blog-server/config"
)

var (
	TB_DB     *gorm.DB
	TB_VP     *viper.Viper
	TB_LOG    *zap.Logger
	TB_CONFIG config.Server
	TB_REDIS  *redis.Client

	BlackCache local_cache.Cache
	TB_Concurrency_Control             = &singleflight.Group{}
)
