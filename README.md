# Symbiose

This is a web-based multiplayer card game where players interact with each other to score points.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js (session-based)

## Client-Server Communication

The client-side React application communicates with the server-side Node.js application through a REST API. The server runs on `http://localhost:3456`, and the client runs on `http://localhost:5173`.

Authentication is handled using session-based authentication with Passport.js. The client sends credentials to the server, and upon successful authentication, the server creates a session and sends a session cookie back to the client. This cookie is included in subsequent requests to maintain the session.

## API Endpoints

The following are the main API endpoints:

### Authentication

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and create a session.
- `POST /auth/logout`: Log out a user and destroy the session.
- `GET /auth/check`: Check if a user is authenticated.

### Game

- `POST /room`: Create a new game room.
- `GET /room/:id`: Get the details of a game room.
- `POST /room/:id/join`: Join a game room.
- `POST /room/:id/leave`: Leave a game room.

## Getting Started

To run the application, you need to have Node.js and MongoDB installed.

### Backend

1. Navigate to the `server` directory.
2. Install the dependencies: `npm install`
3. Start the server: `npm start`

### Frontend

1. Navigate to the `client` directory.
2. Install the dependencies: `npm install`
3. Start the client: `npm run dev`
