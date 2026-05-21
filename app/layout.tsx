import type { Metadata } from 'next'
import './globals.css'

// Local fallback Navbar and Footer to avoid missing-module build errors
function Navbar() {
  return (
    <header className="w-full py-4 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto text-white font-semibold">ShopHub</div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="w-full py-6 px-6 mt-8 text-sm text-slate-300">
      <div className="max-w-7xl mx-auto">© {new Date().getFullYear()} ShopHub. All rights reserved.</div>
    </footer>
  )
}

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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}