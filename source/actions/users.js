import api from 'api/users';
import * as actionTypes from 'constants/actionTypes';


const setUser = (userInfo) => ({
  type: actionTypes.USERS_SET_SINGLE,
  userInfo,
});


const setUsers = (list) => ({
  type: actionTypes.USERS_SET_LIST,
  list,
});


const setSingleLoadingStatus = (status) => ({
  type: actionTypes.USERS_SET_SINGLE_LOADING_STATUS,
  status,
});


const setListLoadingStatus = (status) => ({
  type: actionTypes.USERS_SET_LOADING_STATUS,
  status,
});


export const resetUser = () => ({
  type: actionTypes.USERS_RESET_SINGLE,
});


export const fetchUser = (id) => (dispatch) => {
  dispatch(setSingleLoadingStatus(true));

  return api.getUser(id).then(
    response => response.json()
  ).then(
    json => dispatch(setUser(json))
  );
};

export const fetchUsers = () => (dispatch, getState) => {
  dispatch(setListLoadingStatus(true));

  return api.getUsers().then(
    response => response.json()
  ).then(
    json => {
      dispatch(setUsers(json));
      return json;
    }
  );
};

