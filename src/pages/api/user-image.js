import fs from 'fs'
import { promisify } from 'util'
import formidable from 'formidable'

const writeFile = promisify(fs.writeFile)

export default async (req, res) => {
  const form = new formidable.IncomingForm()
  // 画像ファイルはmultipart/form-data形式で送信するため、formプロパティに格納される。
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send(err)
    // FormDataで送信されたファイルの情報はpathプロパティに格納される。
    const { path } = files.image
    // 保存するファイル名を自動生成する
    const fileName = `${Date.now()}-${files.image.name}`
    try {
      // ファイルを保存する
      await writeFile(`./public/pictures/users/${fileName}`, fs.readFileSync(path))
      // 保存したファイル名をレスポンスとして返す
      res.status(200).json({ fileName })
    } catch (e) {
      console.error(e)
      res.status(500).send('Failed to save user image file.')
    }
  })
}