import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '@/data'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse) {

    const { userId } = request.query

    if (request.method === 'GET'){

      try {
        const pipeline = kv.pipeline()
        const posts: string[] = await kv.zrange(`user:post:${userId}`, 0, -1, {
            rev: true   // dec order
        })

        for (const post of posts) {
          pipeline.hgetall<Post>(post)
        }
      
        const results = await pipeline.exec()
  
        response.json( results as Post[] )
    
      } catch (error) {
        response.json([])
      }
    }

    if (request.method === 'DELETE'){
      
      try {
        const posts: string[] = await kv.zrange(`user:post:${userId}`, 0, -1)

        if (!posts.length) { 
          response.json({done: true})
        } else {
          const pipeline = kv.pipeline()
      
          for (const post of posts) {
            pipeline.del(post)
            pipeline.zrem(`user:post:${userId}`, post)
            pipeline.zrem(`posts`, post)
          }
        
          await pipeline.exec()
          
          response.json({done: true});
        }

        } catch {
        response.errored
      }
    }
}
