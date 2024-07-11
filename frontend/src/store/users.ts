import { Dispatch } from "redux";
import { IUser, ThunkAction } from "../utils/types";
import { csrfFetch } from "../utils/csrf";

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

export const followUser = (followData) => {
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

export const followUserThunk = (id: number) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/users/${id}/follows`, { method: "PUT" })
    .then(res => res.json());
  console.log("Data: ", data)
  if (!success) {
    console.error(data);
    return;
  }

  dispatch(followUser(data) as any);
  return data;
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