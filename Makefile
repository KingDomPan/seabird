#! /bin/bash

BASEDIR=`pwd`
FRONTEND="frontend"

npm-rely-on:
	cd ${BASEDIR}/${FRONTEND} && `which npm` install --registry=https://registry.npm.taobao.org
.PHONY: front-rely-on

bower-rely-on: npm-rely-on
	cd ${BASEDIR}/${FRONTEND} && ./node_modules/bower/bin/bower install
.PHONY: bower-rely-on

buildfront: bower-rely-on
	cd ${BASEDIR}/${FRONTEND} && ./node_modules/gulp/bin/gulp.js build
.PHONY: buildfront

ui: buildfront
	cd ${BASEDIR}/${FRONTEND} && go-bindata -o ../server/bindata.go -pkg server dist/...
.PHONY: ui

run: ui
	go run seabird.go 