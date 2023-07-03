import Header from "@/components/organisms/header";
import { UserProvider } from "@/components/user-context";
import Post from "@/components/pages/post-page";

interface PostProps {
  params: { postId: string }
}

export default async function PostPage({ params }: PostProps) {
  const postId = params.postId
  const currentPath = '/posts/' + postId

  return (
    <main>
      <UserProvider>
        <Header currentPath={currentPath} />
      </UserProvider>
      <Post postId={postId} />
    </main>
  )
}
