'use client'

import { ModeToggle } from "@/components/mode-toggle"
import Navibar from '../molecules/navibar';
import { getUser } from '@/utils/data-fetch'
import type { User } from '@/data'
import { hasCookie, getCookie } from 'cookies-next'
import { useState, useEffect } from "react";

/**
 * ヘッダー
 */
export default function Header ({ currentPath }: { currentPath: string }){
  const [ data, setData ] = useState<User | undefined>(undefined);
  let id;

  if (hasCookie('bipId')){
    // クッキーからuserIdを取り出す。
    id = getCookie('bipId');
  }
  const userId = !id ? "" :id as string;

  useEffect(() => {
    async function fetchData(userId:string) {
      try {
        // Call your asynchronous function here
        const user = await getUser(userId);

        // Once the response is received, update the state
        setData(user);

      } catch (error) {
        // Handle any errors that occure during the async operation
        console.error('Error fetching user: ', error);
      }
    }

    fetchData(userId);
  },[]);    // The empty dependency array ensures the effect runs only once

  return (
    <>
      <header>
        <div className="flex items-center justify-between">
          <ModeToggle />
          <Navibar currentPath={currentPath} authUser={data} />
        </div>
      </header>
    </>
  );
}
