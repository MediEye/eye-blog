import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eye-Blog - 眼科論文専門ブログ',
  description: '眼科医、視能訓練士、眼科看護師向けの眼科論文専門ブログサイト',
  keywords: '眼科, 論文, 眼科医, 視能訓練士, 眼科看護師, 眼科研究',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
