package picture

import (
	"errors"
	"fmt"
	"path"
	"strings"
	"testing"

	"github.com/server-monitor/snapshotter/util/utiltest"
)

var testAppDir = "/tmp/snapshotter/picture_test"
var expectedTitle = "lol.nogenerics.org"
var expectedPath = fmt.Sprintf("/images/%s/some/path.png", expectedTitle)

type expectedType struct {
	title    string
	path     string
	filePath string
}

var expected = &expectedType{
	expectedTitle,
	expectedPath,
	path.Join(testAppDir, expectedPath),
}

func newOrFatal(t *testing.T, args ...string) *Picture {
	title := "lol.nogenerics.org"
	if len(args) > 0 {
		tArg := args[0]
		if strings.TrimSpace(tArg) != "" {
			title = tArg
		}
	}

	testPath := fmt.Sprintf("/images/%s/some/path.png", title)
	if len(args) > 1 {
		tPathArg := args[1]
		if strings.TrimSpace(tPathArg) != "" {
			testPath = tPathArg
		}
	}

	filePath := path.Join(testAppDir, testPath)
	if len(args) > 2 {
		fPArg := args[2]
		if strings.TrimSpace(fPArg) != "" {
			filePath = fPArg
		}
	}

	pic, err := New(title, testPath, filePath)
	if err != nil {
		t.Fatalf("new picture: %+v", err)
	}
	return pic
}

func TestNew(t *testing.T) {
	pic := newOrFatal(t)

	t.Run("Title", func(t *testing.T) {
		if pic.Title != expected.title {
			t.Errorf("expected title %q, got %q", expected.title, pic.Title)
		}
	})

	t.Run("Path", func(t *testing.T) {
		if pic.Path != expected.path {
			t.Errorf("expected path %q, got %q", expected.path, pic.Path)
		}
	})

	t.Run("FilePath", func(t *testing.T) {
		if pic.Path != expected.path {
			t.Errorf("expected path %q, got %q", expected.filePath, pic.FilePath)
		}
	})

	t.Run("ID", func(t *testing.T) {
		if pic.ID != 0 {
			t.Errorf("expected ID %d, got %d", 0, pic.ID)
		}
	})
}

func TestNewEmptyTitle(t *testing.T) {
	utiltest.ErrOnBlankArg(
		t,
		errors.New("empty title"),
		func(arg string) (interface{}, error) {
			return New(arg, "/some/url/path.png", "/some/file/for/some/url/path.png")
		},
	)
}

func TestNewEmptyPath(t *testing.T) {
	utiltest.ErrOnBlankArg(
		t,
		errors.New("empty path"),
		func(arg string) (interface{}, error) {
			return New("some title", arg, "/some/file/path.png")
		},
	)
}

func buildTestCases(exp *expectedType, saved *Picture) []utiltest.TestCase {
	return []utiltest.TestCase{
		{"Title", exp.title, saved.Title},
		{"Path", exp.path, saved.Path},
		{"FilePath", exp.filePath, saved.FilePath},
	}
}

func TestSavePictureAndRetrieve(t *testing.T) {
	DeleteAll()

	pic := newOrFatal(t)
	pic.Save()

	all := All()

	utiltest.Count(t, 1, len(all))

	saved := all[0]
	utiltest.Properties(t, buildTestCases(expected, saved))
	utiltest.IDNotZero(t, saved.ID)
}

func TestSaveMakeSureOriginalPictureIsNotAltered(t *testing.T) {
	DeleteAll()

	pic := newOrFatal(t)

	saved, err := pic.Save()

	utiltest.AssertNoErr(t, err)

	errMsg := "original object should not be altered"
	t.Run(errMsg, func(t *testing.T) {
		if pic.ID != 0 {
			t.Fatalf(errMsg)
		}
	})
	utiltest.Properties(t, buildTestCases(expected, saved))
	utiltest.IDNotZero(t, saved.ID)

	all := All()
	utiltest.Count(t, 1, len(all))

	saved = all[0]
	utiltest.Properties(t, buildTestCases(expected, saved))
	utiltest.IDNotZero(t, saved.ID)
}

func TestSaveAndRetrieveTwoPictures(t *testing.T) {
	DeleteAll()

	picture0 := newOrFatal(t, "picture0", "/path/0.png", "/file/path/for/path/0.png")
	picture1 := newOrFatal(t, "picture1", "/path/1.png", "/file/path/for/path/1.png")

	saved0, err0 := picture0.Save()
	saved1, err1 := picture1.Save()

	utiltest.AssertNoErr(t, err0)
	utiltest.AssertNoErr(t, err1)

	all := All()
	utiltest.Count(t, 2, len(all))

	testCases0 := buildTestCases(
		&expectedType{"picture0", "/path/0.png", "/file/path/for/path/0.png"},
		saved0,
	)

	testCases1 := buildTestCases(
		&expectedType{"picture1", "/path/1.png", "/file/path/for/path/1.png"},
		saved1,
	)

	utiltest.Properties(t, testCases0)
	utiltest.IDNotZero(t, saved0.ID)
	utiltest.Properties(t, testCases1)
	utiltest.IDNotZero(t, saved1.ID)
}

// // TODO, decide if we want uniqueness, implement test
// func TestSaveTwiceAndRetrieve(t *testing.T) {
// 	DeleteAll()

// 	pic := newOrFatal(t, "picture", pngImagesPath("picture"))
// 	pic.Save()
// 	pic.Save()

// 	all := All()

// 	utiltest.Count(t, 1, len(all))
// 	saved := all[0]
// 	utiltest.Properties(t, buildTestCases(pic, saved))
//  utiltest.IDNotZero(t, saved.ID)
// }

func TestSaveAndFind(t *testing.T) {
	pic := newOrFatal(
		t,

		"findthis.org",
		"/images/findthis.org.png",
		"/var/www/alter/this.org.png",
	)

	saved, err := pic.Save()

	utiltest.AssertNoErr(t, err)

	nt, ok := Find(saved.ID)
	t.Run("should find pic", func(t *testing.T) {
		if !ok {
			t.Errorf("didn't find picture")
		}
	})

	testCases := buildTestCases(
		&expectedType{
			"findthis.org",
			"/images/findthis.org.png",
			"/var/www/alter/this.org.png",
		},

		nt,
	)

	utiltest.Properties(t, testCases)
	utiltest.IDNotZero(t, nt.ID)
}
