import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPages } from "contentlayer/generated"
import { format, parseISO } from 'date-fns';
import { Mdx } from "@/components/mdx-components"
import { SlugPageProps } from "@/data";
import Header from "@/components/organisms/header";
import { UserProvider } from "@/components/user-context";

async function getPageFromParams(params: SlugPageProps['params']) {
  const slug = params?.slug?.join("/")
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page;
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams(): Promise<SlugPageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: SlugPageProps) {
  const currentPath = '/pages/' + params?.slug?.join('/')
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <main>
      <UserProvider>
        <Header currentPath={currentPath} />
      </UserProvider>
      <article className="py-6 prose dark:prose-invert">
       <h1>{page.title}</h1>
       {page.createdAt && 
       <time dateTime={page.createdAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
          作成日 { format(parseISO(page.createdAt), 'LLLL d, yyyy')}
       </time>
       }
       {page.updatedAt && 
       <time dateTime={page.updatedAt} className="mb-2 block text-xs text-gray-600 dark:text-gray-200">
          更新日 {format(parseISO(page.updatedAt), 'LLLL d, yyyy')}
       </time>
       }
       {page.description && <p className="text-xl">{page.description}</p>}
       <hr />
       <Mdx code={page.body.code} />
      </article>
    </main>
  )
}
