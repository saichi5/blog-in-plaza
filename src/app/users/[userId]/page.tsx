import PostCard from "@/components/organisms/post-card";
import Header from "@/components/organisms/header";
import { UserProvider } from "@/components/user-context";
import { format, parseISO } from 'date-fns';
import Image from "next/image";
import { getUser, getPosts } from "@/lib/database-functions";

interface PageProps {
  params: {
    userId: string
  }
}

export default async function UserRoot({ params }: PageProps) {
  const userId = params.userId
  
  const currentPath = "/users/" + userId
  const posts = await getPosts(userId)
  const user = await getUser(userId)

  return (
    <main>
      <UserProvider>
        <Header currentPath={currentPath} />
      </UserProvider>
      <div className="prose dark:prose-invert">
        {user &&
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Image src={user.coverImageUrl as string} alt='' height={300} width={430}
              className="rounded flex items-center"
            />
            <h2>{user.displayName}</h2>
            <time dateTime={user.createdAt} className="mb-2 block text-sm text-gray-600">
              登録日 { format(parseISO(user.createdAt), 'LLLL d, yyyy')}
            </time>
            {user.updatedAt && 
              <time dateTime={user.updatedAt} className="mb-2 block text-sm text-gray-600">
                更新日 { format(parseISO(user.updatedAt), 'LLLL d, yyyy')}
              </time> 
            }
            <p className="mt-2 text-lg leading-8">
              {user.description}
            </p>
          </div>
        }
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-1 pb-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length ? posts.map((post) => <PostCard key={post.id} post={post} />)
          : <div></div>}
        </div>
      </div>
    </main>
  )
}
