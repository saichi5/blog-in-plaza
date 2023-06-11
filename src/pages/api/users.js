import fs from 'fs';

export default function handler(
  req,
  res) {

  const users = JSON.parse(fs.readFileSync(process.env.USERS_PATH + '/users.json', "utf-8"));
  return res.status(200).json(users)
}
