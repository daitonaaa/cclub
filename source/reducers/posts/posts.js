import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  list: [],
  single: {},
  loading: false,
});


function posts(state = initialState, action) {
  switch (action.type) {

    case actionTypes.POSTS_SET_LIST:
      return state.merge({
        loading: false,
        list: action.list,
      });
    
    case actionTypes.POSTS_SET_SINGLE:
      return state.merge({
        loading: false,
        single: action.single,
      });

    case actionTypes.POSTS_DELETE_SINGLE: {
      const singleIndex = state.get('list').findIndex(
        single => single.get('id') === action.id,
      );

      return state.deleteIn(['list', singleIndex]);
    }

    case actionTypes.POSTS_SET_LOADING_STATUS:
      return state.set('loading', action.status);

    case actionTypes.POSTS_RESET_SINGLE:
      return state.set('single', {});

    case actionTypes.POSTS_RESET_LIST:
      return state.set('list', []);

    default:
      return state;
  }
}

export default helpers.immutableize(posts);

