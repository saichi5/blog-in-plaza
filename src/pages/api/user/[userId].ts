import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User} from '@/data';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse) {

    const { userId } = req.query;

    if (req.method === 'GET'){
      const allUsers: User[] = JSON.parse(fs.readFileSync('./personal/users.json', "utf-8"));

      const user = allUsers.find((u) => {
        return userId === u.id;
      });
      res.status(200).json(user);
    }

    if (req.method === 'POST'){
      res.end('POST: ' + userId);

    }

    if (req.method === 'PUT'){
      res.end('PUT: ' + userId);
    }

    if (req.method === 'DELETE'){
      res.end('DELETE: ' + userId);
    }
}
