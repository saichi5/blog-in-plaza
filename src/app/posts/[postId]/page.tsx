import Header from "@/components/organisms/header";
import { AuthUserProvider } from "@/components/auth-user-context";
import Post from "@/components/pages/post-page";

export interface PostProps {
  params: { postId: string }
}

export default async function PostPage({ params }: PostProps) {
  const postId = params.postId
  const currentPath = '/posts/' + postId

  return (
    <main>
      <AuthUserProvider>
        <Header currentPath={currentPath} />
        <Post postId={postId} />
      </AuthUserProvider>
    </main>
  )
}
