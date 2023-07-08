import type { Post } from "./data";
import { initialUsers } from "./initialUsers";

const [taketo, takuya, kourin, jaro, nico ] = initialUsers

export const p20230302: Post = {
  id: "p20230302",
  title: "memoブログをはじめました。",
  description: "",
  body: "よろしくお願いします。<(_ _)>\nとりあえず、先月家にやってきたサンタを紹介します。友人が拾った子猫をもらい受けることにしました。今はおよそ６ヶ月で元気に育っていますが、拾われた当初はガリガリに痩せていたそうです。\nサンタ！よろしくね。(*´ε`*)ﾁｭｯﾁｭ\n![](/assets/pictures/サンタ20230302.jpg)",
  createdAt: "2023-03-02",
  updatedAt: "",
  publishedAt: "2023-03-02",
  numberOf: {
    nice: 0,
    hard: 0
  },
  user: {
    id: jaro.id,
    displayName: jaro.displayName,
    profileImageUrl: jaro.profileImageUrl
  }
}

export const p2023030201: Post = {
  id: "p20230302-1",
  title: "ヘッダー画像をStable Diffusion で作った。",
  description: "",
  body: "マイページのヘッダー画像を画像生成AIのStable Diffusionで作ってみました。Deep Learning をイメージした絵をリクエストしたのですが、どうでしょうか？\n\n![](/assets/pictures/ダウンロード.jfif)ちなみに入力した呪文は以下のとおりです。\n\nPicture on my blog title screen. This blog is based on Deep Learning.\n\nニューラルネットのイメージから来たのだと思います。\n\nしばらくはこの画像で我慢してください。\n\n([Stable Diffusion](https://huggingface.co/spaces/stabilityai/stable-diffusion))",
  createdAt: "2023-03-02",
  updatedAt: "",
  publishedAt: "2023-03-02",
  numberOf: {
    nice: 0,
    hard: 0
  },
  user: {
    id: jaro.id,
    displayName: jaro.displayName,
    profileImageUrl: jaro.profileImageUrl
  }
}

export const p20230701: Post = {
  id: "p20230701",
  title: "マークダウン表示例",
  description: "チートシートと実際の表示が一致しているか",
  body: "## １．見出し\n\n# 見出し１\n## 見出し２\n### 見出し３\n#### 見出し４\n##### 見出し５\n###### 見出し６\n\n## ２．段落\n空白行を入れることで、段落となります。\n\n空白行を入れる前\n\nドッグランのご利用は、マナーを守って\n皆様が気持ちよく利用できるようご協力を．．．\n\n空白行を入れた後\n\nドッグランのご利用は、マナーを守って\n\n皆様が気持ちよく利用できるようご協力を．．．\n\n## ３．改行\n\n文章の最後に半角スペースを２つ以上入力することで改行されます。\n\n半角スペースを入れる前\n\nドッグランのご利用は、マナーを守って\n皆様が気持ちよく利用できるようご協力を．．．\n\n半角スペースを入れた後\n\nドッグランのご利用は、マナーを守って  \n皆様が気持ちよく利用できるようご協力を．．．\n\n## ４．文字の装飾(イタリック、太文字、取り消し線)\n\n*アスタリスク１個でイタリック*\n\n**アスタリスク２個で太文字**\n\n~~波線２個で取り消し線~~\n\n## ５．リンク\n\n[ヤフージャパン](https://www.yahoo.co.jp/)\n\n## ６．画像の埋め込み、ファイルの挿入\n\n![じゃろ](https://blog-in-plaza-rho.vercel.app/assets/pictures/u4.jpg)\n\n## ７．水平線\n\n---\n___\n***\n\n## ８．引用\n\n>これは引用文です。\n\n## ９．リスト\n\n箇条書きリスト：\n\n* 項目\n* 項目\n* 項目\n\n番号付きリスト：\n\n1. 項目\n1. 項目\n1. 項目\n\nチェックリスト：\n\n* [ ] 項目\n* [x] 項目\n* [ ] 項目\n\n## １０．文字色の変更\n\nMarkdown記法では、テキストカラーの変更は対応していないため、文字色を変えるためには、直接HTMLタグを記述する必要があります。\n\n夕焼け空が<span style='color:red'>赤い</span>のは、太陽が遠ざかり、波長の短い<span style='color:blue'>青</span>が散乱するから\n\n## １１．中央揃え\n\n文を中央に配置することができます。\n\n<center>中央揃え</center>\n\n## １２．コードの挿入\n\nコードのような等間隔文字を挿入できます。\n\n```TypeScript:function.ts\n# コード\nimport type { Post } from '@/data'\n\nexport default function (params){\n\tconst id = params.id;\n\treturn (something);\n}\n```\n",
  createdAt: "2023-07-01",
  updatedAt: "",
  publishedAt: "2023-07-01",
  numberOf: {
    nice: 0,
    hard: 0
  },
  user: {
    id: jaro.id,
    displayName: jaro.displayName,
    profileImageUrl: jaro.profileImageUrl
  }
}

/*
# １０．文字色の変更\n\nMarkdown記法では、テキストカラーの変更は対応していないため、文字色を変えるためには、直接HTMLタグを記述する必要があります。\n\n夕焼け空が\n\`\`\`\n<span style="color:red">赤い</span>\n\`\`\`\nのは、太陽が遠ざかり、波長の短い\n\`\`\`\n<span style="color:blue">青</span>\n\`\`\`\nが散乱するから\n\n# １１．中央揃え\n\n文を中央に配置することができます。\n\n\`\`\`\n<span style="text-align: center;">中央揃え</span>\n\`\`\`\n
*/