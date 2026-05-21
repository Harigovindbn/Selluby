'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import BubbleProduct from '../components/BubbleProduct'
import { motion } from 'framer-motion'
import { products as productCatalog, Product } from '../lib/products'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedBubble, setSelectedBubble] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setProducts(productCatalog)
    setLoading(false)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <motion.section
        className="px-6 mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Discover Amazing Products
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Tap the bubbles to explore our curated collection of premium items
        </p>
        <div className="mx-auto mt-8 max-w-4xl">
          <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="ShopHub featured products" width={1200} height={600} className="w-full rounded-3xl shadow-2xl border border-white/10" />
        </div>
      </motion.section>

      {/* Bubble Showcase Grid */}
      <div className="px-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="flex justify-center"
              >
                <BubbleProduct
                  product={product}
                  isSelected={selectedBubble === product.id}
                  onSelect={() => setSelectedBubble(selectedBubble === product.id ? null : product.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Featured Collection Banner */}
      <motion.section
        className="mt-20 px-6 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] bg-repeat"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Limited Time Offer</h2>
            <p className="text-lg mb-6 opacity-90">Get 20% off on your first purchase with code: WELCOME20</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}