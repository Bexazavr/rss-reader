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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var c = localStorage.getItem('bexa-color-theme');
            var b = localStorage.getItem('bexa-base-theme');
            if (c && c !== 'neutral') document.documentElement.classList.add('theme-' + c);
            if (b && b !== 'neutral') document.documentElement.classList.add('base-' + b);
          } catch(e) {}
        ` }} />
      </head>
      <body className={`${rubik.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <FeedsProvider>
            <Header />
            <div className="flex h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
              {children}
            </div>
          </FeedsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
