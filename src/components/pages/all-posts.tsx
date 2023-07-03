'use client'

import PostCard from "@/components/organisms/post-card";
import { getPosts } from '@/lib/database-functions';
import { useEffect, useState } from "react";
import type { Post } from "@/data";

export default function HomePosts() {
  const [ posts, setPosts ] = useState<Post[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setPosts( await getPosts() )
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }
  , [])

  return (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-1 pb-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length ? posts.map((post) => <PostCard key={post.id} post={post} /> )
          : (<div></div>)}
        </div>
  )
}
