export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  bio: string;
  updatedAt: Date | string;
  createdAt: Date | string;
  posts?: IPost[];
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
}

export interface PostData {
  file: File;
  description: string;
}