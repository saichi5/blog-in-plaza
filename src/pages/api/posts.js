import fs from 'fs';

export default function handler(
  req,
  res) {

    if (req.method === 'POST'){

      const deletePostIds = req.body;
      
      fs.readdir(process.env.NEXT_PUBLIC_CONTENT_PATH + '/posts',
        (error, files) => {
          if (error) throw error;
          files.forEach(f => {
            if (deletePostIds.indexOf(f.slice(1, f.indexOf('-')).trim()) !== -1){
              fs.unlink(process.env.NEXT_PUBLIC_CONTENT_PATH + '/posts/' + f,
              (err) => {if(err) throw err})
            };
          });
      });
      
      res.end('DELETE: ' + deletePostIds.toString());
    }
}
