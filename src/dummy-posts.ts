import type { Post } from "./data";
import { initialUsers } from "./initialUsers";

const [taketo, takuya, kourin, jaro, nico ] = initialUsers

const dummyPost: Post = {
  id: "p101",
  title: "dummy",
  description: "ブログ始めます。",
  body: "",
  createdAt: "2023-06-30",
  updatedAt: "",
  publishedAt: "",
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


const dummyPost2: Post = {
  id: "p102",
  title: "dummy2",
  description: "ブログ始めます。",
  body: "",
  createdAt: "2023-07-01",
  updatedAt: "",
  publishedAt: "",
  numberOf: {
    nice: 0,
    hard: 0
  },
  user: {
    id: nico.id,
    displayName: nico.displayName,
    profileImageUrl: nico.profileImageUrl
  }
}

export const dummyPosts = [ dummyPost, dummyPost2 ]
