import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
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

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )

  if (clerkKey) {
    return (
      <ClerkProvider
        appearance={{
          theme: dark,
          variables: {
            colorPrimary: '#8b5cf6',
            colorBackground: '#0c0d0e',
            colorForeground: '#f4f4f5',
            colorMutedForeground: '#a1a1aa',
            borderRadius: '0.5rem',
          },
          elements: {
            card: 'border border-white/10 bg-[#0c0d0e] shadow-2xl',
            formFieldInput: 'bg-[#12151a] border-white/10 text-white',
            navbar: 'hidden',
          },
        }}
      >
        {content}
      </ClerkProvider>
    )
  }

  return content
}
