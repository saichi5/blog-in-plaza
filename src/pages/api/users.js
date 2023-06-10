import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'GET'){
    const users = JSON.parse(fs.readFileSync('./personal/users.json', "utf-8"));
    res.status(200).json(users)
  }
}
