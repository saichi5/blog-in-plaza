import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '../../data';
import fs from 'fs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  if (req.method === 'GET'){
    const users: User[] = JSON.parse(fs.readFileSync('./personal/users.json', "utf-8"));
    res.status(200).json(users)
  }
}
