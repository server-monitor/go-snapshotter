package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path"

	"github.com/server-monitor/snapshotter/models/snapshot"
	"github.com/server-monitor/snapshotter/util"
	"github.com/server-monitor/snapshotter/util/utildeploy"
)

type jType struct {
	Title    string `json:"title"`
	Category string `json:"category"`
	URL      string `json:"url"`
}

func LoadURLs() {
	urls := getURLs()

	for i := 0; i < 12; i++ {
		url := urls[i]
		snap, err := snapshot.New(url.URL, url.Title, &snapshot.SnapMeta{url.Category})

		if err != nil {
			log.Fatalf("snapshot.New(%#v, nil) failed, %#v", url, err)
		}

		// Doesn't work? Maybe, not going to spend more time on this.
		// Ideally, separate process => CDN, or just take snapshots even if the file exists.
		if _, err := os.Stat(snap.Picture.FilePath); !os.IsNotExist(err) {
			if _, err := snap.Save(); err != nil {
				log.Fatal(err)
			}
		} else {
			go func() {
				if _, err := snap.Save(); err != nil {
					log.Fatal(err)
				}
			}()
		}
	}
}

func getURLs() []jType {
	// Heroku hack
	depAppDir := ""
	if utildeploy.Heroku() {
		depAppDir = path.Join(utildeploy.AppDir(), util.AppName)
	} else {
		depAppDir = util.SourceDir()
	}

	jsonFileBName := "urls.json"
	jsonFilePath := path.Join(depAppDir, jsonFileBName)

	// // Heroku hack
	// isInsideHeroku := os.Getenv("DYNO")

	// if strings.TrimSpace(isInsideHeroku) != "" {
	// 	jsonFilePath = path.Join(
	// 		"src/github.com/server-monitor/snapshotter/snapshotter/", jsonFileBName,
	// 	)
	// } else {
	// 	jsonFilePath = path.Join(util.SourceDir(), jsonFileBName)
	// }
	// // END, Heroku hack

	file, e := ioutil.ReadFile(jsonFilePath)
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	var awful []jType
	json.Unmarshal(file, &awful)

	return awful
}
