import FloatingCancelButton from "@/components/atoms/floating-cancel-button";
import CreatePost from "@/components/pages/create-post";
import { AuthUserProvider } from "@/components/auth-user-context";
import { Suspense } from "react";

function Loading() {
  return <div>Loading...</div>
}

export default function Page() {

  return (
    <>
    <p className="text-2xl text-gray-900">[初稿]</p>
    <Suspense fallback={<Loading />}>
      <AuthUserProvider>
        <CreatePost />
      </AuthUserProvider>
      <FloatingCancelButton />
    </Suspense>
    </>
  )
}
