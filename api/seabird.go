package api

import (
	"net/http"

	"github.com/KingDomPan/seabird/config"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func init() {
	callbacks = append(callbacks, func(r martini.Router) {
		r.Get("/seabird", func(req *http.Request, res http.ResponseWriter, r render.Render) {
			r.JSON(http.StatusOK, map[string]interface{}{
				"version": config.Version,
				"author":  "kingdompan",
				"email":   "kingdom.pan@qq.com",
			})
		})
	})
}
