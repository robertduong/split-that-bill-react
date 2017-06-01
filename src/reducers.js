import { combineReducers } from 'redux';
import { LOGIN } from './actions';

const login = (state = {loggedIn: false, user: {displayName: ''}}, action) => {
  if (action.type == LOGIN) {
    return { 
      loggedIn: true,
      user: action.user
    };
  } else {
    return state;
  }
};

export default login;
