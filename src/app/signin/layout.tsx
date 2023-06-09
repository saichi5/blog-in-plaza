import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "広場でブログ",
  description: "Signin page.",
}

interface LayoutProps {
  children: React.ReactNode
}

export default function SigninLayout({ children }: LayoutProps) {
  return (
    <html lang="ja" className="h-full">
      <body
        className={`h-full antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
