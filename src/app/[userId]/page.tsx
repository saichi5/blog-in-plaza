import { allPosts } from "contentlayer/generated";
import fs from 'fs';
import type { User } from '@/data'
import PostCard from "@/components/organisms/post-card";
import Header from "@/components/organisms/header";
import { latestOrder } from "@/utils/data-fetch";

interface UserRootPageProps {
  params: {
    userId: string | undefined
  }
}

export async function generateStaticParams(): Promise<UserRootPageProps["params"][]> {
  const users: User[] = JSON.parse(fs.readFileSync(process.env.USERS_PATH + "/users.json", "utf-8"));
  return users.map((u: User) => ({ userId: u.id }));
  //return [{ userId: '1' }, { userId: '2' }, { userId: '3' }, { userId: '4' }];
}

export default async function UserRoot({ params }: UserRootPageProps) {
  const userId = params?.userId;
  
  const currentPath = "/" + userId

  const users: User[] = JSON.parse(fs.readFileSync(process.env.USERS_PATH + "/users.json", "utf-8"));
  const user = users.find((u) => u.id === userId);

  return (
    <main>
      <Header currentPath={currentPath} />
      <div className="prose dark:prose-invert">
        {
          user && (
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{user.displayName}</h2>
              <p className="mt-2 text-lg leading-8">
                {user.description}
              </p>
            </div>
          )
        }
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-1 pb-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {allPosts.sort(latestOrder).map((post) => {
            if (post.userId === userId) {
              return (
                <PostCard key={post._id} post={post} />
              )
            }
          })}
        </div>
      </div>
    </main>
  )
}
