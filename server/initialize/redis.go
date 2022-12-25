package initialize

import (
	"context"
	"github.com/go-redis/redis/v8"
	"go.uber.org/zap"
	"technical-blog-server/global"
)

// Redis
// @author: zhengji.su
// @description: 初始化Redis
func Redis() {
	redisConfig := global.TB_CONFIG.Redis

	client := redis.NewClient(&redis.Options{
		Addr:     redisConfig.Addr,
		Password: redisConfig.Password,
		DB:       redisConfig.DB,
	})

	ping, err := client.Ping(context.Background()).Result()
	if err != nil {
		global.TB_LOG.Error("redis connect ping failed, err:", zap.Error(err))
	} else {
		global.TB_LOG.Info("redis connect ping response:", zap.String("ping", ping))
		global.TB_REDIS = client
	}
}
