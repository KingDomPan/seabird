FROM golang:1.6
MAINTAINER kingdompan kingdom.pan@qq.com

Add . /go/src/github.com/KingDomPan/seabird/
WORKDIR /go/src/github.com/KingDomPan/seabird/
RUN go build seabird.go

EXPOSE 8080

CMD ["./seabird"]
