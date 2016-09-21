package utiltest

import (
	"fmt"
	"path"
	"reflect"
	"runtime"
	"testing"
)

var SpaceArgs = []string{"", "  "}
var AppName = "snapshotter"
var RepoBase = path.Join("github.com/server-monitor", AppName)

type errOnBlankFn func(string) (interface{}, error)

func ErrOnBlankArg(t *testing.T, expectedErr error, f errOnBlankFn) {
	for _, blankArg := range SpaceArgs {
		_, err := f(blankArg)
		if !reflect.DeepEqual(err, expectedErr) {
			t.Errorf("expected %#v error, got %#v", expectedErr, err)
		}
	}
}

func Count(t *testing.T, expectedCount int, got int) {
	t.Run("count", func(t *testing.T) {
		if expectedCount != got {
			t.Errorf("expected count %v records, got %v", expectedCount, got)
		}
	})
}

type TestCase struct {
	Name     string
	Expected interface{}
	Got      interface{}
}

func Properties(t *testing.T, testCases []TestCase) {
	for _, test := range testCases {
		t.Run(test.Name, func(t *testing.T) {
			if !reflect.DeepEqual(test.Expected, test.Got) {
				t.Errorf("expected %q, got %q", test.Expected, test.Got)
			}
		})
	}
}

func Test(t *testing.T, title string, expected interface{}, got interface{}) {
	t.Run(title, func(t *testing.T) {
		if !reflect.DeepEqual(expected, got) {
			t.Errorf("expected %q, got %q", expected, got)
		}
	})
}

func IDNotZero(t *testing.T, ID uint32) {
	t.Run("saved ID should not be zero", func(t *testing.T) {
		if ID == 0 {
			t.Errorf("expected ID to != 0")
		}
	})
}

func AssertNoErr(t *testing.T, err error) {
	t.Run("assert no error", func(t *testing.T) {
		if err != nil {
			t.Fatalf("expected no error, %#v", err)
		}
	})
}

func ThisDir() string {
	var file string
	if _, f, _, ok := runtime.Caller(1); !ok {
		fmt.Errorf("runtime.Caller(1) not ok")
	} else {
		file = f
	}

	return path.Dir(file)
}

func AppDir() string {
	return path.Join(ThisDir(), "..", "..")
}
