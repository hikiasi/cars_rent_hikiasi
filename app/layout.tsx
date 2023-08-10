import { Footer, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Аренда авто hikiasi',
  description: 'Откройте для себя лучшие автомобили в мире.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
