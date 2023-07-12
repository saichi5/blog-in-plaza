'use client'

import { useAuthUser } from "@/components/auth-user-context";
import Link from "next/link";
import Image from "next/image";

export default function FloatingActionButton(){
  const user = useAuthUser();
return (
  <>
    { user ? 
      <Link href='/editor/create' passHref>
        <div className="fixed z-50 bottom-10 right-10 border-2 
            h-18 w-18 p-3
            bg-transparent rounded-full cursor-pointer shadow-lg">
          <Image
            height={0} width={0}
            className="h-10 w-10"
            src='/assets/img/pencil_write_icon.png'
            alt=""
            />
        </div>
      </Link>
      :
      <Link href="/entrance/signup" passHref>
        <div className="fixed z-50 bottom-10 right-10 py-5 px-2 text-white border-2 
          h-18 w-18 text-sm font-semibold
          bg-green-400 rounded-full cursor-pointer shadow-lg">
          Sign up
        </div>
      </Link>
    }
  </>
)}