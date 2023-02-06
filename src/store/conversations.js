// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

// eslint-disable-next-line default-param-last
const conversations = (state = {}, action) => {
  if (action.type === 'SET_CONVERSATIONS') {
    return action.conversations;
  }
  return state;
};

export const fetchConversations = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const response = await axios.get('/api/conversations', {
    headers: {
      authorization: token,
    },
  });
  dispatch({ type: 'SET_CONVERSATIONS', conversations: response.data });
};

export default conversations;
