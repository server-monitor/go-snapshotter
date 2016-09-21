package snapshot

import (
	"bytes"
	"errors"
	"io/ioutil"
	"log"
	"net/url"
	"os"
	"path"
	"strings"
	"testing"

	"github.com/server-monitor/snapshotter/models/picture"
	"github.com/server-monitor/snapshotter/util/utiltest"
)

func pretendUsePkg() {
	log.Printf(
		"%q",
		errors.New, utiltest.Properties, picture.New, os.Open, bytes.MinRead, ioutil.NopCloser,
	)
}

var testHost = "lol.nogenerics.org"

var testURL = &url.URL{
	Scheme:   "https",
	Host:     testHost,
	Path:     "/abcd/efgh",
	RawQuery: "size=large",
}

var testURLStr = testURL.String()
var testImgsRootPath = "/images"
var testDefaultImgExt = ".jpg"

// var testDefaultImgExt = ".png"
var testAppDir = "/tmp/snapshotter/snapshot_test"

func init() {
	uglyHackIsTesting = true
}

var testPath = strings.TrimRight(
	path.Join(testImgsRootPath, testURL.Host, testURL.Path),
	"/",
) + testDefaultImgExt

var expectedPic = &picture.Picture{
	0,
	testURL.String(),
	testPath,
	path.Join(testAppDir, testPath),
}

func newOrFatal(t *testing.T, args ...interface{}) *Snapshot {
	testURLStrCurrent := testURLStr
	if len(args) > 0 {
		testURLStrCurrent = args[0].(string)
	}

	testSnapShotTitle := ""
	if len(args) > 1 {
		tSSTitleArg := args[1].(string)
		if strings.TrimSpace(tSSTitleArg) != "" {
			testSnapShotTitle = tSSTitleArg
		}
	}

	testSnapMeta := (*SnapMeta)(nil)
	if len(args) > 2 {
		testSnapMeta = args[2].(*SnapMeta)
	}

	snap, err := New(testURLStrCurrent, testSnapShotTitle, testSnapMeta)
	if err != nil {
		t.Fatalf("new snapshot: %+v", err)
	}
	return snap
}

func buildTestCases(expected *Snapshot, got *Snapshot) []utiltest.TestCase {
	var expURL, expTitle, expMeta, expPicTitle, expPicPath, expPicFilePath interface{} = expected.URL,
		expected.Title, expected.Meta, expected.Picture.Title, expected.Picture.Path, expected.Picture.FilePath

	var gotURL, gotTitle, gotMeta, gotPicTitle, gotPicPath, gotPicFilePath interface{} = got.URL,
		got.Title, got.Meta, got.Picture.Title, got.Picture.Path, got.Picture.FilePath

	return []utiltest.TestCase{
		{"URL", expURL, gotURL},
		{"Title", expTitle, gotTitle},
		{"Meta", expMeta, gotMeta},
		{"Picture Title", expPicTitle, gotPicTitle},
		{"Picture Path", expPicPath, gotPicPath},
		{"Picture FilePath", expPicFilePath, gotPicFilePath},
	}
}

func TestNew(t *testing.T) {
	mockAppDir()
	snap := newOrFatal(t)

	utiltest.Count(t, 0, len(All()))

	expected := &Snapshot{0, testURLStr, testURLStr, nil, expectedPic}
	utiltest.Properties(t, buildTestCases(expected, snap))

	t.Run("ID should be zero", func(t *testing.T) {
		if snap.ID != 0 {
			t.Errorf("expected ID %d, got %d", 0, snap.ID)
		}
	})
}

func TestNewNoSchemeNoPath(t *testing.T) {
	snap := newOrFatal(t, testHost)

	utiltest.Count(t, 0, len(All()))

	picPath := strings.TrimRight(
		path.Join(testImgsRootPath, testHost), "/",
	) + testDefaultImgExt

	expectedPic, err := picture.New(
		testHost,
		picPath,
		path.Join(testAppDir, picPath),
	)

	if err != nil {
		t.Fatalf("expected err to be nil, %#v", err)
	}

	expected := &Snapshot{0, testHost, testHost, nil, expectedPic}
	utiltest.Properties(t, buildTestCases(expected, snap))
}

