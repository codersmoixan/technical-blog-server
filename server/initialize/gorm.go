package initialize

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/initialize/internal"
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
