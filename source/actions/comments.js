import api from 'api/comments';
import * as actionTypes from 'constants/actionTypes';


const setLoadingStatus = (status) => ({
  type: actionTypes.COMMENTS_SET_LOADING_STATUS,
  status,
});


const setComments = (comments) => ({
  type: actionTypes.COMMENTS_SET_DATA,
  comments,
});


export const resetComments = () => ({
  type: actionTypes.COMMENTS_RESET,
});


export const fetchComments = (id) => (dispatch) => {
  dispatch(setLoadingStatus(true));

  return api.getComments(id).then(
    response => response.json()
  ).then(
    json => dispatch(setComments(json))
  );
};
