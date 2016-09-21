package main

import (
	// "fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/handlers"

	"github.com/server-monitor/snapshotter/server"
)

func main() {
	router := server.SetupRouter()

	LoadURLs()

	// loggedRouter := handlers.LoggingHandler(os.Stdout, router)
	// // ... includes browser agent info.
	// // loggedRouter := handlers.CombinedLoggingHandler(os.Stdout, router)

	// log.Printf("Heroku disabling server... %v %v\n", http.ListenAndServe, loggedRouter)
	// log.Fatal(http.ListenAndServe(":", loggedRouter))

	// This whole port thing... for Heroku especially.
	port := os.Getenv("PORT")
	if strings.TrimSpace(port) == "" {
		port = "5000"
	}

	log.Fatal(
		http.ListenAndServe(":"+port, handlers.CORS()(router)),
	)
}
