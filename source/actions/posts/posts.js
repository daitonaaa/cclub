import api from 'api/posts';
import * as actionTypes from 'constants/actionTypes';

import url from 'routes/urls';
import { helpers } from 'utils';

import { fetchUsers } from 'actions/users';
import { setServerError, resetServerError } from 'actions/serverError';

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


export const setSingle = (single) => ({
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
  dispatch(resetServerError());
  dispatch(setLoadingStatus(true));

  let usersList = getState().users.list;

  if (!usersList.length) {
    usersList = await dispatch(fetchUsers());
  }

  return api.getPosts().then(
    response => response.json(),
    error => dispatch(setServerError(error)),
  ).then(
    json => dispatch(setList(helpers.mutatePosts(json, usersList))),
  );
};


export const fetchPost = (id) => async (dispatch, getState) => {
  dispatch(resetServerError());
  dispatch(setLoadingStatus(true));

  let usersList = getState().users.list;

  if (!usersList.length) {
    usersList = await dispatch(fetchUsers());
  }

  return api.getPost(id).then(
    response => response.json(),
    error => dispatch(setServerError(error)),
  ).then(
    json => dispatch(setSingle(helpers.mutatePosts(json, usersList)))
  );
};


export const fetchUserPosts = (userId) => async (dispatch, getState) => {
  dispatch(resetServerError());
  dispatch(setLoadingStatus(true));

  let usersList = getState().users.list;

  if (!usersList.length) {
    usersList = await dispatch(fetchUsers());
  }

  return api.getUserPosts(userId).then(
    response => response.json(),
    error => dispatch(setServerError(error)),
  ).then(
    json => dispatch(setList(helpers.mutatePosts(json, usersList)))
  );
};


export const deletePost = (id, history) => (dispatch) => {
  dispatch(resetServerError());
  dispatch(setLoadingStatus(true));

  return api.deletePost(id).then(
    response => {
      dispatch(setLoadingStatus(false));
      dispatch(removeSingle(id));
      history.push(url.posts.path);
    },
    error => dispatch(setServerError(error)),
  );
};
