import fs from 'fs';

export default function handler(
  req,
  res) {

    const { userId } = req.query;

    if (req.method === 'GET'){
      const allUsers = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/users.json', "utf-8"));

      const user = allUsers.find((u) => {
        return userId === u.id;
      });
      res.status(200).json(user);
    }

    if (req.method === 'POST'){
      const allUsers = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/users.json', "utf-8"));
      const allPass = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', "utf-8"));
      const userWithPass = req.body;
      const [user, pass] = Object.entries(userWithPass);
      allUsers.push(user[1]);
      allPass.push(pass[1]);
      fs.writeFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/users.json', JSON.stringify(allUsers));
      fs.writeFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', JSON.stringify(allPass));
      res.end('POST: ' + user[1].id);
    }

    if (req.method === 'PUT'){
      const allUsers = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/users.json', "utf-8"));
      const user = req.body;
      const ids = allUsers.map((u) => u.id);
      allUsers.splice(ids.indexOf(userId), 1, user);
      fs.writeFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/users.json', JSON.stringify(allUsers));
      res.end('PUT: ' + user.id);
    }

    if (req.method === 'DELETE'){
      const allUsers = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/users.json', "utf-8"));
      const allPass = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', "utf-8"));
      const userIds = allUsers.map((u) => u.id);
      const passIds = allUsers.map((u) => u.id);
      allUsers.splice(userIds.indexOf(userId), 1);
      allPass.splice(passIds.indexOf(userId), 1);
      fs.writeFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/users.json', JSON.stringify(allUsers));
      fs.writeFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', JSON.stringify(allPass));
      res.end('DELETE: ' + userId);
    }
}
