'use client'

import { getUser } from '@/utils/data-fetch'
import type { User } from '@/data'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from "react";
import FloatingActionButton from "@/components/atoms/floating-action-button";
import Navibar2 from "@/components/molecules/navibar2";

/**
 * ヘッダー
 */
export default function Header ({ currentPath }: { currentPath: string }){
  const [ data, setData ] = useState<User | undefined>(undefined);

  useEffect(() => {
    const userId = getCookie('bipId') as string;

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
        <Navibar2 currentPath={currentPath} authUser={data} />
        <FloatingActionButton authUser={data} />
      </header>
    </>
  );
}
