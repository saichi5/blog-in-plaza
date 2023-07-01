'use client'

import { type FormEvent } from 'react';
import type { User } from '@/data';
import { deleteOldUser} from '@/lib/database-functions'
import { initialUsers } from '@/initialUsers';

export default function DeleteAllUsers (){
  const users: User[] = initialUsers

  // submit時に呼び出される
  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
  
      for (const user of users) {
        await deleteOldUser(user.id)
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
          Delete all Users and the posts
        </button>
      </div>
    </form>
    </div>
  )
}