'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Menu, X, Search } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(2)

  // Listen for add to cart events
  useEffect(() => {
    const handleAddToCart = () => {
      setCartCount(prev => prev + 1)
    }
    window.addEventListener('addToCart', handleAddToCart)
    return () => window.removeEventListener('addToCart', handleAddToCart)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/' },
    { label: 'Categories', href: '/' },
    { label: 'About', href: '/' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              ShopHub
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <motion.span
                  whileHover={{ color: '#60a5fa' }}
                  className="text-gray-300 hover:text-blue-400 transition font-semibold cursor-pointer"
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search (Hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/20">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent text-white text-sm outline-none w-40 placeholder-gray-500"
              />
            </div>

            {/* Cart Button */}
            <Link href="/checkout">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-300 hover:text-blue-400 transition"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 space-y-2 pb-4"
          >
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <div className="block px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition">
                  {item.label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}