import type { User } from '../../data';
import fs from 'fs';

export default function handler(req: Request) {
  if (req.method === 'GET'){
    const users: User[] = JSON.parse(fs.readFileSync('./personal/users.json', "utf-8"));
    //res.status(200).json(users)
    return new Response(
      JSON.stringify(users),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  }
}
