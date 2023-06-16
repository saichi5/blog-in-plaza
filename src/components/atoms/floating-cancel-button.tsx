'use client'

import { useSearchParams } from "next/navigation";

export default function FloatingCancelButton(){
  const searchParams = useSearchParams();
  const backPath = searchParams && searchParams.get('back');
  
  return (
  <>
      <button onClick={() => {window.location.replace(backPath ?? '/')}}>
        <div className="fixed z-50 top-10 right-10 text-gray-400
            rounded-full cursor-pointer shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </button>
  </>
  )
}
