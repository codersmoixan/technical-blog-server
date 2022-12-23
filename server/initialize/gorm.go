package initialize

import (
	"go.uber.org/zap"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
	"technical-blog-server/global"
	"technical-blog-server/initialize/internal"
	"technical-blog-server/model/system"
)

// Gorm 初始化数据库
func Gorm() *gorm.DB {
	return GormMysql()
}

// GormMysql 初始化Mysql数据库
func GormMysql() *gorm.DB {
	m := global.TB_CONFIG.MySql

	if m.Dbname == "" {
		return nil
	}

	mysqlConfig := mysql.Config{
		DSN:                       m.Dsn(),
		DefaultStringSize:         191,   // string 类型字段的默认长度
		SkipInitializeWithVersion: false, // 根据版本自动配置
	}

	if db, err := gorm.Open(mysql.New(mysqlConfig), internal.Gorm.Config()); err != nil {
		return nil
	} else {
		sqlDB, _ := db.DB()
		sqlDB.SetMaxIdleConns(m.MaxIdleConns)
		sqlDB.SetMaxOpenConns(m.MaxOpenConns)

		return db
	}
}

// RegisterTables 注册数据库表
func RegisterTables(db *gorm.DB) {
	err := db.AutoMigrate(
		system.SysApi{},
		system.SysUser{},
		system.SysBlog{},
		system.SysTag{},
	)

	if err != nil {
		global.TB_LOG.Error("register table failed", zap.Error(err))
		os.Exit(0)
	}

	global.TB_LOG.Info("register table success")
}
