'use client'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ProfileButton from '@/components/molecules/profile-button'
import { ModeToggle } from '@/components/atoms/mode-toggle'
import Link from "next/link";
import { useUser } from '@/components/user-context'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Navibar2( props: { 
    currentPath: string;
  }) {
  const { currentPath } = props;

  const authUser = useUser();

  const navigation = [
    { name: 'みんなの広場', href: '/', current: false },
    { name: 'Myブログ', href: '/users/' + authUser?.id, current: false },
    { name: 'フォロー', href: '/pages/followers', current: false },
    { name: 'お知らせ', href: '/pages/information', current: false },
  ]
  if (!authUser){
    navigation.splice(1, 2);
  }

  navigation.map((v) => { v.current = v.href === currentPath ? true : false })
  
  const back = '?back=' + currentPath;

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-400 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ModeToggle />
                <button
                  type="button"
                  className="rounded-full p-1 text-gray-600 hover:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {
                  !authUser ? 
                    (
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-600 hover:text-gray-400
                        cursor-pointer dark:border-gray-400 dark:border-2 shadow-lg dark:shadow-none dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <Link href={"/signin" + back} className='px-4 py-2'>Sign in</Link>
                      </button>
                    ):(
                    <ProfileButton currentPath={currentPath} />
                    )
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-400 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
