import FloatingCancelButton from "@/components/atoms/floating-cancel-button";
import SignupForm from "@/components/organisms/signup-form";
import { Suspense } from "react";

function Loading() {
  return <div>Loading...</div>
}

export default function Signup() {

  return (
    <Suspense fallback={<Loading />}>
    <h2 className="text-base font-semibold leading-7 text-gray-900">
        プロフィールを登録してください
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        必須項目には、ラベルに <strong className="text-red-600">*</strong> 印が付いています。
      </p>
      <SignupForm />
      <FloatingCancelButton />
    </Suspense>
  )
}
