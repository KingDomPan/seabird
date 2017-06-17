package api

import (
	"fmt"
	"net/http"
	"github.com/KingDomPan/seabird/log"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

var (
	callbacks = make([]func(r martini.Router), 0)
)

func Serve(r martini.Router) {

	for _, callback := range callbacks {
		callback(r)
	}

}

func init() {
	callbacks = append(callbacks, func(r martini.Router) {
		r.Group("/containers", func(rr martini.Router) {
			rr.Get("/json", func(req *http.Request, res http.ResponseWriter, r render.Render) {
				all := req.URL.Query().Get("all")
				address := "/containers/json"
				address = address + "?all=" + all
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Get("/:id/json", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/containers/" + id + "/json"
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Get("/:id/top", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/containers/" + id + "/top"
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Post("/:id/start", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/containers/" + id + "/start"
				if result, err := RequestUnixSocket(address, "POST"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Post("/:id/stop", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/containers/" + id + "/stop"
				if result, err := RequestUnixSocket(address, "POST"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Delete("/:id", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/containers/" + id
				if result, err := RequestUnixSocket(address, "DELETE"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Get("/:id/stats", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/containers/" + id + "/stats"
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
		})
		r.Group("/images", func(rr martini.Router) {
			rr.Get("/json", func(req *http.Request, res http.ResponseWriter, r render.Render) {
				address := "/images/json"
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Get("/:id/json", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/images/" + id + "/json"
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Delete("/:id", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				id := params["id"]
				address := "/images/" + id
				if result, err := RequestUnixSocket(address, "DELETE"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Get("/:user/:repo/json", func(params martini.Params, res http.ResponseWriter, r render.Render) {
				address := fmt.Sprintf("/images/%s/%s/json", params["user"], params["repo"])
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
			rr.Get("/search", func(req *http.Request, res http.ResponseWriter, r render.Render) {
				term := req.URL.Query().Get("term")
				address := fmt.Sprintf("/images/search?term=%s", term)
				if result, err := RequestUnixSocket(address, "GET"); err != nil {
					log.Error(err.Error())
					NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
				} else {
					NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
				}
				return
			})
		})
		r.Get("/version", func(req *http.Request, res http.ResponseWriter, r render.Render) {
			address := "/version"
			if result, err := RequestUnixSocket(address, "GET"); err != nil {
				log.Error(err.Error())
				NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
			} else {
				NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
			}
			return
		})
		r.Get("/info", func(req *http.Request, res http.ResponseWriter, r render.Render) {
			address := "/info"
			if result, err := RequestUnixSocket(address, "GET"); err != nil {
				log.Error(err.Error())
				NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
			} else {
				NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
			}
			return
		})
		r.Get("/_ping", func(req *http.Request, res http.ResponseWriter, r render.Render) {
			address := "/_ping"
			if result, err := RequestUnixSocket(address, "GET"); err != nil {
				log.Error(err.Error())
				NewResponseResultHeader(http.StatusOK, fmt.Sprintf("请求错误: %s", err.Error()), false).RenderError(res, r)
			} else {
				NewResponseResult(http.StatusOK, "", true, result).Render(res, r)
			}
			return
		})
	})
}
