import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  searchUser: 0,
  searchText: '',
  searchResults: [],
  filterIsActive: false,
});


function filter(state = initialState, action) {
  switch (action.type) {

    case actionTypes.POSTS_SET_FILTER_FIELD:
      return state.setIn([action.field], action.value);

    case actionTypes.POSTS_SET_FILTER_RESULTS:
      return state.set('searchResults', action.list);
    
    case actionTypes.POSTS_SET_FILTER_ACTIVE:
      return state.set('filterIsActive', action.status);

    case actionTypes.POSTS_RESET_FILTER:
      return initialState;

    default:
      return state;
  }
}

export default helpers.immutableize(filter);

