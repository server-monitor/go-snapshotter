package utildeploy

import (
	"os"
	"path"
	"testing"

	"github.com/server-monitor/snapshotter/util/utiltest"
)

func TestHerokuFalse(t *testing.T) {
	title := "Heroku() = false"
	var expected interface{} = false
	var got interface{} = Heroku()

	utiltest.Test(t, title, expected, got)
}

func TestHerokuTrue(t *testing.T) {
	os.Setenv("DYNO", "run.1234")

	title := "Heroku() = true"
	var expected interface{} = true
	var got interface{} = Heroku()

	utiltest.Test(t, title, expected, got)
	os.Unsetenv("DYNO")
}

// func TestEigen(t *testing.T) {
// 	t.Logf("singleton %#v should be defined", Eigen)
// }

func TestAppDirHerokuFalse(t *testing.T) {
	title := "AppDir(), Heroku() = false"
	var expected interface{} = path.Join(
		"/var/www/go", utiltest.AppName, "src", utiltest.RepoBase,
	)

	var got interface{} = AppDir()

	utiltest.Test(t, title, expected, got)
}

// // Can't test this.
// // On local, app dir is /var/...
// // On Heroku, app dir is /tmp/...
// func TestAppDirHerokuTrueGogbDepMngrTrue(t *testing.T) {
// 	os.Setenv("DYNO", "run.1234")
// 	title := "AppDir, Heroku() = true, dep. mngr. = gb"
// 	var expected interface{} = path.Join("src", utiltest.RepoBase)
// 	var got interface{} = AppDir()

// 	utiltest.Test(t, title, expected, got)
// }
