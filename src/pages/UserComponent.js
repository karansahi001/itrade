import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../redux/userSlice.js';

const UserComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => JSON.parse(state.user.currentUser));
  const isLoading = useSelector((state) => state.user.isLoading);

  const handleLogin = () => {
    dispatch(login(email, password));
  };
  // console.log(currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.email}</p>
          <button onClick={handleLogout} disabled={isLoading}>
            Logout
          </button>
          <Link to="/">Home</Link>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={isLoading}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
