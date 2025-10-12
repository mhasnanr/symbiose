import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/room', {
      method: 'GET',
      credentials: 'include',
    })
      .then((data) => data.json())
      .then((value) => setRooms(value.data));
  }, []);

  return (
    <div>
      <Link to="/rooms/add">
        <button>Create new room</button>
      </Link>
      {rooms.map((room) => (
        <p key={room._id}>{room.title}</p>
      ))}
    </div>
  );
};

export default RoomListPage;
