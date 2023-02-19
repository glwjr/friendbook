import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { Container, ScopedCssBaseline } from '@mui/material';
import Home from './Home';
import Login from './Login';
import { fetchConversations, loginWithToken } from '../store';
import Register from './Register';
import Conversations from './Conversations';
import Posts from './Posts';
import NotFound from './NotFound';
import ResponsiveAppBar from './ResponsiveAppBar';

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchConversations());
    }
  }, [auth]);

  return (
    <ScopedCssBaseline>
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={auth.id ? <Home /> : <Login />} />
          <Route path="/register" element={auth.id ? <Navigate to="/" /> : <Register />} />
          <Route path="/posts" element={auth.id ? <Posts /> : <Login />} />
          <Route path="/conversations" element={auth.id ? <Conversations /> : <Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </ScopedCssBaseline>
  );
}

export default App;
