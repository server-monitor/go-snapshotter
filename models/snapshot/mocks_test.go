package snapshot

import (
	// "fmt"
	"io"
	"log"
	"os"
	"path"

	"github.com/server-monitor/snapshotter/util/utiltest"
)

// func mockPretendUsePkg() {
// 	fmt.Printf("%q", fmt.Printf)
// }

var originalAppDir = getAppDir

func mockAppDir() {
	getAppDir = func() (dir string) {
		return testAppDir
	}
}

var originalRunCmd = runCmd

func lolCopy(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()
	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()
	_, err = io.Copy(out, in)
	cerr := out.Close()
	if err != nil {
		return err
	}
	return cerr
}

func mockTakeSnapshotCmd(args ...*Snapshot) string {
	// testPicSrcFile := path.Join(utiltest.ThisDir(), "snapshot_test", "elixir.jpg")
	testPicSrcFile := path.Join(utiltest.ThisDir(), "snapshot_test", "elixir.png")
	snap := (*Snapshot)(nil)

	if len(args) > 0 {
		snap = args[0]
	}

	runCmd = func(ex string, args []string) (string, error) {
		if snap == nil {
			return "", nil
		}

		dirN := path.Dir(snap.Picture.FilePath)

		os.MkdirAll(dirN, os.ModePerm)

		err := lolCopy(testPicSrcFile, snap.Picture.FilePath)

		if err != nil {
			log.Fatalf("failed to copy, %#v\n", err.Error())
		}

		return "", nil
	}

	return testPicSrcFile
}
