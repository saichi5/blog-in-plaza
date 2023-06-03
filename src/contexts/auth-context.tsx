"use client"

import { useContext, createContext } from 'react'
import { getSigninUser } from '@/utils/signin'
import type { User } from '@/data'

type AuthContextType = {
  authUser?: User;
}

const AuthContext = createContext<AuthContextType>({
  authUser: undefined,
})

export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext)

type AuthContextProviderProps = {
  authUser: User | undefined
}

/**
 * 認証コンテキストプロバイダー
 * 
 */
export const AuthContextProvider = ({
  children
  }: React.PropsWithChildren<AuthContextProviderProps>) => {
  // クッキーからusernameとpasswordを取り出す。
  const username = undefined;
  const password = undefined;

  var user:User | undefined = undefined;
  if ( username && password ) {
    // サインイン
    getSigninUser(username, password).then(
      (u) => {user = u}
    );
  }

  return (
    <AuthContext.Provider value={{ authUser: user }}>
      {children}
    </AuthContext.Provider>
  )
}
