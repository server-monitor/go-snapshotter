package server

import (
	// "fmt"
	"net/http"
	"path"

	"github.com/gorilla/mux"

	"github.com/server-monitor/snapshotter/util"
	"github.com/server-monitor/snapshotter/util/utildeploy"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{"SnapshotIndex", "GET", "/snapshots", SnapshotIndex},
}

func SetupRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}

	setupStatic(router)

	return router
}

func setupStatic(router *mux.Router) {
	// Heroku hack
	baseDir := ""
	if utildeploy.Heroku() {
		baseDir = utildeploy.AppDir()
	} else {
		baseDir = util.AppDir()
	}
	// End, Heroku hack

	images := http.StripPrefix("/images/", http.FileServer(
		http.Dir(path.Join(baseDir, "images")),
	))

	router.PathPrefix("/images/").Handler(images)

	router.PathPrefix("/").Handler(
		http.FileServer(http.Dir(path.Join(baseDir, "frontend", "www"))),
	)
}
