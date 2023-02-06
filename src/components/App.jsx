import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link, Routes, Route, Navigate,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { fetchConversations, fetchPosts, loginWithToken } from '../store';
import Register from './Register';
import Conversations from './Conversations';
import Posts from './Posts';
import NotFound from './NotFound';

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchConversations());
      dispatch(fetchPosts());
    }
  }, [auth]);

  return (
    <div className="app">
      <h1>Fakebook</h1>
      <nav>
        <Link to="/">Home</Link>
        {auth.id ? <Link to="/posts">Posts</Link> : ''}
        {auth.id ? <Link to="/conversations">Conversations</Link> : ''}
      </nav>
      <Routes>
        <Route path="/" element={auth.id ? <Home /> : <Login />} />
        <Route path="/register" element={auth.id ? <Navigate to="/" /> : <Register />} />
        <Route path="/posts" element={auth.id ? <Posts /> : <NotFound />} />
        <Route path="/conversations" element={auth.id ? <Conversations /> : <NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
