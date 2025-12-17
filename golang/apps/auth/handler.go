package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mhasnanr/symbiose-go-server/internal/helper"
)

type handler struct {
	svc service
}

func newHandler(svc service) handler {
	return handler{
		svc: svc,
	}
}

func (h handler) RegisterUser(c *fiber.Ctx) error {
	var req registerRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "bad request",
			"error": "invalid request body",
		})	
	}

	err := h.svc.RegisterUser(req)
	if err != nil {
		errors, ok := helper.ErrorMapping[err.Error()]
		if !ok {
			errors = helper.ErrorGeneral
		}
		resp := fiber.Map{
			"message": errors.Message,
			"error":   errors.Error,
			"code":    errors.Code,
		}
		return c.Status(errors.HttpCode).JSON(resp)
	}	


	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "user registered successfully",
	})
}