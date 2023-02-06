import axios from 'axios';

// eslint-disable-next-line default-param-last
const posts = (state = {}, action) => {
  if (action.type === 'SET_POSTS') {
    return action.posts;
  }
  return state;
};

export const fetchPosts = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/posts', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_POSTS', posts: response.data });
};

export default posts;
