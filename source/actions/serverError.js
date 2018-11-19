import * as actionTypes from 'constants/actionTypes';


const setError = (error, system) => ({
  type: actionTypes.SERVER_ERROR_SET_DATA,
  error,
  system,
});


export const setServerError = (errorData, system = true) => dispatch => {

  let error;

  if (error instanceof Object) {
    error = errorData.errors
      ? errorData.errors.error
      : errorData.message;
  }
  else error = errorData;

  dispatch(setError(error, system));
};


export const resetServerError = () => ({
  type: actionTypes.SERVER_ERROR_RESET,
});
