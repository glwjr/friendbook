// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

// eslint-disable-next-line default-param-last
const auth = (state = {}, action) => {
  if (action.type === 'SET_AUTH') {
    return action.auth;
  }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem('token');
  window.location.reload();
  return { type: 'SET_AUTH', auth: {} };
};

export const loginWithToken = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const response = await axios.get('/api/auth', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_AUTH', auth: response.data });
  }
};

export const attemptLogin = (credentials) => async (dispatch) => {
  const response = await axios.post('/api/auth', credentials);
  window.localStorage.setItem('token', response.data);
  dispatch(loginWithToken());
};

export const registerUser = (credentials) => async (dispatch) => {
  const response = await axios.post('/api/auth/register', credentials);
  window.localStorage.setItem('token', response.data);
  dispatch(loginWithToken());
};

export default auth;
