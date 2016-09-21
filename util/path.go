package util

import (
	"log"
	"path"
	"runtime"
)

func SourceDir() string {
	var file string
	if _, f, _, ok := runtime.Caller(1); !ok {
		log.Fatalf("runtime.Caller(1) not ok")
	} else {
		file = f
	}

	return path.Dir(file)
}

func AppDir() string {
	return path.Join(SourceDir(), "..")
}
