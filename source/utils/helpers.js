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
};
