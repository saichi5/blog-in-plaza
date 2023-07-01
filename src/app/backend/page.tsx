import DeleteAllUsers from '@/components/backend/delete-all-users';
import DummyPost from '@/components/backend/initialize-post';
import InitializeUsers from '@/components/backend/initialize-users';
import Header from "@/components/organisms/header";
import { UserProvider } from "@/components/user-context";

export default function Backend (){
  const currentPath = '/backend'

  return (
    <div>
      <UserProvider>
        <Header currentPath={currentPath} />
      </UserProvider>
      <InitializeUsers />
      <DummyPost />
      <DeleteAllUsers />
   </div>
  )
}