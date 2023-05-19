FROM golang:1.19 as builder

WORKDIR /go/src/tb_server
COPY . .

RUN GIN_MODE=release

RUN go env -w GO111MODULE=on \
    && go env -w GOPROXY=https://goproxy.cn,direct \
    && go env -w CGO_ENABLED=0 \
#    && go env -w GOOS=linux \
#    && go env -w GOARCH=amd64 \
    && go env \
    && go mod tidy \
    && go build -o server .

FROM alpine:latest

LABEL MAINTAINER="367265893@qq.com"

WORKDIR /go/src/tb_server

COPY --from=0 /go/src/tb_server ./
#COPY --from=0 /go/src/tb_server/resource ./resource/
COPY --from=0 /go/src/tb_server/config.release.yaml ./

EXPOSE 8888
ENTRYPOINT ./server -c config.release.yaml
