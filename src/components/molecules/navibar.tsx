'use client'

import Link from 'next/link'

/**
 * ナビゲーション
 */
export default function Navibar ({ backPath }: { backPath: string }){
  const back = 'back=' + backPath; 

  return (
    <nav className="ml-auto text-sm font-medium space-x-6">
      <Link href="/">広場</Link>
      <Link href={"/signin?" + back}>サインイン</Link>
      <Link href="/pages/about">説明</Link>
      <Link href="/pages/notice">注意事項</Link>
      <button onClick={() => {}}>サインアウト</button>
    </nav>
  )
}
