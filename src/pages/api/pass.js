import fs from 'fs';

export default function handler(
  req,
  res) {

  const pass = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', "utf-8"));
  return res.status(200).json(pass)
}