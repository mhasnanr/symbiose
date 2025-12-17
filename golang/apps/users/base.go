package users

import (
	"database/sql"

	"github.com/gofiber/fiber/v2"
)

func Run(app *fiber.App, db *sql.DB) {
	// repo := newRepository(db)
	// svc := newService(repo)
	// handler := newHandler(svc)

	// app.Route("/users", func(r fiber.Router) {
	// 	r.Post("/", func(c *fiber.Ctx) error {
	// 		return c.SendString("Create User")
	// 	})
	// })

	// router.Route("/v1/auth", func(r chi.Router) {
	// 	r.Post("/register/user", handler.registerHandler)
	// 	r.Post("/register/merchant", handler.registerHandler)
	// 	r.Post("/login", handler.loginHandler)
	// })
}
