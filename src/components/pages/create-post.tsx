'use client'

import { useState, type FormEvent } from 'react';
import moment from 'moment';
import MarkdownPreview from '@/components/atoms/markdown-preview';
import { useAuthUser } from '@/components/auth-user-context';
import { nanoid } from '@/lib/utils';
import type { Post } from '@/data';
import { setPost } from '@/lib/database-functions';

export default function CreatePost (){
  const authUser = useAuthUser()

  const [ createdAt, setCreatedAt ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ body, setBody ] = useState('');
  const [ isChecked, setIsChacked ] = useState(false);
  
  const [ errorMessage, setErrorMessage ] = useState('');

  // submit時に呼び出される
  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    // 現地時間でISOフォーマット
    const dateString = moment().format('YYYY-MM-DD');
    // postIdを自動生成する
  const postId = `${nanoid()}${Date.now()}`

    try {

      const newPost: Post = {
        id: postId,
        title: title,
        description: description,
        body: body,
        createdAt: createdAt === '' ? dateString : createdAt,
        publishedAt: isChecked ? dateString : '',
        updatedAt: '',
        numberOf: {
          nice: 0,
          hard: 0,
        },
        user: {
          id: authUser?.id as string,
          displayName: authUser?.displayName as string,
          profileImageUrl: authUser?.profileImageUrl               
        }
      };
    
      await setPost( newPost )
  
      window.location.replace(`/users/${authUser?.id}`);

      }catch( error ){
      const err = error as Error;
      setErrorMessage(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-0">
        <div className="pb-6 mt-10">
          {/* date */}
          {/* <div className='flex items-center hidden'> */}
          <div className='flex items-center'>
            <label htmlFor='createdAt' className='block text-sm font-medium leading-6 text-gray-900'>
              作成日：
            </label>
            <input
              type='date'
              id='createdAt'
              name='createdAt'
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className='block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
          {/* title  */}
          <div className="clear-both mt-6">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              タイトル<strong className='text-red-600'>*</strong>
            </label>
            <div className="">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="title"
                className="w-72 max-w-2xl block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          {/* body  */}
          <div className="clear-both mt-6">
            <div className='flex'>
              <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900">
                コンテンツ
              </label>
              <div
                onClick={() => {
                  window.open('/markdown-cheat-sheet.html',
                    '_blank',
                    'width=512, height=512'
                  )
                }}
                className='relative text-xs text-gray-700 m-auto cursor-pointer rounded-md bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
              >
                マークダウン記法&nbsp;<span>-&gt;</span>
              </div>
            </div>
            <textarea
              id="body"
              name="body"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="float-left w-72 max-w-2xl block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className='float-left w-80'>
              <MarkdownPreview contents={body} />
            </div>
          </div>
          {/* description  */}
          <div className="clear-both">
            <div className='flex pt-6'>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                サマリー
              </label>
              <div
                onClick={() => {
                }}
                className='relative text-xs text-gray-700 m-auto cursor-pointer rounded-md bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
              >
                ドラフト作成
              </div>
            </div>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="float-left w-72 max-w-2xl block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className='float-left w-80'>
              <MarkdownPreview contents={description} />
            </div>
          </div>
        </div>
        <p className="clear-both text-red-600 text-sm font-semibold">
          {errorMessage}
        </p>
      </div>

      <div className='flex items-center justify-between'>
        <div className=''>
        <input
          type='checkbox'
          id='publish'
          name='publish'
          className=''
          onChange={(e) => setIsChacked(e.target.checked)}
        />
        <label htmlFor='publish' className='text-sm font-medium leading-6 text-gray-900'>
          投稿します
        </label>
        </div>
        <div className="">
          <button
            type="submit"
            className="rounded-md bg-indigo-400 px-3 py-2 text-sm   font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isChecked ? '投稿' : '下書き'}
          </button>
        </div>
      </div>
    </form>
  )
}