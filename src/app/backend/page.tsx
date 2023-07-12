import DeleteAllUsers from '@/components/backend/delete-all-users';
import DummyPost from '@/components/backend/initialize-post';
import InitializeUsers from '@/components/backend/initialize-users';
import Header from "@/components/organisms/header";
import { AuthUserProvider } from "@/components/auth-user-context";

export default function Backend (){
  const currentPath = '/backend'

  return (
    <div>
      <AuthUserProvider>
        <Header currentPath={currentPath} />
      </AuthUserProvider>
      <InitializeUsers />
      <DummyPost />
      <DeleteAllUsers />
   </div>
  )
}