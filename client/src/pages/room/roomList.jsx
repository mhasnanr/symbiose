import './roomList.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const RoomListPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/room', {
      method: 'GET',
      credentials: 'include',
    })
      .then((data) => data.json())
      .then((value) => setRooms(value.data));
  }, []);

  const joinRoom = (room, password) => {
    fetch(`http://localhost:3000/room/${room._id}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/room/${room._id}`);
        } else {
          alert('Failed to join room. Please check your password.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Link to="/room/add">
        <button className="btn-new-room">Create new room</button>
      </Link>
      {rooms.map((room) => (
        <div key={room._id} className="room-item">
          <p>{room.title}</p>
          <button
            onClick={() => {
              if (room.publicity === 'private') {
                alert('This room is private');
                const password = prompt('Enter room password:');
                if (!password) return;
                joinRoom(room, password);
              } else {
                alert('This room is public');
                joinRoom(room, null);
              }
            }}
          >
            Join
          </button>
        </div>
      ))}

      {rooms.length === 0 && (
        <div className="empty-rooms">
          No game rooms available. Create one to start playing!
        </div>
      )}

      <button
        className="btn-logout"
        onClick={() => {
          fetch('http://localhost:3000/auth/logout', {
            method: 'post',
            credentials: 'include',
          }).then(() => navigate('/login'));
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default RoomListPage;
