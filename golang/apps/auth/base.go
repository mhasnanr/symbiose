package auth

import (
	"database/sql"

	"github.com/gofiber/fiber/v2"
)

func Run(app *fiber.App, db *sql.DB) {
	repo := newRepository(db)
	svc := newService(repo)
	handler := newHandler(svc)

	api := app.Group("/auth")
	api.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Root")
	})

	api.Post("/register", handler.RegisterUser)
}
