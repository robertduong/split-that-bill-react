import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from './actions';

const login = (state = {loggedIn: false, user: {displayName: ''}}, action) => {
  if (action.type == LOGIN) {
    return { 
      loggedIn: true,
      user: action.user
    };
  } else if (action.type == LOGOUT) {
    return  {
      loggedIn: false,
      user: {displayName: ''}
    }
  } else {
    return state;
  }
};

export default login;
