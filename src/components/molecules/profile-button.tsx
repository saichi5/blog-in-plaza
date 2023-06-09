'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import type { User } from '@/data'
import Image from 'next/image'
import Link from "next/link";
import { deleteCookie } from 'cookies-next';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileButton({authUser}: {authUser: User}) {

  return (
    <>
    {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <Image
              height={0} width={0}
              className="h-8 w-8 rounded-full"
                src={authUser.profileImageUrl}
                alt=""
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  プロフィールの編集
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/pages/about"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  利用方法
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/pages/aws-amplify"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  マークダウン記法
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  onClick={() => {
                        deleteCookie('bipId');
                        window.location.reload();
                      }}
                >
                  サインアウト
                </button>
                
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}