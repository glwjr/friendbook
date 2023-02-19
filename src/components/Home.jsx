import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNetworkPosts, logout } from '../store';

function Home() {
  const { auth, posts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNetworkPosts());
  }, []);

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
      {
        JSON.stringify(posts, null, 2)
      }
    </div>
  );
}

export default Home;
