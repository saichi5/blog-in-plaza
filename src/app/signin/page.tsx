/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import Image from "next/image";
import SigninForm from "@/components/organisms/signin-form";

export default function Signin() {

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            height={0} width={0}
            className="mx-auto h-10 w-auto"
            src="/users/jaro.jpg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            いらっしゃいませ。
          </h2>
        </div>
          <SigninForm />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        </div>
      </div>
    </>
  )
}
