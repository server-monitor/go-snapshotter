package picture

import (
	"fmt"
	"strings"
)

type Picture struct {
	ID       uint32 `json:"id,omitempty"`
	Title    string `json:"title,omitempty"`
	Path     string `json:"path,omitempty"`
	FilePath string `json:"filepath,omitempty"`
}

func New(title string, path string, filePath string) (*Picture, error) {
	if strings.TrimSpace(title) == "" {
		return nil, fmt.Errorf("empty title")
	}

	if strings.TrimSpace(path) == "" {
		return nil, fmt.Errorf("empty path")
	}

	return &Picture{0, title, path, filePath}, nil
}

type Record struct {
	records []*Picture
	lastID  uint32
}

var record = Record{}

func (r *Record) add(p *Picture) *Picture {
	record.lastID++

	saved := &Picture{record.lastID, p.Title, p.Path, p.FilePath}

	r.records = append(r.records, saved)

	return saved
}

func All() []*Picture {
	return record.records
}

func DeleteAll() {
	record.records = nil
	record.lastID = 0
}

func (p *Picture) Save() (*Picture, error) {
	// Validate picture
	// return fmt.Errorf("invalid picture...")

	// // TODO, decide if we want uniqueness, implement test
	// if p.ID != 0 {
	// 	for _, saved := range All() {
	// 		if p.ID == saved.ID {
	// 			return saved, nil
	// 		}
	// 	}
	// }

	saved := record.add(p)

	return saved, nil
}

func Find(ID uint32) (*Picture, bool) {
	for _, p := range All() {
		if p.ID == ID {
			return p, true
		}
	}
	return nil, false
}
