package log

import (
	"fmt"
	"strings"

	"github.com/KingDomPan/seabird/config"

	"github.com/cihub/seelog"
)

const Config = `
<seelog>
    <outputs formatid="common">
        <rollingfile type="date" filename="${file}.log" datepattern="2006-01-02" maxrolls="30" />
    </outputs>
    <formats>
        <format id="common" format="%Date %Time [%LEVEL] %Msg%n" />
    </formats>
</seelog>
`

func init() {
	LoadConfig("console", "")
}

func LoadConfig(name, path string) {
	var env = config.Get("env")

	if path == "" {
		if env == "prod" {
			path = "/home/kingdompan/logs/seabird"
		} else {
			path = "/tmp/logs/seabird"
		}
	}
	file := path + "/" + name
	config := strings.Replace(Config, "${file}", file, 1)
	logger, err := seelog.LoggerFromConfigAsString(config)
	if err != nil {
		fmt.Println("Can Not Parse Log Config")
		return
	}
	seelog.ReplaceLogger(logger)
}

func Trace(v ...interface{}) {
	seelog.Trace(v)
}

func Debug(v ...interface{}) {
	seelog.Debug(v)
}

func Info(v ...interface{}) {
	seelog.Info(v)
}

func Warn(v ...interface{}) {
	seelog.Warn(v)
}

func Error(v ...interface{}) {
	seelog.Error(v)
}

func Critical(v ...interface{}) {
	seelog.Critical(v)
}

func Flush() {
	seelog.Flush()
}
