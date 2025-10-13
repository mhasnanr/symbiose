import './index.css';
import App from './App.jsx';
import LoginPage from './pages/login/login.jsx';
import RegisterPage from './pages/register/register.jsx';
import RoomListPage from './pages/room/roomList.jsx';
import AddRoomPage from './pages/room/addRoom.jsx';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthorizedRoute, MemberRoute, UnauthorizedRoute } from './ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <AuthorizedRoute>
            <App />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/room"
        element={
          <AuthorizedRoute>
            <RoomListPage />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/room/:id"
        element={
          <AuthorizedRoute>
            <MemberRoute>
              <App />
            </MemberRoute>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/room/add"
        element={
          <AuthorizedRoute>
            <AddRoomPage />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <UnauthorizedRoute>
            <LoginPage />
          </UnauthorizedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <UnauthorizedRoute>
            <RegisterPage />
          </UnauthorizedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
