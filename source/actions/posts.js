import api from 'api/posts';
import * as actionTypes from 'constants/actionTypes';

import url from 'routes/urls';

import { fetchUsers } from 'actions/users';

/**
 * В сторе имена данных другие
 *  posts = list
 *  post = single
 */

const setList = (list) => ({
  type: actionTypes.POSTS_SET_LIST,
  list,
});


const removeSingle = (id) => ({
  type: actionTypes.POSTS_DELETE_SINGLE,
  id,
});


const setSingle = (single) => ({
  type: actionTypes.POSTS_SET_SINGLE,
  single,
});


const setLoadingStatus = (status) => ({
  type: actionTypes.POSTS_SET_LOADING_STATUS,
  status,
});


export const resetPost = () => ({
  type: actionTypes.POSTS_RESET_SINGLE,
});


export const resetList = () => ({
  type: actionTypes.POSTS_RESET_LIST,
});


export const fetchPosts = () => async (dispatch, getState) => {
  dispatch(setLoadingStatus(true));

  let usersList = getState().users.list;

  if (!usersList.length) {
    usersList = await dispatch(fetchUsers());
  }

  return api.getPosts().then(
    response => response.json(),
    error => console.log(error),
  ).then(
    json => dispatch(setList(mutate(json, usersList))),
  );
};


export const fetchPost = (id) => async (dispatch, getState) => {
  dispatch(setLoadingStatus(true));

  let usersList = getState().users.list;

  if (!usersList.length) {
    usersList = await dispatch(fetchUsers());
  }

  return api.getPost(id).then(
    response => response.json()
  ).then(
    json => dispatch(setSingle(mutate(json, usersList)))
  );
};


export const fetchUserPosts = (userId) => async (dispatch, getState) => {
  dispatch(setLoadingStatus(true));

  let usersList = getState().users.list;

  if (!usersList.length) {
    usersList = await dispatch(fetchUsers());
  }

  return api.getUserPosts(userId).then(
    response => response.json()
  ).then(
    json => dispatch(setList(mutate(json, usersList)))
  );
};


export const deletePost = (id, history) => (dispatch) => {
  dispatch(setLoadingStatus(true));

  return api.deletePost(id).then(
    response => {
      dispatch(setLoadingStatus(false));
      dispatch(removeSingle(id));
      history.push(url.posts.path);
    }
  );
};


// SEARCH
const setFieldFilter = (field, value) => ({
  type: actionTypes.POSTS_SET_FILTER_FIELD,
  field, value,
});


const setFilterResults = (list) => ({
  type: actionTypes.POSTS_SET_FILTER_RESULTS,
  list,
});


const setActiveFilter = (status) => ({
  type: actionTypes.POSTS_SET_FILTER_ACTIVE,
  status,
});


export const resetFilter = () => ({
  type: actionTypes.POSTS_RESET_FILTER,
});


export const setFilters = (field, value) => (dispatch, getState) => {
  dispatch(setFieldFilter(field, value));

  const { searchUser, searchText, list } = getState().posts;
  
  const results = list.filter(item => {

    if (searchUser && searchText) {
      return item.title.includes(searchText.toLowerCase()) && item.userId === searchUser;
    }

    else if (searchText) {
      return item.title.includes(searchText.toLowerCase());
    }

    else if (searchUser) {
      return item.userId === searchUser;
    }

  });

  dispatch(setFilterResults(results));
  dispatch(setActiveFilter(Boolean(searchText || searchUser)));
};


// helpers
/**
 * @description - Дописываем имя юзера в списках, а то чё там цифры :)
 */
const mutate = (data, users) => {
  
  const getCurrentUsername = (userId) => {
    let currentUser = users.find(user => user.id === userId);
    
    if (currentUser) return currentUser.username;
    else return false;
  };

  // Если на входе array
  if (data instanceof Array) return data.map(item => (
    getCurrentUsername(item.userId) && {
      ...item, username: getCurrentUsername(item.userId),
    }
  ));

  // Если object
  else return {
    ...data,
    username: getCurrentUsername(data.userId)
  };
};
