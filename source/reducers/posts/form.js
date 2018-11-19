import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  body: '',
  userId: 0,
  title: '',
  error: false,
  formPostProcess: false,
});


function form(state = initialState, action) {
  switch (action.type) {

    case actionTypes.POSTS_FORM_SET_ERROR:
      return state.set('error', action.status);

    case actionTypes.POSTS_FORM_CHANGE_FIELD:
      return state.set([action.field], action.value);

    case actionTypes.POSTS_FORM_SET_PROCESS_STATUS:
      return state.set('formPostProcess', action.status);

    case actionTypes.POSTS_FORM_RESET:
      return initialState;

    default:
      return state;
  }
}

export default helpers.immutableize(form);

