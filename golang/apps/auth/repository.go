package auth

import (
	"database/sql"
	"fmt"
)

type repository struct {
	db *sql.DB
}

func newRepository(db *sql.DB) repository {
	return repository{db: db}
}

func (r repository) registerUser(auth Auth) error {
	query := `INSERT INTO users (email, password, username, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)`
	_, err := r.db.Exec(query, auth.Email, auth.Password, auth.Username, auth.CreatedAt, auth.UpdateAt)
	fmt.Println(err)
	return err
}

func (r repository) getUserByEmail(email string) (Auth, error) {
	var auth Auth
	query := `SELECT id, email, password, username, created_at, updated_at FROM users WHERE email = $1`
	err := r.db.QueryRow(query, email).Scan(&auth.Id, &auth.Email, &auth.Password, &auth.Username, &auth.CreatedAt, &auth.UpdateAt)
	return auth, err
}

func (r repository) getUserByUsername(username string) (Auth, error) {
	var auth Auth
	query := `SELECT id, email, password, username, created_at, updated_at FROM users WHERE username = $1`
	err := r.db.QueryRow(query, username).Scan(&auth.Id, &auth.Email, &auth.Password, &auth.Username, &auth.CreatedAt, &auth.UpdateAt)
	return auth, err
}

