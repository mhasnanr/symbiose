import React from 'react';
import { useNavigate } from 'react-router';

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = React.useState('public');
  const [password, setPassword] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description: desc,
      roomType,
      ...(roomType === 'private' && { password }),
    };

    try {
      const res = await fetch('http://localhost:3000/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert('Sukses bikin');
        navigate('/rooms');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <div>
        <label htmlFor="roomType">Room Type</label>
        <select id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      {roomType === 'private' && (
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      <button type="submit">Add Room</button>
    </form>
  );
};

export default AddRoomPage;
