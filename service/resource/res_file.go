package resource

import (
	"mime/multipart"
	"strings"
	"technical-blog-server/global"
	"technical-blog-server/model/resource"
	"technical-blog-server/utils/upload"
)

type FileService struct {}

func (f *FileService) Upload(file resource.ResFile) error {
	return global.TB_DB.Create(&file).Error
}

func (f *FileService) UploadFile(header *multipart.FileHeader, noSave string) (file resource.ResFile, err error) {
	oss := upload.NewOss()
	filePath, key, uploadErr := oss.UploadFile(header)
	if uploadErr != nil {
		panic(err.(any))
	}
	if noSave == "0" {
		s := strings.Split(header.Filename, ".")
		file = resource.ResFile{
			Url:  filePath,
			Name: header.Filename,
			Tag:  s[len(s)-1],
			Key:  key,
		}
		return file, f.Upload(file)
	}
	return
}
