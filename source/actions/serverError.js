import * as actionTypes from 'constants/actionTypes';


const setError = (error, errorCode, system) => ({
  type: actionTypes.SERVER_ERROR_SET_DATA,
  error,
  system,
  errorCode,
});


export const setServerError = (errorData, errorCode, system = true) => dispatch => {

  let error = errorData.errors
    ? errorData.errors.error
    : errorData.message;

  dispatch(setError(error, errorCode, system));
};


export const resetServerError = () => ({
  type: actionTypes.SERVER_ERROR_RESET,
});
