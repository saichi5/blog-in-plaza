import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse) {
    const { passId } = request.query;

    if (request.method === 'GET'){
      try{
        const password = await kv.hget<string>(`pass:${passId}`, 'password')
        response.json(password)
        } catch {
          response.json(null)
      }
    }

    if (request.method === 'PUT'){
      const pass = request.body
      try {
        await kv.hmset(`pass:${passId}`, pass)
        response.end(`PUT: ${passId}`)
        } catch {
          response.errored
      }
    }
}
