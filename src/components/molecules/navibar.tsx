'use client'

import Link from 'next/link'
import { deleteCookie } from 'cookies-next';
import type { User } from '@/data';

/**
 * ナビゲーション
 */
export default function Navibar ( props: { 
    currentPath: string;
    authUser: User | undefined;
  }){
  const { currentPath, authUser } = props;

  const back = 'back=' + currentPath;

  let authUserContent;

  if ( !authUser ){
    authUserContent = (
      <Link href={"/signin?" + back}>サインイン</Link>
    )
  } else {
    authUserContent = (
      <Link href={"/" + authUser.id}>Myブログ</Link>
    )
  }
  return (
    <nav className="ml-auto text-sm font-medium space-x-6">
      <Link href="/">みんなの広場</Link>
      { authUserContent }
      <Link href="/pages/about">説明</Link>
      <Link href="/pages/notice">注意事項</Link>
      <button onClick={() => {
        deleteCookie('bipId');
        window.location.reload();
      }}>サインアウト</button>
    </nav>
  )
}
