import Header from "@/components/organisms/header";
import { UserProvider } from "@/components/user-context";
import UserPosts from "@/components/pages/user-posts";

interface PageProps {
  params: {
    userId: string
  }
}

export default function UserRoot({ params }: PageProps) {
  const userId = params.userId
  
  const currentPath = "/users/" + userId

  return (
    <main>
      <UserProvider>
        <Header currentPath={currentPath} />
      </UserProvider>
      <UserPosts userId={userId} />
    </main>
  )
}
