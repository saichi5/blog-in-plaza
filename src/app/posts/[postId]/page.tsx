import { notFound } from "next/navigation"
import { format, parseISO } from 'date-fns';
import Header from "@/components/organisms/header";
import { UserProvider } from "@/components/user-context";
import { getPost } from "@/lib/database-functions";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

interface PostProps {
  params: { postId: string }
}

export default async function PostPage({ params }: PostProps) {
  const postId = params.postId
  const currentPath = '/posts/' + postId

  const post = await getPost(postId)

  if (!post) { notFound() }

  return (
    <main>
      <UserProvider>
        <Header currentPath={currentPath} />
      </UserProvider>
      <article className="py-6 prose dark:prose-invert">
       <h1>{post.title}</h1>
       {post.createdAt && 
       <time dateTime={post.createdAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
          作成日 { format(parseISO(post.createdAt), 'LLLL d, yyyy')}
       </time>
       }
       {post.updatedAt && 
       <time dateTime={post.updatedAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
          更新日 {format(parseISO(post.updatedAt), 'LLLL d, yyyy')}
       </time>
       }
       <p>
         {post.description && <p className="text-xl">{post.description}</p>}
       </p>
       <hr />
       <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.body}
       </ReactMarkdown>
      </article>
    </main>
  )
}
