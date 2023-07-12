import { PostProps } from "@/app/posts/[postId]/page";
import FloatingCancelButton from "@/components/atoms/floating-cancel-button";
import EditPost from "@/components/pages/edit-post";
import { Suspense } from "react";

function Loading() {
  return <div>Loading...</div>
}

export default function Page({ params }:PostProps) {
  const postId = params.postId

  return (
    <>
    <p className="text-2xl text-gray-900">[編集]</p>
    <Suspense fallback={<Loading />}>
      <EditPost postId={postId} />
      <FloatingCancelButton />
    </Suspense>
    </>
  )
}
