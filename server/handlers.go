package server

import (
	"encoding/json"
	// "fmt"
	"net/http"

	"github.com/server-monitor/snapshotter/models/snapshot"
)

func SnapshotIndex(w http.ResponseWriter, req *http.Request) {
	if err := json.NewEncoder(w).Encode(snapshot.All()); err != nil {
		panic(err)
	}
}
