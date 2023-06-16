import fs from 'fs';

export default function handler(
  req,
  res) {

    const { pasId } = req.query;

    if (req.method === 'GET'){
      const allPass = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', "utf-8"));

      const pas = allPass.find((p) => {
        return pasId === p.id;
      });
      res.status(200).json(pas);
    }
    if (req.method === 'PUT'){
      const allPass = JSON.parse(fs.readFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', "utf-8"));
      const pas = req.body;
      const ids = allPass.map((p) => p.id);
      allPass.splice(ids.indexOf(pasId), 1, pas);
      fs.writeFileSync(process.env.NEXT_PUBLIC_USERS_PATH + '/pass.json', JSON.stringify(allPass));
      res.end('PUT: ' + pas.id);
    }
}
