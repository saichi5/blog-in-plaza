'use client'

import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import type { FormEvent } from 'react';
import { changePass } from '@/lib/database-functions';
import { useUser } from '@/components/user-context';

export default function ChangePassword (){

  const searchParams = useSearchParams();
  const backPath = searchParams && searchParams.get('back');

  const user = useUser();

  const [ oldPassword, setOldPassword ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  
  const [ errorMessage, setErrorMessage ] = useState('');

  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
      if (!user) throw new Error('Unauthorized')
      await changePass( user.id, oldPassword, password, password2 );
        window.location.replace(backPath ?? '/');
    }catch( error ){
      const err = error as Error;
      setErrorMessage(err.message);
    }
  }

  return (
    <div className='mt-12'>
    <form onSubmit={handleSubmit} >
      <div className="space-y-0">
          <div className="pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">パスワードの変更</h2>
            {/* oldPassword */}
            <div className="mt-4 sm:col-span-4">
              <label htmlFor="oldPassword" className="block text-sm font-medium leading-6 text-gray-900">
                現在のパスワード
              </label>
              <div className="mt-2">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  autoComplete="oldPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            {/* password  */}
            <div className="mt-4 sm:col-span-4">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                新しいパスワード
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900">
                確認のため、もう一度新しいパスワードを入力してください
              </label>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="password2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
        <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
      </div>

      <div className="mt-0 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          パスワード変更
        </button>
      </div>
    </form>
    </div>
  )
}