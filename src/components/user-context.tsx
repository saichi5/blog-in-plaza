'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/data';
import { getCookie } from 'cookies-next';
import allUsers from 'public/personal/users.json' assert {type: 'json'}

const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: {children: React.ReactNode}) {
  const [data, setData] = useState<User | undefined>(undefined);

  useEffect(() => {
    const userId = getCookie('bipId') as string;
      const user = allUsers.find((u) => u.id === userId)
    setData(user);
  },[]);


  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
