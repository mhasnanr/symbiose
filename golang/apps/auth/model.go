package auth

import "time"

type Auth struct {
	Id        int
	Username  string
	Email     string
	Password  string
	CreatedAt time.Time
	UpdateAt  time.Time
}

func NewAuth(email, password, username string) Auth {
	return Auth{
		Username:  username,
		Email:     email,
		Password:  password,
		CreatedAt: time.Now(),
		UpdateAt:  time.Now(),
	}
}