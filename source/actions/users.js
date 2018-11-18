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


const setLoadingStatus = (status) => ({
  type: actionTypes.USERS_SET_SINGLE_LOADING_STATUS,
  status,
});


export const resetUser = () => ({
  type: actionTypes.USERS_RESET_SINGLE,
});


export const fetchUser = (id) => (dispatch) => {
  dispatch(setLoadingStatus(true));

  return api.getUser(id).then(
    response => response.json()
  ).then(
    json => dispatch(setUser(json))
  );
};

export const fetchUsers = () => (dispatch) => {
  
  return api.getUsers().then(
    response => response.json()
  ).then(
    json => dispatch(setUsers(json))
  );
};

