'use client'

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function FloatingCancelButton(){
  const searchParams = useSearchParams();
  const backPath = searchParams && searchParams.get('back');
  
  return (
  <>
    <div className="fixed z-50 top-10 right-10 border-0
        h-9 w-9 p-0 bg-transparent
        rounded-full cursor-pointer shadow-lg"
        onClick={() => {window.location.replace(backPath ?? '/')}}
    >
      <Image height={0} width={0} 
        src='/assets/img/cross_icon.png' alt=''
        className='h-10 w-10'
      />
    </div>
  </>
  )
}
