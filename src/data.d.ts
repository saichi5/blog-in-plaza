// ユーザー
export type User = {
  id: string
  username: string
  displayName: string
  email: string
  profileImageUrl: string
  description: string
  password: string
}

// 記事の属性
export type PostAttributes = {
  postId: string
  userId: string
}

// Page props for [...slug]
export interface SlugPageProps {
  params: {
    slug: string[],
  };
  searchParams: { [key: string]: string | string[] | undefined };
}