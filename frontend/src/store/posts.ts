import { Dispatch } from 'redux';
import { IPost, PostData, PostUrlData, ThunkAction, PostLike, IComment } from '../utils/types';
import { csrfFetch } from '../utils/csrf';

// ============================== ACTION CONSTANTS ==============================
const LOAD_POST = "posts/loadPost";
const LOAD_ALL_POSTS = "posts/loadAllPosts"
const DELETE_POST = "posts/deletePost"
const LIKE_POST = "posts/likePost"
const COMMENT_POST = "posts/commentPost"    // handles creating/deleting/updating comments on a post
const DELETE_COMMENT = "posts/deleteComment"
const EDIT_COMMENT = "posts/editComment"

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

const likePost = (postId: number, likes: PostLike[] ) => {
  return {
    type: LIKE_POST,
    payload: { postId, likes }
  }
}

const commentPost = (postId: number, comments: IComment[]) => {
  return {
    type: COMMENT_POST,
    payload: { postId, comments }
  }
}

const deleteComment = (postId: number, deletedComment: IComment) => {
  return {
    type: DELETE_COMMENT,
    payload: { postId, deletedComment }
  }
}

const editComment = (postId: number, editedComment: IComment) => {
  return {
    type: EDIT_COMMENT,
    payload: { postId, editedComment }
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

export const likePostThunk = (id: number) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/posts/${id}/likes`, {
    method: "PUT"
  })
    .then(res => res.json())

  if (!success) {
    console.error(data);
    return;
  }

  dispatch(likePost(id, data));
}

export const commentPostThunk = (id: number, comment: string) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/posts/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content: comment })
  })
    .then(res => res.json())
  if (!success) {
    console.error(data);
    return;
  }

  dispatch(commentPost(id, data));
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

export const deleteCommentThunk = (commentId: number, postId: number) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE"
  })
    .then(res => res.json())
  
  if (!success) {
    console.error(data);
    return;
  }

  dispatch(deleteComment(postId, data));
}

export const editCommentThunk = (commentId: number, postId: number, comment: string) => async (dispatch: Dispatch) => {
  const { data, success } = await csrfFetch(`/api/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify({ content: comment })
  })
    .then(res => res.json())
  if (!success) {
    console.error(data);
    return;
  }

  dispatch(editComment(postId, data));
}

// ============================== Reducer ==============================
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
    case LIKE_POST: {
      const existingPost = state[action.payload.postId]
      return {...state, [action.payload.postId]: { ...existingPost, likes: action.payload.likes }}
    }
    case COMMENT_POST: {
      const existingPost = state[action.payload.postId]
      return {...state, [action.payload.postId]: { ...existingPost, comments: action.payload.comments }}
    }
    case DELETE_COMMENT: {
      const existingPost = state[action.payload.postId]
      const newComments = existingPost.comments.filter((comment: IComment) => comment.id !== action.payload.deletedComment.id);
      return {...state, [action.payload.postId]: { ...existingPost, comments: newComments }};
    }
    case EDIT_COMMENT: {
      const existingPost = state[action.payload.postId];
      const newComments = existingPost.comments.map((comment: IComment) => 
          comment.id === action.payload.editedComment.id 
          ? action.payload.editedComment 
          : comment
      )
        
      return {...state, [action.payload.postId]: { ...existingPost, comments: newComments }};
    }
    default:
      return state;
  }
};