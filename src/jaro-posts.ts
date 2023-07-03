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
  title: "remark-gfm",
  description: "表示例",
  body: "# GFM\n## Autolink literals\n\nwww.example.com, https://example.com, and contact@example.com.\n\n## Footnote\n\nA note[^1]\n\n[^1]: Big note.\n\n## Strikethrough\n\n~one~ or ~~two~~ tildes.\n\n## Table\n\n| a | b  |  c |  d  |\n\n| - | :- | -: | :-: |\n\n## Tasklist\n\n* [ ] to do\n\n* [x] done",
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
