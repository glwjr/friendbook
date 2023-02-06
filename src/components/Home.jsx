import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

function Home() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome
        {' '}
        { auth.username }
        !!
        <button type="button" onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
