import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  list: [],
  single: {},
  loading: false,

  // Filter
  searchUser: 0,
  searchText: '',
  searchResults: [],
  filterIsActive: false,

  form: {
    body: '',
    title: '',
    userId: null,
  }
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

    // Filter
    case actionTypes.POSTS_SET_FILTER_FIELD:
      return state.setIn([action.field], action.value);

    case actionTypes.POSTS_SET_FILTER_RESULTS:
      return state.set('searchResults', action.list);
    
    case actionTypes.POSTS_SET_FILTER_ACTIVE:
      return state.set('filterIsActive', action.status);

    case actionTypes.POSTS_RESET_FILTER:
      return state.merge({
        searchUser: 0,
        searchText: '',
        searchResults: [],
        filterIsActive: false,
      });

    default:
      return state;
  }
}

export default helpers.immutableize(posts);

