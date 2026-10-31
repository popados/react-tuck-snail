import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google'
import { AppLayout } from '@/app/AppLayout'
import { Providers } from '@/app/Providers'
import { APP_NAME } from '@/app/site'
import '@/index.css'

// The two type families from the design system; src/index.css reads these
// variables in --font-sans and --font-mono.
const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-bricolage',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrains',
})

export const metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description:
    'pocket@shell: a habit and mood tracker with no streaks. Everything stays on your device.',
  icons: { icon: '/favicon.svg' },
}

// data-palette="low" applies the low stimulation palette site-wide. data-theme
// (light/dark) is set in the browser by ThemeSync, hence suppressHydrationWarning.
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-palette="low"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  )
}
