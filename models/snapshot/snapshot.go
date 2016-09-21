package snapshot

import (
	"fmt"
	"log"
	"net/url"
	"os"
	"path"
	"strings"
	"time"

	"github.com/server-monitor/snapshotter/models/picture"
	"github.com/server-monitor/snapshotter/util"
	"github.com/server-monitor/snapshotter/util/utildeploy"
)

type SnapMeta struct {
	Category string `json:"category"`
}

type Snapshot struct {
	ID      uint32           `json:"id,omitempty"`
	URL     string           `json:"url,omitempty"`
	Title   string           `json:"title,omitempty"`
	Meta    *SnapMeta        `json:"meta"`
	Picture *picture.Picture `json:"picture,omitempty"`
}

var imgsRootPath = "/images/"
var defaultImgExt = ".jpg"

// var defaultImgExt = ".png"

var uglyHackIsTesting = false

// Why this bullsh*t?! Because this requires to be mocked for testing.
var getAppDir = func() string {
	return util.AppDir()
}

// var getAppDir = func() (dir string) {
// 	var file string
// 	if _, f, _, ok := runtime.Caller(1); !ok {
// 		log.Fatalf("runtime.Caller(1) not ok")
// 	} else {
// 		file = f
// 	}

// 	dir = path.Join(path.Dir(file), "..", "..")
// 	return
// }

func New(urlStr string, args ...interface{}) (*Snapshot, error) {
	if strings.TrimSpace(urlStr) == "" {
		return nil, fmt.Errorf("empty URL")
	}

	pURL, err := url.Parse(urlStr)

	if err != nil {
		return nil, err
	}

	// TODO: prob. write a thing to get the title from the header.
	title := urlStr
	if len(args) > 0 {
		titleArg := args[0].(string)
		if strings.TrimSpace(titleArg) != "" {
			title = titleArg
		}
	}

	meta := (*SnapMeta)(nil)
	if len(args) > 1 {
		meta = args[1].(*SnapMeta)
	}
	// ...

	var pic *picture.Picture

	pathFromURL := strings.TrimRight(
		path.Join(imgsRootPath, pURL.Host, pURL.Path),
		"/",
	) + defaultImgExt

	// Heroku hack
	depAppDir := ""

	if utildeploy.Heroku() {
		depAppDir = utildeploy.AppDir()
	} else {
		depAppDir = getAppDir()
	}

	filePath := path.Join(depAppDir, pathFromURL)

	// End, Heroku hack

	pic, err = picture.New(urlStr, pathFromURL, filePath)

	if err != nil {
		return nil, err
	}

	return &Snapshot{0, urlStr, title, meta, pic}, nil
}

// ...
type Record struct {
	records []*Snapshot
	lastID  uint32
}

var record = Record{}

func (r *Record) add(s *Snapshot) *Snapshot {
	record.lastID++

	// TODO, _ => err check...
	savedPic, _ := s.Picture.Save()

	saved := &Snapshot{
		record.lastID, s.URL, s.Title, s.Meta, savedPic,
	}

	r.records = append(r.records, saved)

	return saved
}

func All() []*Snapshot {
	return record.records
}

func DeleteAll() {
	record.records = nil
	record.lastID = 0
}

func (s *Snapshot) takeSnapshot() error {
	cmd := "wkhtmltoimage"

	filePath := s.Picture.FilePath

	// TODO, DEBUG: skip if snapshot picture exists for now.
	// Some ideas for the future:
	//   * I think we should always take a snapshot because webpages change.
	//   * Webpages change but not all the time. Ideally, detect if the webpage
	//     we're interested in has changed (without taking a picture, maybe there's
	//     something in the headers that will tell us whether the page has changed
	//     or not). If the page has changed, take a pic, obv. and don't if it hasn't.
	if _, err := os.Stat(filePath); !os.IsNotExist(err) {
		log.Printf("%q => %q already exists", s.URL, filePath)
		return nil
	} else {
		log.Printf("getting %q => %q...", s.URL, filePath)
	}

	dir := path.Dir(filePath)

	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		log.Fatal(err)
	}

	shellExecArgs := []string{
		"--crop-h", "5000",
		"--enable-javascript", "--javascript-delay", "5000",
		s.URL, filePath,
	}

	// QT... https://lists.debian.org/debian-backports/2014/10/msg00061.html
	qt_env_key := "QT_XKB_CONFIG_ROOT"

	os.Setenv(qt_env_key, "/usr/share/X11/xkb")

	if out, err := runCmd(cmd, shellExecArgs); err != nil {
		log.Printf("output...\n%s \n... err: %q\n", out, err.Error())
		// log.Fatalf(
		//     "output...\n%s \n... %q => %q... \n... err: %q\n",
		//     out, s.URL, filePath, err.Error(),
		//   )
	}

	os.Unsetenv(qt_env_key)

	if uglyHackIsTesting {
		time.Sleep(1 * time.Millisecond)
	} else {
		time.Sleep(5 * time.Second)
	}

	return nil
}

func (s *Snapshot) Save() (*Snapshot, error) {
	// Validate snapshot
	// return fmt.Errorf("invalid snapshot...")

	// // TODO, decide if we want uniqueness, implement test
	// if s.ID != 0 {
	// 	for _, snap := range All() {
	// 		if s.ID == snap.ID {
	// 			return nil
	// 		}
	// 	}
	// }

	s.takeSnapshot()

	saved := record.add(s)

	return saved, nil
}

func Find(ID uint32) (*Snapshot, bool) {
	for _, s := range All() {
		if s.ID == ID {
			return s, true
		}
	}
	return nil, false
}
