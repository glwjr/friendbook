import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin } from '../store';

function Login() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Create an Account</Link>
    </div>
  );
}

export default Login;
