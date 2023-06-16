import type { Post } from "contentlayer/generated";

export const latestOrder = (a: Post, b: Post) => {
  const datea = a.updatedAt as string;
  const dateb = b.updatedAt as string;
  return (Date.parse(datea) - Date.parse(dateb)) * -1;
}
