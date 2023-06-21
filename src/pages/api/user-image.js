import fs from 'fs'
import { promisify } from 'util'
import formidable from 'formidable'

// 何故か必要
export const config = {
  api: {
    bodyParser: false,
  },
};
const writeFile = promisify(fs.writeFile)

export default function handler(req, res) {
  if (req.method === 'POST'){
    const form = formidable({maxFileSize: 10 * 1024 * 1024});
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).send(err)

      if (fields.oldFilename){
        fs.unlink('./public/' + fields.oldFilename,
        (e) => {if(e) throw e})
      }
      const imageFile = files.images[0]
      // 保存するファイル名を自動生成する
      const fileName = `${Date.now()}-${imageFile.originalFilename}`
      try {
        // ファイルを保存する
        writeFile(`./public/pictures/users/${fileName}`, fs.readFileSync(imageFile.filepath))
        // 保存したファイル名をレスポンスとして返す
        const url = "/pictures/users/" + fileName;
        res.status(200).json({ url: url })
      } catch (e) {
        console.error(e)
        res.status(500).send('Failed to save user image file.')
      }
    });
  }
}