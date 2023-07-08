'use client'

import { type FormEvent } from 'react';
import type { Pass, User } from '@/data';
import { setUserWithPass } from '@/lib/database-functions'
import { initialUsers } from '@/initialUsers';

export default function InitializeUsers (){
  const users: User[] = initialUsers

  const pass: Pass = {password: 'plaza'}

  // submit時に呼び出される
  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
  
      for (const user of users) {
        await setUserWithPass( user, pass )
      } 
  
    }catch( error ){
      console.log(error)
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="mt-0 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Initialize Users
        </button>
      </div>
    </form>
    </div>
  )
}