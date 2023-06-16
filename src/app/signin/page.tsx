import Image from "next/image";
import SigninForm from "@/components/organisms/signin-form";
import FloatingCancelButton from "@/components/atoms/floating-cancel-button";

export default function Signin() {

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            height={0} width={0}
            className="mx-auto h-20 w-auto"
            src="/nico2.jpg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            いらっしゃいませ
          </h2>
        </div>
          <SigninForm />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        </div>
      </div>
      <FloatingCancelButton />
    </>
  )
}
