export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  bio: string;
  updatedAt: Date | string;
  createdAt: Date | string;
  posts?: IPost[];
  postLikes?: PostLike[];
  following?: Follow[];
  followers?: Follow[];
}
export interface IPost {
  id: number;
  private: boolean;
  author: IUser;
  authorId: number;
  url: string;
  description: string;
  updatedAt: Date | string;
  createdAt: Date | string;
  likes?: PostLike[];
  comments?: IComment[];
}

export interface PostData {
  file: File;
  description: string;
}

export interface PostUrlData {
  url: string;
  description: string;
}

export interface ThunkAction {
  type: string;
  payload?: any;
}

export interface UserLogin {
  credential: string;
  password: string;
}

export interface UserSignup {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface PostLike {
  id: number;
  authorId: number;
  author: IUser;
  postId: number;
  post: IPost;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface CommentLike {
  id: number;
  authorId: number;
  author: IUser;
  CommentId: number;
  comment: IComment;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type CSSModule = {
  [className: string]: string;
}

export interface IComment {
  id: number;
  content: string;
  authorId: number;
  author: IUser;
  postId: number;
  post: IPost;
  likes: CommentLike[];
  createdAt?: Date | string;
  updatedAt: Date | string;
  parent?: IComment;
  children?: IComment[];
}

export interface Channel {
  id: number;
  name: string;
  users?: IUser[];
  posts?: IPost[];
}

export interface Follow {
  id: string;
  follower: IUser;
  followerId: number;
  following: IUser;
  followingId: number;
}