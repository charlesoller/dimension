// Util
import { csrfFetch } from "../utils/csrf";
// Types
import { Channel, ThunkAction } from "../utils/types";
import { Dispatch } from "redux";

// ============================== ACTION CONSTANTS ==============================

const LOAD_CHANNEL = "channels/loadChannel";

// ============================== ACTION CREATORS ==============================

const loadChannel = (channel: Channel) => {
  return {
    type: LOAD_CHANNEL,
    payload: channel
  }
}

// ============================== THUNKS ==============================
export const loadChannelThunk = (channelName: string) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/channels/${channelName}`)
    .then(res => res.json())

  if (!success) {
    console.error(data);
    return;
  }

  dispatch(loadChannel(data));
  return data;
}

// ============================== Reducer ==============================

export const channelsReducer = (state = {}, action: ThunkAction) => {
  switch (action.type) {
    case LOAD_CHANNEL: {
      return { ...state, [action.payload.name]: action.payload };
    }
    default:
      return state;
  }
};