FROM golang:1.19-alpine

ENV GO115MODULE=on\
    CGO_ENABLED=0\
    GOOS=linux\
    GOARCH=amd64\
    GOPROXY="https://goproxy.cn,direct"

WORKDIR /server_app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o docker_go main.go
EXPOSE 5173
CMD["./docker_go"]
