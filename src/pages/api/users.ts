import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@/data'
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET'){
    try {
      const pipeline = kv.pipeline()
      const users: string[] = await kv.zrange(`users`, 0, -1, {
        rev: true   // dec order
      })
  
      if (!users.length){
        response.json([])
      } else {
        for (const user of users) {
          pipeline.hgetall<User>(user)
        }
    
        const results = await pipeline.exec()
    
        response.json( results as User[] )
        }
      
    } catch (error) {
      response.json([])
    }
  }
}