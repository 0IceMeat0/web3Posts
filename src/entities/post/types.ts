export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostPayload {
  title: string;
  body: string;
}
