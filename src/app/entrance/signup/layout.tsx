import { Inter } from "next/font/google"
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "広場でブログ",
  description: "Signup page.",
}

interface LayoutProps {
  children: React.ReactNode
}

export default function SignupLayout({ children }: LayoutProps) {
  return (
    <html lang="ja" className="h-full">
      <body
        className={`h-full antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
          <div className="max-w-2xl mx-auto py-10 px-4">
            <main>{children}</main>
          </div>
          <Analytics />
      </body>
    </html>
  )
}
