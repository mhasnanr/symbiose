package apps

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/mhasnanr/symbiose-go-server/apps/users"
)


func registerRoute(app *fiber.App, db *sql.DB) {
	users.Run(app, db)
}


func RunServer(appPort string, db *sql.DB) {
	app := fiber.New()
	registerRoute(app, db)

	log.Println("Server running at port", appPort)
	if err := app.Listen(appPort); err != nil {
		panic(err)
	}
}