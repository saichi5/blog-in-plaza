'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from "next/link";
import Image from 'next/image';
import { setPost, clearPost } from '@/lib/database-functions';
import type { Post } from '@/data';
import moment from 'moment';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function EditButton(props:{post: Post}) {
  const post = props.post;

  const publishHandler = async () => {
    try {
      // 現地時間でISOフォーマット
      post.publishedAt = moment().format('YYYY-MM-DD')
      await setPost(post)
      window.location.replace(`/users/${post?.user.id}`);

    } catch(error) {
      console.error(error)
    }
  }

  const deleteHandler = async () => {
    try {
      await clearPost(post.id)
      window.location.replace(`/users/${post?.user.id}`);
    } catch(error) {
      console.error(error)
    }
  }


  return (
    <>
    {/* editor's dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex rounded-full h-10 w-10 text-xs focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 focus:ring-offset-gray-200">
            <span className="sr-only">Open editing menu</span>
            <Image
              height={0} width={0} alt=''
              src='/assets/img/dot_icon.png'
              className='h-8 w-8 m-1 p-0'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-16 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {!(post.publishedAt) && 
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => publishHandler()}
                    className={classNames(active ? 'bg-indigo-400 text-white' : '', 'block px-4 py-2 text-sm text-gray-700 w-full')}
                  >
                    投稿
                  </button>
                )}
              </Menu.Item>
            }
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/editor/update/${post.id}`}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-center')}
                >
                  編集
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => deleteHandler()}
                  className={classNames(active ? 'bg-red-500 text-white' : '', 'block px-4 py-2 text-sm text-gray-700 w-full')}
                >
                  削除
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}