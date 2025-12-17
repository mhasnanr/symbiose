package helper

import (
	"errors"
	"net/http"
)

var (
	ErrNotFound        = errors.New("not found")
	ErrUnauthorized    = errors.New("unauthorized")
	ErrForbiddenAccess = errors.New("forbidden access")
	ErrBadRequest      = errors.New("bad request")
	ErrDuplicateEntry  = errors.New("duplicate entry")
)

var (
	ErrEmailInvalid 	= errors.New("email is invalid")
	ErrEmailRequired  	= errors.New("email is required")	
	ErrEmailAlreadyUsed = errors.New("email already used")

	ErrUsernameRequired    = errors.New("username is required")
	ErrUsernameAlreadyUsed = errors.New("username already used")

	ErrPasswordRequired      = errors.New("password is required")
	ErrPasswordInvalidLength = errors.New("password must be at least 6 characters long")

	// NOT FOUND
	ErrUserNotFound     = errors.New("user not found")
)

type Error struct {
	Message  string
	Error    string
	Code     string
	HttpCode int
}

func (e Error) ErrorMessage() string {
	return e.Message
}

func NewError(msg string, err string, code string, httpCode int) Error {
	return Error{
		Message:  msg,
		Error:    err,
		Code:     code,
		HttpCode: httpCode,
	}
}

var (
	ErrorEmailRequired = NewError(ErrBadRequest.Error(), ErrEmailRequired.Error(), "40001", http.StatusBadRequest)
	ErrorEmailInvalid = NewError(ErrBadRequest.Error(), ErrEmailInvalid.Error(), "40002", http.StatusBadRequest)
	ErrorUsernameRequired = NewError(ErrBadRequest.Error(), ErrUsernameRequired.Error(), "40003", http.StatusBadRequest)
	ErrorPasswordRequired = NewError(ErrBadRequest.Error(), ErrPasswordRequired.Error(), "40004", http.StatusBadRequest)
	ErrorPasswordInvalidLength = NewError(ErrBadRequest.Error(), ErrPasswordInvalidLength.Error(), "40005", http.StatusBadRequest)

	ErrorUserNotFound = NewError(ErrNotFound.Error(), ErrUserNotFound.Error(), "40401", http.StatusNotFound)
	ErrorEmailAlreadyUsed = NewError(ErrDuplicateEntry.Error(), ErrEmailAlreadyUsed.Error(), "40901", http.StatusConflict)
	ErrorUsernameAlreadyUsed = NewError(ErrDuplicateEntry.Error(), ErrUsernameAlreadyUsed.Error(), "40902", http.StatusConflict)
	
	ErrorGeneral = NewError("internal server error", "unknown error", "99999", http.StatusInternalServerError)
)

var (
	ErrorMapping = map[string]Error{
		ErrUsernameRequired.Error():        ErrorUsernameRequired,
		ErrEmailRequired.Error():           ErrorEmailRequired,
		ErrEmailInvalid.Error():            ErrorEmailInvalid,
		ErrPasswordRequired.Error():        ErrorPasswordRequired,
		ErrPasswordInvalidLength.Error():   ErrorPasswordInvalidLength,
		ErrEmailAlreadyUsed.Error():        ErrorEmailAlreadyUsed,
		ErrUsernameAlreadyUsed.Error():     ErrorUsernameAlreadyUsed,
		ErrUserNotFound.Error():            ErrorUserNotFound,
	}
)
