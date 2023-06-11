import fs from 'fs';

export default function handler(
  req,
  res) {

    const { userId } = req.query;

    if (req.method === 'GET'){
      const allUsers = JSON.parse(fs.readFileSync(process.env.USERS_PATH + '/users.json', "utf-8"));

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
