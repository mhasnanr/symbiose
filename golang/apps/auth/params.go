package auth

import (
	"regexp"

	"github.com/mhasnanr/symbiose-go-server/internal/helper"
)

type RegisterRequest interface {
}

type registerRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (req registerRequest) ValidateEmail() error {
	if req.Email == "" {
		return helper.ErrEmailRequired
	}
	
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	if match, _ := regexp.MatchString(emailRegex, req.Email); !match {
		return helper.ErrEmailInvalid
	}

	return nil
}

func (req registerRequest) ValidatePassword() error {
	if req.Password == "" {
		return helper.ErrPasswordRequired
	}
	if len(req.Password) < 6 {
		return helper.ErrPasswordInvalidLength
	}
	return nil
}

func (req registerRequest) ValidateUsername() error {
	if req.Username == "" {
		return helper.ErrUsernameRequired
	} 
	return nil
}


func (r registerRequest) Validate() error {
	if err := r.ValidateEmail(); err != nil {
		return err
	}
	if err := r.ValidatePassword(); err != nil {
		return err
	}
	if err := r.ValidateUsername(); err != nil {
		return err
	}
	return nil
}