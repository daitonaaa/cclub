import api from 'api/posts';
import * as actionTypes from 'constants/actionTypes';

import url from 'routes/urls';

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


export const fetchPosts = () => (dispatch, getState) => {
  dispatch(setLoadingStatus(true));

  const usersList = getState().users.list;
  console.log(usersList);

  return api.getPosts().then(
    response => response.json()
  ).then(
    json => dispatch(setList(json))
  );
};


export const fetchPost = (id) => (dispatch) => {
  dispatch(setLoadingStatus(true));
  
  return api.getPost(id).then(
    response => response.json()
  ).then(
    json => dispatch(setSingle(json))
  );
};


export const fetchUserPosts = (userId) => (dispatch) => {
  dispatch(setLoadingStatus(true));

  return api.getUserPosts(userId).then(
    response => response.json()
  ).then(
    json => dispatch(setList(json))
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
