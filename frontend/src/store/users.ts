import { Dispatch } from "redux";
import { Follow, IUser, ThunkAction } from "../utils/types";
import { csrfFetch } from "../utils/csrf";

interface UserBody {
  name?: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  password?: string;
}

// ============================== ACTION CONSTANTS ==============================
const LOAD_USER = "users/loadUser"
const FOLLOW_USER = "users/followUser"

// ============================== ACTION CREATORS ==============================
export const loadUser = (user: IUser) => {
  return {
    type: LOAD_USER,
    payload: user
  };
};

export const followUser = (followData: Follow) => {
  return {
    type: FOLLOW_USER,
    payload: followData
  }
}

// ============================== THUNKS ==============================
export const loadUserThunk = (username: string) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/users/${username}`)
    .then(res => res.json())

  if (!success) {
    console.error(data);
    return;
  }

  dispatch(loadUser(data) as any);
  return data;
}

export const createUserThunk = (body: UserBody) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch('/api/users', {
    method: "POST",
    body: JSON.stringify(body)
  })
    .then(res => res.json())

  if (!success) {
    return { data, success };
  }

  dispatch(loadUser(data) as any);
  return { data, success };
}

export const followUserThunk = (id: number) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/users/${id}/follows`, { method: "PUT" })
    .then(res => res.json());
  if (!success) {
    console.error(data);
    return;
  }

  dispatch(followUser(data) as any);
  return data;
}

export const editUserThunk = (id: number, body: UserBody) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(body)
  })
    .then(res => res.json());

  if (!success) {
    return { data, success };
  }

  dispatch(loadUser(data) as any);
  return { data, success };
}
// ============================== Reducer ==============================
export const usersReducer = (state = {}, action: ThunkAction) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, [action.payload.id]: action.payload };
    case FOLLOW_USER:
      const { follower, following } = action.payload;
      return { ...state, [follower.id]: follower, [following.id]: following };
    default:
      return state;
  }
}