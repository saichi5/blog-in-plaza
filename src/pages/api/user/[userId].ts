import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'
import type { Pass, User } from '@/data'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {

    const { userId } = request.query;

    if (request.method === 'GET'){

      try {
        const user = await kv.hgetall<User>(`user:${userId}`)

        if (!user) {
          response.json(null)
        } else {
          response.json(user)
        }    
        } catch (error) {
          response.errored
      }
    }

    if (request.method === 'POST' || request.method === 'PUT' ){
       const userWithPass = Object.entries(request.body)
       const user = userWithPass[0][1]
       const pass = userWithPass[1][1]
       
      try {
        await kv.hmset(`user:${userId}`, user as User)
        await kv.zadd(`users`, {
          score: Date.now(),
          member: `user:${userId}`
        })

        if (pass){ await kv.hmset(`pass:${userId}`, pass as Pass)}
        response.end('POST/PUT: ' + userId)
      } catch (error) {
        console.log(`error: ${error}`)
        response.errored
      }
    }

    if (request.method === 'DELETE' ){

      const userKey = `user:${userId}`
      const passKey = `pass:${userId}`

     try {
      const uid = await kv.hget<string>(userKey, 'id')  // idが数字だとuidは数値になってしまう


      if (uid === userId) {

        await kv.del(userKey)
        await kv.zrem(`users`, userKey)
        await kv.del(passKey)
      }
      response.json({done:true})
    } catch {
       response.errored
     }
   }

  }