func TestNewEmptyURL(t *testing.T) {
	utiltest.ErrOnBlankArg(
		t, errors.New("empty URL"),
		func(arg string) (interface{}, error) { return New(arg) },
	)
}

// Persist...
func TestSaveSnapshotAndRetrieve(t *testing.T) {
	DeleteAll()

	mockTakeSnapshotCmd()

	snap := newOrFatal(t)
	snap.Save()

	all := All()

	utiltest.Count(t, 1, len(all))

	saved := all[0]
	utiltest.Properties(t, buildTestCases(snap, saved))
	utiltest.IDNotZero(t, saved.ID)
}

func TestSaveSnapshotAndMakeSurePictureFileIsSavedToDisk(t *testing.T) {
	DeleteAll()

	snap := newOrFatal(t)
	testPicSrcFile := mockTakeSnapshotCmd(snap)

	saved, _ := snap.Save()

	_, err := os.Open(saved.Picture.FilePath)

	t.Run("picture file should exist", func(t *testing.T) {
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("files should be the same", func(t *testing.T) {
		src, err1 := ioutil.ReadFile(testPicSrcFile)

		if err1 != nil {
			log.Fatal(err1)
		}

		dest, err2 := ioutil.ReadFile(saved.Picture.FilePath)

		if err2 != nil {
			log.Fatal(err2)
		}

		if !bytes.Equal(src, dest) {
			log.Fatalf(
				"files %q and %q not the same",
				testPicSrcFile, saved.Picture.FilePath,
			)
		}
	})
}

func TestSaveMakeSureOriginalSnapshotIsNotAltered(t *testing.T) {
	DeleteAll()
	mockTakeSnapshotCmd()
	testURLStr := "https://some.testURLStr.org"

	snap := newOrFatal(t, testURLStr)
	saved, err := snap.Save()

	utiltest.AssertNoErr(t, err)

	errMsg := "original object should not be altered"
	t.Run(errMsg, func(t *testing.T) {
		if snap.ID != 0 {
			t.Fatalf(errMsg)
		}
	})
	utiltest.Properties(t, buildTestCases(snap, saved))
	utiltest.IDNotZero(t, saved.ID)

	all := All()
	utiltest.Count(t, 1, len(all))

	saved = all[0]
	utiltest.Properties(t, buildTestCases(snap, saved))
	utiltest.IDNotZero(t, saved.ID)
}

func TestSaveAndRetrieveTwoSnapshots(t *testing.T) {
	DeleteAll()
	mockTakeSnapshotCmd()

	snap0 := newOrFatal(t, "https://some.testURLStr0.org")
	snap1 := newOrFatal(t, "https://some.testURLStr1.org")

	saved0, err0 := snap0.Save()
	saved1, err1 := snap1.Save()

	utiltest.AssertNoErr(t, err0)
	utiltest.AssertNoErr(t, err1)

	all := All()
	utiltest.Count(t, 2, len(all))

	utiltest.Properties(t, buildTestCases(snap0, saved0))
	utiltest.IDNotZero(t, saved0.ID)
	utiltest.Properties(t, buildTestCases(snap1, saved1))
	utiltest.IDNotZero(t, saved1.ID)
}

// // TODO, decide if we want uniqueness, implement test
// func TestSaveTwiceAndRetrieve(t *testing.T) {
// 	DeleteAll()

// 	snap := newOrFatal(t, "https://some.testURLStr.org")

// 	snap.Save()
// 	snap.Save()

// 	all := All()

// 	utiltest.Count(t, 1, len(all))
// 	saved := all[0]
// 	utiltest.Properties(t, buildTestCases(snap, saved), saved.ID)
// }

func TestSaveAndFind(t *testing.T) {
	mockTakeSnapshotCmd()

	snap := newOrFatal(t, "https://some.testURLStr.org")
	saved, err := snap.Save()

	utiltest.AssertNoErr(t, err)

	nt, ok := Find(saved.ID)
	t.Run("should find snapshot", func(t *testing.T) {
		if !ok {
			t.Errorf("didn't find snapshot")
		}
	})

	utiltest.Properties(t, buildTestCases(snap, nt))
	utiltest.IDNotZero(t, saved.ID)
}
