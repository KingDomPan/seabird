package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/KingDomPan/seabird/config"
	"github.com/KingDomPan/seabird/server"
)

func main() {

	v := flag.Bool("v", false, "Show Version")
	c := flag.String("c", "config/seabird.yaml", "Specify Config Path")

	flag.Parse()

	if *v {
		fmt.Println(config.Version)
		os.Exit(0)
	}

	config.Parse(*c)

	go server.Serve()

	select {}

}
