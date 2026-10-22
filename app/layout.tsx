import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grtr — AI Executive Portfolio Builder',
  description: 'Turn your CV and target role into a bespoke, role-winning executive portfolio.',
  metadataBase: new URL('https://grtr.app'),
  generator: 'Grtr App',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0C0D0E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
