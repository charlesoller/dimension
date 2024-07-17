import { Dispatch } from 'redux';
import { IUser, ThunkAction, UserLogin, UserSignup } from '../utils/types';
import { csrfFetch } from '../utils/csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user: IUser) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const loginThunk = (user: UserLogin) => async (dispatch: Dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  if (data.success === false) {
    return { success: false, data: data.message }
  }
  
  dispatch(setUser(data.user));
  return data;
};

export const restoreUserThunk = () => async (dispatch: Dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signupThunk = (user: UserSignup) => async (dispatch: Dispatch) => {
  const { username, name, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      name,
      email,
      password
    })
  });
  const data = await response.json();
  if(response.ok){
    dispatch(setUser(data.user));
    return { message: "Success!" }
  } else {
    return data;
  }
};

export const logoutThunk = () => async (dispatch: Dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

export const sessionReducer = (state = initialState, action: ThunkAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};