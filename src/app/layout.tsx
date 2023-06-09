import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import Footer from "@/components/organisms/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "広場でブログ",
  description: "A page where people can express their thoughts on blogs in an open space like a plaza, freely read other people's blogs, and empathize and get close to each other.",
}

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="max-w-2xl mx-auto py-10 px-4">
              {children}
              <hr />
              <Footer />
            </div>
            <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
