import { combineReducers } from 'redux';

import form from './form';
import posts from './posts';
import filter from './filter';

export default combineReducers({
  form,
  posts,
  filter,
});
