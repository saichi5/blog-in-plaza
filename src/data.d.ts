// ユーザー
export type User = {
  id: string
  displayName: string
  email: string
  profileImageUrl?: string
  coverImageUrl?: string
  description?: string
  createdAt: date
  updatedAt?: date
}

export type Pass = {
  password: string;
}

export type Post = {
  id: string
  title: string
  description: string
  body: string
  createdAt: date
  updatedAt?: date
  publishedAt?: date
  numberOf: {
    nice: number
    hard: number
  }
  user: {
    id: string
    displayName: string
    profileImageUrl?: string
  }
}

export type Comment = {
  id: string
  userId: string
  postId?: string
  commentId?: string
  body: string
  createdAt: date
  updatedAt?: date
  publishedAt?: date
  numberOf: {
    nice: number
    hard: number
  };
}
