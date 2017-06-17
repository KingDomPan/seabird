package config

import (
	"fmt"
	"io/ioutil"
	"sync"

	"gopkg.in/yaml.v2"
)

const (
	// Version is the version
	Version = "0.1.1"
)

var (
	mutex    = &sync.RWMutex{}
	c        = make(map[string]string)
	defaults = map[string]string{
		"env":  "dev",
		"host": "127.0.0.1",
		"port": "8080",

		"static_path": "frontend",
	}
)

// Get get the config
func Get(key string) string {
	mutex.RLock()
	defer mutex.RUnlock()
	return c[key]
}

// Set set the config
func Set(key, value string) {
	mutex.Lock()
	defer mutex.Unlock()
	c[key] = value
}

// Parse parse a file to config
func Parse(path string) {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Println("Can Not Open Config File", path, "Use The Default Config")
		setConfig()
		return
	}
	yaml.Unmarshal(data, &c)
	setConfig()
}

func setConfig() {
	mutex.Lock()
	defer mutex.Unlock()

	for key, value := range defaults {
		_, ok := c[key]
		if !ok {
			c[key] = value
		}
	}
}

func init() {
	setConfig()
}
