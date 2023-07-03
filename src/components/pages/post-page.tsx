'use client'

import { format, parseISO } from 'date-fns';
import { getPost } from "@/lib/database-functions";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect } from 'react';
import type { Post } from '@/data';

export default function Post(props: { postId: string }) {
  const postId = props.postId
  const [ post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setPost( await getPost(postId) )
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }
  , [postId])

  return (
      <article className="py-6 prose dark:prose-invert">
       <h1>{post && post.title}</h1>
       {post && post.createdAt && 
       <time dateTime={post.createdAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
          作成日 { format(parseISO(post.createdAt), 'LLLL d, yyyy')}
       </time>
       }
       {post && post.updatedAt && 
       <time dateTime={post.updatedAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
          更新日 {format(parseISO(post.updatedAt), 'LLLL d, yyyy')}
       </time>
       }
       <p>
         {post && post.description && <p className="text-xl">{post.description}</p>}
       </p>
       <hr />
       {post &&
       <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.body}
       </ReactMarkdown>
       }
      </article>
  )
}
