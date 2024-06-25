import { Dispatch } from 'redux';
import { IPost, PostData, PostUrlData, ThunkAction } from '../utils/types';
import { csrfFetch } from '../utils/csrf';

// ============================== ACTION CONSTANTS ==============================
const LOAD_POST = "posts/loadPost";
const LOAD_ALL_POSTS = "posts/loadAllPosts"

// ============================== ACTION CREATORS ==============================

const loadPost = (post: PostData) => {
  return {
    type: LOAD_POST,
    payload: post
  };
};

const loadAllPosts = (posts: IPost[]) => {
  return {
    type: LOAD_ALL_POSTS,
    payload: posts
  }
}

// ============================== THUNKS ==============================

export const createPostThunk = (post: PostUrlData) => async (dispatch: Dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post)
  });

  const data = await res.json();
  dispatch(loadPost(data));
  return data;
}

export const loadAllPostsThunk = () => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch("/api/posts")
    .then(res => res.json())

  if (!success) {
    console.error(data);
    return;
  }

  dispatch(loadAllPosts(data));
  return data;
}

interface NumberKeyedPostObject {
  [key: number]: IPost;
}

export const postsReducer = (state = {}, action: ThunkAction) => {
  switch (action.type) {
    case LOAD_ALL_POSTS: 
      const postsState: NumberKeyedPostObject = {};
      action.payload.forEach((post: IPost) => {
        postsState[post.id] = post;
      });
      return postsState;
    case LOAD_POST:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};