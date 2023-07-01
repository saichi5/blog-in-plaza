'use client'

import { useUser } from "@/components/user-context";
import Link from "next/link";

export default function FloatingActionButton(){
  const user = useUser();
return (
  <>
    { user ? 
      <Link href="/" passHref>
        <div className="fixed z-50 bottom-10 right-10 py-5 px-2 border-2 
            bg-orange-400 rounded-full cursor-pointer shadow-lg">
          Create
        </div>
      </Link>
      :
      <Link href="/signup" passHref>
        <div className="fixed z-50 bottom-10 right-10 py-5 px-2 text-white border-2 
          bg-green-400 rounded-full cursor-pointer shadow-lg">
          Sign up
        </div>
      </Link>
    }
  </>
)}