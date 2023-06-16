'use client'

import type { User } from '@/data';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import type { FormEvent } from 'react';
import { saveOldUser } from '@/utils/data-fetch';
import { useUser } from '@/components/user-context';
import Image from "next/image";
import moment from 'moment';

export default function EditorForm (){

  const searchParams = useSearchParams();
  const backPath = searchParams && searchParams.get('back');

  const user = useUser() as User;

  console.log('akira01: ' + user?.displayName)

  const [ displayName, setDisplayName ] = useState(user?.displayName);
  const [ description, setDescription ] = useState(user?.description);
  const [ profileImageUrl, setProfileImageUrl ] = useState(user?.profileImageUrl);
  const [ coverImageUrl, setCoverImageUrl ] = useState(user?.coverImageUrl);
  
  const [ errorMessage, setErrorMessage ] = useState('');

  console.log('akira02: ' + displayName)

  useEffect(() => {
    setDisplayName(user?.displayName ?? '');
    setDescription(user?.description ?? '');
    setProfileImageUrl(user?.profileImageUrl ?? '');
    setCoverImageUrl(user?.coverImageUrl ?? '');
    console.log('akira03: ' + displayName)
  }, [] );

  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    // 現地時間でISOフォーマット
    const dateString = moment().format('YYYY-MM-DD');

    try {
        const oldUser: User = {
          id: user.id,
          displayName: displayName as string,
          email: user.email,
          profileImageUrl: profileImageUrl,
          coverImageUrl: coverImageUrl,
          description: description,
          createdAt: user.createdAt,
          updatedAt: dateString,
          followIds: user.followIds,
          commentIds: user.commentIds,
          likes: {
            postIds: user.likes?.postIds,
            commentIds: user.likes?.commentIds
          },
          dislikes: {
            postIds: user.dislikes?.postIds,
            commentIds: user.dislikes?.commentIds
          }
        };
  
        await saveOldUser( oldUser );
  
        window.location.replace(backPath ?? '/');

  
    }catch( error ){
      const err = error as Error;
      setErrorMessage(err.message);
    }
  }

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="space-y-0">
        <div className="pb-6">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* display name  */}
            <div className="sm:col-span-4">
              <label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">
                ブログネーム
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete="displayName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="blog name"
                  />
                </div>
              </div>
            </div>
            {/* description  */}
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                ひとことお願いします
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* profileImageUrl  */}
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                フォト
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <input
                    type="file"
                    onChange={onChangeImage} />
                  変更
                </button>
              </div>
            </div>
            {/* coverImageUrl  */}
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                カバーピクチャー
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>アップロード</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>

      <div className="mt-0 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          更新
        </button>
      </div>
    </form>
    </div>
  )
}