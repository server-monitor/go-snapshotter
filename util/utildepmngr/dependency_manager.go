package utildepmngr

import (
	"log"
	"regexp"
	"strings"

	"github.com/server-monitor/snapshotter/util"
)

type dependencyManager struct {
	Value   string
	RootDir string
	GB      bool
}

var Eigen *dependencyManager

func init() {
	if rootDir, ok := is_gb(); ok {
		Eigen = &dependencyManager{"gb", rootDir, true}
	} else {
		log.Fatalf("Dependency manager not supported")
	}
}

func is_gb() (string, bool) {
	sourceDir := util.SourceDir()

	components := strings.Repeat("/[^/]+", 5)

	re := regexp.MustCompile("/src" + components)

	rootDir := ""

	if re.MatchString(sourceDir) {
		rootDir = re.ReplaceAllString(sourceDir, "")
	} else {
		return "", false
	}

	// I don't know if we should check this. What if we don't have
	//   any dependencies?
	// directories := []string{"vendor", path.Join("vendor", "")}

	return rootDir, true
}

func (d *dependencyManager) String() string {
	return d.Value
}
