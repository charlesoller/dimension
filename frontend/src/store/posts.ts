import { Dispatch } from 'redux';
import { IPost, PostData, PostUrlData, ThunkAction } from '../utils/types';
import { csrfFetch } from '../utils/csrf';

// ============================== ACTION CONSTANTS ==============================
const LOAD_POST = "posts/loadPost";
const LOAD_ALL_POSTS = "posts/loadAllPosts"
const DELETE_POST = "posts/deletePost"

// ============================== ACTION CREATORS ==============================

const loadPost = (post: IPost) => {
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

const deletePost = (postId: number) => {
  return {
    type: DELETE_POST,
    payload: postId
  }
}

// ============================== THUNKS ==============================

export const createPostThunk = (post: PostUrlData) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post)
  })
    .then(res => res.json());

  if (!success) {
    console.error(data);
    return;
  }

  dispatch(loadPost(data));
  console.log("DATA: ", data)
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

export const updatePostThunk = (id: number, description: string) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ description })
  })
    .then(res => res.json())
  
  if (!success) {
    console.error(data);
    return;
  }

  dispatch(loadPost(data));
  return data;
}

export const deletePostThunk = (id: number) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/posts/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())

  if (!success) {
    console.error(data);
    return;
  }

  dispatch(deletePost(id));
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
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_POST:
      const newPosts = { ...state };
      delete newPosts[action.payload];
      return newPosts;
    default:
      return state;
  }
};