export const LOGIN = 'LOGIN';

export const login = (loggedInUser) => { return { type: LOGIN, user: loggedInUser } }
