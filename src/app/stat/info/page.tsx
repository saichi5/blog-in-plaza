import Header from '@/components/organisms/header'
import { AuthUserProvider } from "@/components/auth-user-context";
import Image from "next/image"

export default function Page() {
  const currentPath = '/stat/info';

  return (
    <main>
      <AuthUserProvider>
        <Header currentPath={currentPath} />
      </AuthUserProvider>
      <div className='text-4xl font-semibold p-3 m-6'>
        Under construction
      </div>
      <p className='p-3 m-6'>
        作成中です。もうしばらくお待ちください。
      </p>
      <Image
        alt="" height={200} width={300}
        className="p-3 m-6"
        src='/assets/img/construction.png'
      />
    </main>
  )
}