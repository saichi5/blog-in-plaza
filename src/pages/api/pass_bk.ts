import type { NextApiRequest, NextApiResponse } from 'next'
import type { Pass } from '../../data';
import fs from 'fs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pass[]>
) {
  if (req.method === 'GET'){
    const pass: Pass[] = JSON.parse(fs.readFileSync('./personal/pass.json', "utf-8"));
    res.status(200).json(pass)
  }
}