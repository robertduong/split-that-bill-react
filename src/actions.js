export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (loggedInUser) => { return { type: LOGIN, user: loggedInUser } }
export const logout = () => { return { type: LOGOUT } }

