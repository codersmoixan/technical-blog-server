package core

import (
	"flag"
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/gin-gonic/gin"
	"github.com/songzhibin97/gkit/cache/local_cache"
	"github.com/spf13/viper"
	"os"
	"path/filepath"
	"technical-blog-server/core/internal"
	"technical-blog-server/global"
	"time"
)

// Viper
// @author: zhengji.su
// @description: 初始化Viper
// @param: path ...string
// @return: *viper.Viper
func Viper(path ...string) *viper.Viper {
	var config string

	if len(path) == 0 {
		flag.StringVar(&config, "c", "", "choose config file.")
		flag.Parse()

		if config == "" { // 判断命令行参数是否为空
			if configEnv := os.Getenv(internal.ConfigEnv); configEnv == "" { // 判断 internal.ConfigEnv 常量存储的环境变量是否为空
				switch gin.Mode() {
				case gin.DebugMode:
					config = internal.ConfigDefaultFile
					fmt.Printf("正在使用gin模式的%s环境,config的路径为%s\n", gin.DebugMode, internal.ConfigDebugFile)
				case gin.TestMode:
					config = internal.ConfigTestFile
					fmt.Printf("正在使用gin模式的%s环境,config的路径为%s\n", gin.TestMode, internal.ConfigTestFile)
				case gin.ReleaseMode:
					config = internal.ConfigReleaseFile
					fmt.Printf("正在使用gin模式的%s环境,config的路径为%s\n", gin.ReleaseMode, internal.ConfigReleaseFile)
				}
			} else { // internal.ConfigEnv 常量存储的环境变量不为空 将值赋于config
				config = configEnv
				fmt.Printf("正在使用%s环境变量,config的路径为%s\n", internal.ConfigEnv, config)
			}
		} else { // 命令行参数不为空 将值赋于config
			fmt.Printf("正在使用命令行的-c参数传递的值,config的路径为%s\n", config)
		}
	} else { // 函数传递的可变参数的第一个值赋于config
		config = path[0]
		fmt.Printf("正在使用func Viper()传递的值,config的路径为%s\n", config)
	}

	v := viper.New()
	v.SetConfigFile(config)
	v.SetConfigType("yaml")

	err := v.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: #{err} \n"))
	}

	v.WatchConfig()

	v.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("config file changed: ", e.Name)

		if err = v.Unmarshal(&global.TB_CONFIG); err != nil {
			fmt.Println(err)
		}
	})

	if err = v.Unmarshal(&global.TB_CONFIG); err != nil {
		fmt.Println(err)
	}

	// root 适配性 根据root位置去找到对应迁移位置,保证root路径有效
	global.TB_CONFIG.AutoCode.Root, _ = filepath.Abs("..")
	global.BlackCache = local_cache.NewCache(
		local_cache.SetDefaultExpire(time.Second * time.Duration(global.TB_CONFIG.JWT.ExpiresTime)),
	)

	return v
}