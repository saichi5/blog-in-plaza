'use client'

import { User } from "@/data"

export default function FloatingActionButton({ authUser }
  : { authUser: User | undefined }){
  
return (
  <>
    { authUser ? 
      <div className="fixed z-50 bottom-10 right-10 py-5 px-2 border-2 
          bg-orange-400 rounded-full cursor-pointer shadow-lg"
          onClick={() => { }} >
        Create
      </div>
      :
      <div className="fixed z-50 bottom-10 right-10 py-5 px-2 border-2 
          bg-green-400 rounded-full cursor-pointer shadow-lg"
          onClick={() => { }} >
        Sign up
      </div>
    }
  </>
)}