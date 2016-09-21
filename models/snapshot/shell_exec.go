package snapshot

import (
	"fmt"
	"os"
	"os/exec"
)

func printCommand(cmd *exec.Cmd) {
	fmt.Printf("==> Executing: %q\n", cmd.Args)
}

func printError(err error) {
	if err != nil {
		os.Stderr.WriteString(fmt.Sprintf("==> Error: %s\n", err.Error()))
	}
}

func printOutput(outs []byte) {
	if len(outs) > 0 {
		fmt.Printf("==> Output: %q\n", string(outs))
	}
}

func printStderr(stderr []byte) {
	if len(stderr) > 0 {
		fmt.Printf("==> Stderr: %q\n", string(stderr))
	}
}

var runCmd = func(ex string, args []string) (string, error) {
	cmd := exec.Command(ex, args...)

	output, err := cmd.CombinedOutput()

	return string(output), err
}
