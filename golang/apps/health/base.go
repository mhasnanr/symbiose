package health

import (
	"database/sql"

	"github.com/gofiber/fiber/v2"
)

func Run(app *fiber.App, db *sql.DB) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Symbiose Go Server")
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("Health OK")
	})
}