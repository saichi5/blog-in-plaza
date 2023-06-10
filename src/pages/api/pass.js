import fs from 'fs';

export default function handler( req, res) {
  if (req.method === 'GET'){
    const pass = JSON.parse(fs.readFileSync('./personal/pass.json', "utf-8"));
    res.status(200).json(pass)
  }
}