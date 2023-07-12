'use client'

import { format, parseISO } from 'date-fns';
import { getPost, checkNice, checkHard, changeNice, changeHard } from "@/lib/database-functions";
import { useState, useEffect } from 'react';
import type { Post } from '@/data';
import MarkdownViewer from '../atoms/markdown-viewer';
import { useAuthUser } from '../auth-user-context';
import EditButton from '../molecules/edit-button';
import Image from 'next/image';

export default function Post(props: { postId: string }) {
  const postId = props.postId
  const userId = useAuthUser()?.id

  const [ post, setPost] = useState<Post | null>(null)
  const [ nice, setNice ] = useState<Boolean>(false)
  const [ hard, setHard ] = useState<Boolean>(false)

  useEffect(() => {
    async function fecthData(){
      try {
        setPost( await getPost(postId) )
        setNice( await checkNice(userId as string, postId) )
        setHard( await checkHard(userId as string, postId) )
      } catch (error) {
        console.error(error)
      }
    }
    fecthData()
  }
  , [postId, userId])

  const niceHandler = async () => {
    if (!userId) {return}
    try {
      await changeNice(userId, postId)
    } catch(error) {
      console.error(error)
    }
  }

  const hardHandler = async () => {
    if (!userId) {return}
    try {
      await changeHard(userId, postId)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="py-6 prose dark:prose-invert">
      {userId && (userId === post?.user.id) &&
        (
          <nav className='flex justify-end'>
            <EditButton post={post as Post} />
          </nav>
        )
      }
      <article className="">
        <h1>{post?.title}</h1>
        {post?.publishedAt ? 
          <time dateTime={post.publishedAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
            投稿日 { format(parseISO(post.publishedAt), 'LLLL d, yyyy')}
          </time>
        :
          <p className="mb-2 block text-lx font-extrabold text-gray-900 dark:text-gray-100">
            {post && '下書き中'}
          </p>
        }
        {post?.updatedAt && 
        <time dateTime={post.updatedAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
          更新日 {format(parseISO(post.updatedAt), 'LLLL d, yyyy')}
        </time>
        }
        {post?.description && 
          <p className="text-sm">
            <MarkdownViewer contents={post.description} />
          </p>
        }
        <hr />
        {post?.body && 
          <MarkdownViewer contents={post.body} />
        }
        <div className='flex justify-start items-center'>
          <div className="relative group">
            <span
              className={[
                "whitespace-nowrap",
                "rounded",
                "bg-transparent",
                "border-2",
                "text-xs",
                "px-2",
                "py-1",
                "text-gray-700",
                "absolute",
                "-top-0",
                "left-1/2",
                "-translate-x-1/2",
                "opacity-0",
                "group-hover:opacity-100",
                "transition",
                "pointer-events-none",
              ].join(" ")}
            >
              いいね
            </span>
            <div
              onClick={() => {
                setNice(!nice)
                niceHandler()
              }}
              className='cursor-pointer'
            >
                {nice ?
                  <Image alt='' height={0} width={0} 
                    src='/assets/img/heart_on_icon.png'
                    className='h-6 w-6'
                  />
                :
                  <Image alt='' height={0} width={0} 
                    src='/assets/img/heart_icon.png'
                    className='h-6 w-6'
                  />
                }
            </div>
          </div>
          <span>{post?.numberOf.nice}</span>
          <div className="relative group ml-6">
          <span
              className={[
                "whitespace-nowrap",
                "rounded",
                "bg-transparent",
                "border-2",
                "text-xs",
                "px-2",
                "py-1",
                "text-gray-700",
                "absolute",
                "-top-0",
                "left-8",
                "-translate-x-1/2",
                "opacity-0",
                "group-hover:opacity-100",
                "transition",
                "pointer-events-none",
              ].join(" ")}
            >
              大変だね
            </span>
            <div
              onClick={() => {
                setHard(!hard)
                hardHandler()
              }}
              className='cursor-pointer'
            >
              {hard ?
                  <Image alt='' height={0} width={0} 
                    src='/assets/img/favorite_star_on_icon.png'
                    className='h-6 w-6'
                  />
                :
                  <Image alt='' height={0} width={0} 
                    src='/assets/img/favorite_star_icon.png'
                    className='h-6 w-6'
                  />
                }
            </div>
          </div>
          <span>{post?.numberOf.hard}</span>
        </div>
      </article>
    </div>
  )
}
