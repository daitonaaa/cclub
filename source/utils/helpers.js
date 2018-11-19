import { fromJS } from 'immutable';

export default {

  immutableize: reducer => (state, action) => {
    state = reducer(fromJS(state), action);

    return state.toJS === undefined
      ? state
      : state.toJS();
  },

  ucFirst: (str) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  },

  mutatePosts: (data, users) => {
    const getCurrentUsername = (userId) => {
      let currentUser = users.find(user => user.id === userId);
      
      if (currentUser) return currentUser.username;
      else return false;
    };
  
    // Если на входе array
    if (data instanceof Array) return data.map(item => (
      getCurrentUsername(item.userId) && {
        ...item, username: getCurrentUsername(item.userId)
      }
    ));
  
    // Если object
    else return {
      ...data,
      username: getCurrentUsername(data.userId)
    };
  }
};
