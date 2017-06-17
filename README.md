##### 一个方便的DockerWebUI管理界面, 直接部署到宿主机和Docker中
##### 一个简单方便的Angular标准学习项目

##### 运行方式
- `git clone git@github.com:KingDomPan/seabird.git $GOPATH/src/github.com/KingDomPan/seabird`
- 执行`make buildfront`构建前端代码

##### 本地运行-使用go-bindata打包成一个二进制文件操作
```bash
# 下载依赖
go get -u github.com/jteeuwen/go-bindata/...
# 生成静态资源打包文件
make ui
# 生成二进制分发包
go build seabird.go
```

##### Docker运行
```bash
go get -u github.com/jteeuwen/go-bindata/...
make ui
docker build -t me.com/dockerwebui .
docker run -d -p 127.0.0.1:8080:8080 -v /var/run/docker.sock:/var/run/docker.sock me.com/dockerwebui
```