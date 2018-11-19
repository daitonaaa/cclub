import * as actionTypes from 'constants/actionTypes';

import api from 'api/posts';
import url from 'routes/urls';
import { helpers } from 'utils';

import { setSingle } from 'actions/posts';
import { setServerError, resetServerError } from 'actions/serverError';


const formSetError = (status) => ({
  type: actionTypes.POSTS_FORM_SET_ERROR,
  status,
});


const setFromPostProcess = (status) => ({
  type: actionTypes.POSTS_FORM_SET_PROCESS_STATUS,
  status,
});


export const formChangeField = (field, value) => ({
  type: actionTypes.POSTS_FORM_CHANGE_FIELD,
  field, value,
});


export const formReset = () => ({
  type: actionTypes.POSTS_FORM_RESET,
});


export const formPost = (history) => (dispatch, getState) => {
  dispatch(resetServerError());
  dispatch(setFromPostProcess(true));

  const { title, userId, body } = getState().posts.form;
  const usersList = getState().users.list;

  dispatch(formSetError(Boolean(!title || !userId || !body)));

  const { error } = getState().posts.form;
  if (error) {
    dispatch(setFromPostProcess(false));
    return;
  }

  const post = { title, userId, body };

  return api.createPost(post).then(
    response => response.json(),
    error => dispatch(setServerError(error)),
  ).then(
    json => {
      dispatch(setSingle(helpers.mutatePosts(json, usersList)));
      history.push(url.post.path(json.id));
    }
  );
};