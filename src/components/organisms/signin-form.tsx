"use client"

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { getSigninUser } from "@/utils/signin";
import { useRouter } from "next/navigation";
import type { User } from "@/data";

interface SigninFormProps {
  signin?: boolean;
  signup?: boolean;
}
export default function SigninForm(props: SigninFormProps) {
  const {signin, signup } = props;
  const router = useRouter();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    var authUser:User | undefined;
    getSigninUser( username, password ).then(
      (u) => {authUser = u}
    );

    router.back();
  };

  return (
    <form className="space-y-6"
      onSubmit={handleSubmit}
      method="POST" action={undefined}
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          ニックネーム
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="current-username"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="text-sm">
          <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            パスワードを忘れましたか？
          </Link>
      </div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          パスワード
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          サインイン
        </button>
      </div>
    </form>
  )
}
