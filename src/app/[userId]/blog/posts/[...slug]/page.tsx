import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import { format, parseISO } from 'date-fns';
import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"
import Header from "@/components/organisms/header";
import { SlugPageProps } from "@/data";

async function getPostFromParams(params: SlugPageProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<SlugPageProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

interface PostPageProps {
  params: {
    userId: string,
    slug: string[]
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const userId = params?.userId
  const currentPath = 
    '/' + userId + '/blog/posts/' + params?.slug?.join('/');

  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <main>
      <Header currentPath={currentPath} />
      <article className="py-6 prose dark:prose-invert">
        <h1 className="mb-2">{post.title}</h1>
        <time dateTime={post.createdAt} className="mb-2 block text-xs text-gray-600">
          作成日 { post.createdAt && format(parseISO(post.createdAt), 'LLLL d, yyyy')}
        </time>
        <time dateTime={post.updatedAt} className="mb-2 block text-xs text-gray-600">
          更新日 { post.updatedAt && format(parseISO(post.updatedAt), 'LLLL d, yyyy')}
        </time>
        {post.description && (
          <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
            {post.description}
          </p>
        )}
        <hr className="my-4" />
        <Mdx code={post.body.code} />
      </article>
    </main>
  )
}
