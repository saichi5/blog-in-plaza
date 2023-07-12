import Header from "@/components/organisms/header";
import { AuthUserProvider } from "@/components/auth-user-context";
import UserPosts from "@/components/pages/user-posts";

interface UserProps {
  params: {
    userId: string
  }
}

export default function UserRoot({ params }: UserProps) {
  const userId = params.userId
  
  const currentPath = "/users/" + userId

  return (
    <main>
      <AuthUserProvider>
        <Header currentPath={currentPath} />
        <UserPosts userId={userId} />
      </AuthUserProvider>
    </main>
  )
}
