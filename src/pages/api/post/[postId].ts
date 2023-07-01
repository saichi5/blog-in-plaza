import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '@/data';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse) {
    
    const { postId } = request.query

    if (request.method === 'GET'){

      try {
        const post = await kv.hgetall<Post>(`post:${postId}`)

        if (!post) {
          response.json(null)
        } else {
          response.json(post)
        }    
        } catch (error) {
          response.errored
      }
    }

    if (request.method === 'POST' || request.method === 'PUT'){
      const post: Post = request.body
      const updatedAt = Date.now()
      
      try {
        await kv.hmset(`post:${postId}`, post)
        await kv.zadd(`posts`, {
          score: updatedAt,
          member: `post:${postId}`
        })
        await kv.zadd(`user:post:${post.user.id}`, {
          score: updatedAt,
          member: `post:${postId}`
        })
    
      } catch (error) {
        throw new Error()
      }
      response.end()
    }

    if (request.method === 'DELETE'){
      
      try {
        const post: Post | null = await kv.hgetall(`post:${postId}`)
        if (!post || post.id !== postId) { 
          response.end()
        } else {

          const postKey = `post:${postId}`
          kv.del(postKey)
          kv.zrem(`user:post:${post.user.id}`, postKey)
          kv.zrem(`posts`, postKey)
        
          response.end(`DELETE: ${postId}`);
        }

        } catch {
        response.errored
      }
    }

  }