// ユーザー
export type User = {
  id: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  description?: string;
  createdAt: date;
  updatedAt?: date;
  followIds?: string[];
  commentIds?: string[];
  likes?: {
    postIds?: string[];
    commentIds?: string[];
  };
  dislikes?: {
    postIds?: string[];
    commentIds?: string[];
  };
}

export type Pass = {
  id: string;
  password: string;
}

// 記事の属性
export type PostAttributes = {
  postId: string;
  numberOf: {
    like: number;
    dislike: number;
  };
  feeling: Good | Bad;
  lifeStage: Good | Bad;
  tags?: string[];
}

export const Good = 0
export const Bad = 1

export type Comment = {
  commentId: string;
  postId: string;
  userId: string;
  body: string;
  createdAt: date;
  updatedAt?: date;
  numberOf: {
    like: number;
    dislike: number;
  };
}

// Page props for [...slug]
export interface SlugPageProps {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

