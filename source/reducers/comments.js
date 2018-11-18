import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  comments: [],
  fetchingComments: false,
});


function comments(state = initialState, action) {
  switch (action.type) {

    case actionTypes.COMMENTS_SET_LOADING_STATUS:
      return state.set('fetchingComments', action.status);

    case actionTypes.COMMENTS_SET_DATA:
      return state.merge({
        comments: action.comments,
        fetchingComments: false,
      });

    case actionTypes.COMMENTS_RESET:
      return initialState;

    default:
      return state;
  }
}

export default helpers.immutableize(comments);

