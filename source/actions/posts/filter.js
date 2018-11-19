import * as actionTypes from 'constants/actionTypes';


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

  const { list } = getState().posts.posts;
  const { searchUser, searchText } = getState().posts.filter;

  const results = list.filter(item => {
    
    if (item && searchUser && searchText) {
      return item.title.includes(searchText.toLowerCase()) && item.userId === searchUser;
    }

    else if (item && searchText) {
      return item.title.includes(searchText.toLowerCase());
    }

    else if (item && searchUser) {
      return item.userId === searchUser;
    }

  });

  dispatch(setFilterResults(results));
  dispatch(setActiveFilter(Boolean(searchText || searchUser)));
};