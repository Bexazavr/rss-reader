import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Rubik, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { FeedsProvider } from '@/providers/feeds-provider'
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
            var t = localStorage.getItem('theme');
            if (c && c !== 'neutral') document.documentElement.classList.add('theme-' + c);
            if (b && b !== 'neutral') document.documentElement.classList.add('base-' + b);
            if (t === 'dark') document.documentElement.classList.add('dark');
          } catch(e) {}
        ` }} />
        <link rel="stylesheet" href="https://bexa.dev/_shell/vars.css" />
        <script src="https://bexa.dev/_shell/bundle.js" defer></script>
      </head>
      <body className={`${rubik.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <FeedsProvider>
            <div
              id="bexa-shell"
              data-title="RSS Reader"
              data-breadcrumbs='[{"label":"rss","href":"/rss"}]'
            />
            <div className="flex h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
              {children}
            </div>
          </FeedsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
