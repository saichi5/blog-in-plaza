'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/data';
import { getCookie } from 'cookies-next';
import { getUser } from '@/lib/database-functions';

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: {children: React.ReactNode}) {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const userId = getCookie('bipId') as string;

    async function fetchData() {
      try {
        // Call your asynchronous function here
        const user = await getUser(userId);

        // Once the response is received, update the state
        setData(user);
      } catch (error) {
        // Handle any errors that occur during the async operation
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once


  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
