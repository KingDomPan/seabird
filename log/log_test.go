package log

import (
	"path/filepath"
	"strings"
	"testing"
)

const configResult = `
<seelog>
    <outputs formatid="common">
        <rollingfile type="date" filename="/home/kingdompan/logs/seabird/console.log" datepattern="2006-01-02" maxrolls="30" />
    </outputs>
    <formats>
        <format id="common" format="%Date %Time [%LEVEL] %Msg%n" />
    </formats>
</seelog>
`

func TestLoadConfigWithDefault(t *testing.T) {
	const name = "console"
	file := filepath.Join("/home/kingdompan/logs/seabird", name)
	var config = strings.Replace(Config, "${file}", file, 1)
	if config != configResult {
		t.Errorf("Cannot Get Defalut Config")
	}
}
