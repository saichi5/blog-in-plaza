// ユーザー
export type User = {
  id: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  description: string;
}

export type Pass = {
  id: string;
  password: string;
}

// 記事の属性
export interface PostAttributes {
  postId: string;
  userId: string;
}

// Page props for [...slug]
export interface SlugPageProps {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}