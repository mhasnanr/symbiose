import { useState } from 'react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || data.message || 'Terjadi kesalahan');
        }
        return data;
      })
      .then((data) => {
        console.log(data);
        setEmail('');
        setPassword('');
        alert('Login berhasil!');
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <form onSubmit={login}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
