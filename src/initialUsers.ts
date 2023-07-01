import type { User } from "@/data";

const taketo: User = {
  id:"u1",
  displayName:"Taketo Yoshida",
  email:"taketo@example.com",
  profileImageUrl:"/assets/pictures/u1.png",
  coverImageUrl:"/assets/pictures/c1.jpg",
  description:"ようこそ、どんぐりトトロの山散歩へ　♪♪ 　このブログでは主に脊振山地の山野草と、現在では双石山周辺の山野草と花風景を紹介しています。普段着の山歩きで出会った普段着の写真ですが、脊振山系と双石山の自然の美しさと豊かさが伝われば幸いです。※平成31年4月27日に佐賀市から宮崎市に引っ越したので、現在は宮崎市の双石山（ぼろいしやま）周辺をホームグランドにして宝物探しの山散歩をしています。そして65歳からロードバイク、最近では山用にクロスバイクも始めました。",
  createdAt:"2023-06-08",
  updatedAt:"2023-06-15"
}

const takuya: User = {
  id:"u2",
  displayName:"Takuya Tejima",
  email:"takuya@example.com",
  profileImageUrl:"/assets/pictures/u2.png",
  coverImageUrl:"/assets/pictures/c2.jpg",
  description:"韓国語の作文練習のためにmemoブログ始めたのにtwitterにはまってしばらく留守にしてました また続けるかは不明",
  createdAt:"2023-06-08",
  updatedAt:"2023-06-14"
}

const kourin: User = {
  id:"u3",
  displayName:"Yoshiki Takabayashi",
  email:"kourin@example.com",
  profileImageUrl:"/assets/pictures/u3.png",
  coverImageUrl:"/assets/pictures/c3.jpg",
  description:"memoブログはじめました。・・・・・・・・・・ 『空の風景』を あいうえお作文で・・・・・・・・ 楽しんでいけたらと思います。・・・・・・・・✈️",
  createdAt:"2023-06-14",
  updatedAt:null
}

const jaro: User = {
  id:"u4",
  displayName:"じゃろ",
  email:"jaro@example.com",
  profileImageUrl:"/assets/pictures/u4.jpg",
  coverImageUrl:"/assets/pictures/c4.jpg",
  description:"AI時代を楽しむために、機械学習の勉強を始めました。一緒に勉強してくれる方を募集します。",
  createdAt:"2023-06-08",
  updatedAt:null
}

const nico: User = {
  id:"nico",
  displayName:"ニコ",
  email:"nico@example.com",
  profileImageUrl:"/assets/pictures/u1.png",
  coverImageUrl:"/assets/pictures/c1.jpg",
  description:"AI時代を楽しむために、機械学習の勉強を始めました。一緒に勉強してくれる方を募集します。",
  createdAt:"2023-07-01",
  updatedAt:null
}

export const initialUsers: User[] = [ taketo, takuya, kourin, jaro, nico ]
