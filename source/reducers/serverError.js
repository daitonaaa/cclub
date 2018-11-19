import Immutable from 'immutable';

import { helpers } from 'utils';
import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  error: '',
  errorCode: null,
  system: false, // Если true, то ошибка будет выводится в всплывашку
});


const serverError = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SERVER_ERROR_SET_DATA:
      return state.merge({
        error: action.error,
        system: action.system,
        errorCode: action.errorCode,
      });

    case actionTypes.SERVER_ERROR_RESET:
      return initialState;

    default:
      return state;
  }
};


export default helpers.immutableize(serverError);
