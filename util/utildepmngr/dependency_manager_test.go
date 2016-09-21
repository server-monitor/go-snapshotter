package utildepmngr

import (
	"fmt"
	"testing"

	"github.com/server-monitor/snapshotter/util/utiltest"
)

// func TestType(t *testing.T) {
// 	t.Logf("type %#v should be defined", DependencyManager{})
// }

func TestEigen(t *testing.T) {
	t.Logf("singleton %#v should be defined", Eigen)
}

func TestStringifier(t *testing.T) {
	title := "type should have a stringifier method"
	expectedDependencyManager := "gb"

	formatStr := "the value of this crap should be '%s'"

	var expected interface{} = fmt.Sprintf(
		formatStr, expectedDependencyManager,
	)

	var got interface{} = fmt.Sprintf(
		formatStr, Eigen,
	)

	utiltest.Test(t, title, expected, got)
}
