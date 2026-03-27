import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Rubik, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { FeedsProvider } from '@/providers/feeds-provider'
import { Header } from '@/components/header'
import './globals.css'

const rubik = Rubik({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
})

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'RSS Reader',
  description: 'Personal RSS reader',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <FeedsProvider>
            <div className="flex h-svh flex-col overflow-hidden">
              <Header />
              {children}
            </div>
          </FeedsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
