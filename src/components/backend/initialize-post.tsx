'use client'

import { type FormEvent } from 'react';
import type { Post } from '@/data';
import { setPost } from '@/lib/database-functions'
import { p20230302, p2023030201, p20230701 } from '@/jaro-posts';
import { p20230601u1 } from '@/taketo-posts';
import { p20230702u2, p20230703u2 } from '@/takuya';
import { p20230704u3 } from '@/kourin';

export default function DummyPost  (){
  const posts: Post[] = [p20230704u3, p20230703u2, p20230302, p2023030201, p20230701, p20230601u1, p20230702u2]

  // submit時に呼び出される
  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
  
      for (const post of posts) {
        await setPost( post )
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
          Post a dummy post
        </button>
      </div>
    </form>
    </div>
  )
}