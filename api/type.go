package api

import (
	"net/http"

	"github.com/martini-contrib/render"
)

type RenderErrorer interface {
	RenderError(res http.ResponseWriter, r render.Render)
	Render(res http.ResponseWriter, r render.Render)
}

type ResponseResultHeader struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Success bool   `json:"success"`
}

type ResponseResult struct {
	*ResponseResultHeader
	Result interface{} `json:"result"`
}

func (rrh *ResponseResultHeader) RenderError(res http.ResponseWriter, r render.Render) {
	rrh.Success = false
	r.JSON(rrh.Code, rrh)
}

func (rr *ResponseResult) Render(res http.ResponseWriter, r render.Render) {
	rr.Success = true
	r.JSON(rr.Code, rr)
}

func NewResponseResultHeader(Code int, Message string, Success bool) *ResponseResultHeader {
	return &ResponseResultHeader{Code: Code, Message: Message, Success: Success}
}

func NewResponseResult(Code int, Message string, Success bool, Result interface{}) *ResponseResult {
	rrh := NewResponseResultHeader(Code, Message, Success)
	return &ResponseResult{rrh, Result}
}

var (
	RequestBodyJsonParseError = &ResponseResultHeader{Code: http.StatusOK, Message: "无法解析请求体数据, 可能存在类型转换异常或者字段映射错误", Success: false}
	IdentityValidateError     = &ResponseResultHeader{Code: http.StatusOK, Message: "对象参数不一致, 无法更新", Success: false}
)
