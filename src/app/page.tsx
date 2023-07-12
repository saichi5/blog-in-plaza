import Header from '@/components/organisms/header'
import HomePosts from '@/components/pages/all-posts';
import { AuthUserProvider } from "@/components/auth-user-context";

export default function Home() {
  const currentPath = '/';

  return (
    <main>
      <AuthUserProvider>
        <Header currentPath={currentPath} />
      </AuthUserProvider>
      <div className="prose dark:prose-invert">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">みんなの広場</h2>
          <p className="mt-2 text-lg leading-8">
            オープンスペース
          </p>
        </div>
        <HomePosts />
      </div>
    </main>
  )
}
