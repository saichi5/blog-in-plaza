import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse) {

  const users = JSON.parse(fs.readFileSync('./personal/users.json', "utf-8"));
  return res.status(200).json(users)
}
