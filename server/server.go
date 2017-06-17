package server

import (
	"net/http"
	"strings"
	"github.com/KingDomPan/seabird/api"
	"github.com/KingDomPan/seabird/config"

	"log"
	"time"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/staticbin"
)

var (
	App *Martini
)

type Martini struct {
	*martini.Martini
	martini.Router
}

func Serve() {

	port := config.Get("port")
	r := martini.NewRouter()
	m := martini.New()

	m.Use(func(req *http.Request, res http.ResponseWriter, c martini.Context, log *log.Logger) {
		start := time.Now()
		c.Next()
		log.Printf("Completed %s %s in %v\n", req.Method, req.URL.Path, time.Since(start))
	})

	m.Use(martini.Recovery())
	m.MapTo(r, (*martini.Router)(nil))
	m.Action(r.Handle)

	App = &Martini{m, r}

	// 渲染静态资源文件, 同时映射/到index.html
	App.Use(staticbin.Static("dist", Asset))

	App.Use(render.Renderer()) // 注入Render使用JSON方法, 不使用HTML方式, 因为静态文件已经全部打包成二进制

	App.Get("/", func(req *http.Request, res http.ResponseWriter) {
		data, _ := Asset("dist/index.html")
		res.Write(data)
		return
	})

	App.Get("/pub_check", func(req *http.Request, res http.ResponseWriter) {
		res.WriteHeader(http.StatusOK)
		res.Write([]byte("OK"))
	})

	App.Get("/status.ok", func(req *http.Request, res http.ResponseWriter) {
		res.WriteHeader(http.StatusOK)
		res.Write([]byte("OK"))
	})

	App.Group("/api", func(r martini.Router) {
		api.Serve(r)
	})

	App.NotFound(func(req *http.Request, res http.ResponseWriter, r render.Render) {
		if strings.HasPrefix(req.RequestURI, "/api") {
			r.JSON(http.StatusNotFound, map[string]interface{}{
				"success": false,
			})
		} else {
			data, _ := Asset("dist/index.html")
			res.Write(data)
		}
		return
	})

	App.RunOnAddr(":" + port)
}
