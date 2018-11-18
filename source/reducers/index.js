import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users';
import posts from './posts';
import comments from './comments';

export const reducers = {
  users,
  posts,
  comments,
};

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

export default rootReducer;

