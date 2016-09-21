package utildeploy

import (
	"os"
	"path"
	"regexp"
	"strings"

	"github.com/server-monitor/snapshotter/util"
	"github.com/server-monitor/snapshotter/util/utildepmngr"
)

type deploy struct {
	// AppDir string
}

var Eigen *deploy

func Heroku() bool {
	isInsideHeroku := os.Getenv("DYNO")

	if strings.TrimSpace(isInsideHeroku) != "" {
		return true
	}

	return false
}

func AppDir() string {
	appDir := util.AppDir()

	if Heroku() && utildepmngr.Eigen.GB {
		re := regexp.MustCompile(
			"\\A.+?" + "tmp.+?" + path.Join("src", ""),
		)

		return re.ReplaceAllString(appDir, "src")
	} else {
		return appDir
	}
}
