import { Inter } from 'next/font/google'
import './globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gemini Clone',
  description: 'A Gemini AI clone built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
