import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import conversations from './conversations';
import posts from './posts';

const reducer = combineReducers({
  auth,
  posts,
  conversations,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './posts';
export * from './conversations';
