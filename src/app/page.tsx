import Header from '@/components/organisms/header'
import PostCard from "@/components/organisms/post-card";
import { UserProvider } from "@/components/user-context";
import { getPosts } from '@/lib/database-functions';

export default async function Home() {
  const currentPath = '/';
  const posts = await getPosts()

  return (
    <main>
      <UserProvider>
        <Header currentPath={currentPath} />
      </UserProvider>
      <div className="prose dark:prose-invert">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">みんなの広場</h2>
          <p className="mt-2 text-lg leading-8">
            オープンスペース
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-1 pb-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length ? posts.map((post) => <PostCard key={post.id} post={post} /> )
          : (<div></div>)}
        </div>
      </div>
    </main>
  )
}
