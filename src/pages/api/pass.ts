import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse) {

  const pass = JSON.parse(fs.readFileSync('./personal/pass.json', "utf-8"));
  return res.status(200).json(pass)
}