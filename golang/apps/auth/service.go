package auth

import (
	"github.com/mhasnanr/symbiose-go-server/internal/helper"
)

type repositoryContract interface {
	registerUser(auth Auth) error
	getUserByEmail(email string) (Auth, error)
	getUserByUsername(username string) (Auth, error)
}

type service struct {
	repo repositoryContract
}

func newService(repo repositoryContract) service {
	return service{repo: repo}
}

func (s service) RegisterUser(req registerRequest) error {
	if err := req.Validate(); err != nil {
		return err
	}

	_, err := s.repo.getUserByEmail(req.Email)
	if err == nil {
		return helper.ErrEmailAlreadyUsed
	}

	_, err = s.repo.getUserByUsername(req.Username)
	if err == nil {
		return helper.ErrUsernameAlreadyUsed
	}

	auth := NewAuth(req.Email, req.Password, req.Username)
	
	return s.repo.registerUser(auth)
}