import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { CartProvider } from '../components/CartProvider'

export const metadata: Metadata = {
  title: 'ShopHub - Your Premium E-Commerce Store',
  description: 'Interactive shopping experience with bubble product showcases',
  keywords: 'ecommerce, shopping, store, online retail',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-24">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}