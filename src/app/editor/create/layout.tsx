import { Inter } from "next/font/google"
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "広場でブログ",
  description: "Create a blog post",
}

interface LayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: LayoutProps) {
  return (
    <html lang="ja" className="h-full">
      <body
        className={`h-full antialiased min-h-screen bg-white ${inter.className}`}
      >
          <div className="max-w-2xl mx-auto py-10 px-4">
            <main>{children}</main>
          </div>
          <Analytics />
      </body>
    </html>
  )
}
