import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  // Users list
  list: [],

  // Single user
  userInfo: {},
  userIsFetching: false,
});


function users(state = initialState, action) {
  switch (action.type) {

    case actionTypes.USERS_SET_SINGLE_LOADING_STATUS:
      return state.set('userIsFetching', action.status);

    case actionTypes.USERS_SET_LIST:
      return state.set('list', action.list);
    
    case actionTypes.USERS_SET_SINGLE:
      return state.merge({
        userInfo: action.userInfo,
        userIsFetching: false,
      });

    case actionTypes.USERS_RESET_SINGLE:
      return state.set('userInfo', {});

    default:
      return state;
  }
}

export default helpers.immutableize(users);

