package main

import (
	"fmt"
	"technical-blog-server/core"
	"technical-blog-server/global"
)

func main() {
	fmt.Printf("Hello Technical-blog")
	//global.TB_VP = core.Viper()
	global.TB_LOG = core.Zap()
}
