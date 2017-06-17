package config

import "testing"

func TestDefalutGet(t *testing.T) {
	value := Get("amqp_host")
	if value != "192.168.99.100" {
		t.Errorf("Get Default AmqpHost Value Is Error")
	}
}

func TestSetAndGet(t *testing.T) {
	Set("kingdompan", "kingdompan")
	value := Get("kingdompan")
	if value != "kingdompan" {
		t.Errorf("Set Key And Get The Value Is Error")
	}
}

func TestCustomSetAndGet(t *testing.T) {
	Parse("config.yaml")
	value := Get("amqp_host")
	if value != "127.0.0.1" {
		t.Errorf("Custom Set Key Is Error")
	}

	value = Get("new_key")
	if value != "new_value" {
		t.Errorf("Custom New Value Is Error")
	}
}
