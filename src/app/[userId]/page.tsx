import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation"
import fs from 'fs';
import type { User } from '@/data'
import PostCard from "@/components/organisms/post-card";
import Header from "@/components/organisms/header";

interface UserRootPageProps {
  params: {
    userId: string
  }
}

export async function generateStaticParams(): Promise<UserRootPageProps["params"][]> {
  const users: User[] = JSON.parse(fs.readFileSync("data-json/users.json", "utf-8"));

  return users.map((u: User) => ({ userId: u.id }));
  //return [{ userId: '1' }, { userId: '2' }, { userId: '3' }, { userId: '4' }];
}

export default function UserRoot({ params }: UserRootPageProps) {
  const userId = params?.userId;
  const currentPath = "/" + userId

  const users: User[] = JSON.parse(fs.readFileSync("data-json/users.json", "utf-8"));
  const user = users.find((u: User) => u.id === userId)
  if (!user) {
    notFound();
  }

  return (
    <main>
      <Header backPath={currentPath} />
      <div className="prose dark:prose-invert">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{user.username}</h2>
          <p className="mt-2 text-lg leading-8">
            {user.description}
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-1 pb-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {allPosts.map((post) => {
            if (post.userId === user.id) {
              return (
                <PostCard key={post._id} post={post} user={user} />
              )
            }
          })}
        </div>
      </div>
    </main>
  )
}
