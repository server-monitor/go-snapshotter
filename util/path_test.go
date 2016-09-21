package util

import (
	"testing"

	"github.com/server-monitor/snapshotter/util/utiltest"
)

func TestAppDir(t *testing.T) {
	title := "AppDir()"
	var expected interface{} = "/var/www/go/snapshotter/src/github.com/server-monitor/snapshotter"
	var got interface{} = AppDir()

	utiltest.Test(t, title, expected, got)
}
