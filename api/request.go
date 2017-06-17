package api

import (
	"encoding/json"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
	"github.com/KingDomPan/seabird/log"
)

const DOCKER_UNIX_SOCKET = "unix:///var/run/docker.sock"

func RequestUnixSocket(address, method string) (body interface{}, err error) {
	unix_socket_url := DOCKER_UNIX_SOCKET + ":" + address

	u, err := url.Parse(unix_socket_url)
	if err != nil || u.Scheme != "unix" {
		log.Error("Error To Parse Unix Socket Url " + unix_socket_url)
		return "", err
	}

	hostPath := strings.Split(u.Path, ":")
	u.Host = hostPath[0]
	u.Path = hostPath[1]

	conn, err := net.Dial("unix", u.Host)
	if err != nil {
		log.Error("Error To Connect To", u.Host, err)
		return "", err
	}

	reader := strings.NewReader("")
	query := ""
	if len(u.RawQuery) > 0 {
		query = "?" + u.RawQuery
	}

	request, err := http.NewRequest(method, u.Path+query, reader)
	if err != nil {
		log.Error("Error To Create Http Request", err)
		return "", err
	}

	client := httputil.NewClientConn(conn, nil)
	response, err := client.Do(request)
	if err != nil {
		log.Error("Error To Achieve Http Request Over Unix Socket", err)
		return "", err
	}

	data, err2 := ioutil.ReadAll(response.Body)
	if err2 != nil {
		log.Error("Error, Get Invalid Body In Answer")
		return "", err2
	}

	defer response.Body.Close()

	if data == nil || len(data) == 0 {
		return nil, nil
	}

	var result interface{}

	if err := json.Unmarshal(data, &result); err != nil {
		log.Error("Error, Unmarshal Return Data")
		return nil, err
	}

	return result, nil
}
