// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

// eslint-disable-next-line default-param-last
const posts = (state = [], action) => {
  if (action.type === 'SET_POSTS') {
    return action.posts.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
  return state;
};

export const fetchUserPosts = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/posts', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_POSTS', posts: response.data });
};

export const fetchNetworkPosts = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/posts/network', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_POSTS', posts: response.data });
};

export default posts;
