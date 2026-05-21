'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Inline BubbleProduct component to avoid missing import error
function BubbleProduct({
  product,
  isSelected,
  onSelect,
}: {
  product: any
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onSelect}
        className={`rounded-full overflow-hidden shadow-lg transition-transform transform ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
        style={{ width: 200, height: 200 }}
        aria-pressed={isSelected}
      >
        <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-full object-cover" />
      </button>
      <div className="mt-3 text-center">
        <div className="font-semibold">{product.name}</div>
        <div className="text-sm text-gray-300">${product.price}</div>
      </div>
    </div>
  )
}
import { motion } from 'framer-motion'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedBubble, setSelectedBubble] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Sample products - replace with API call
  useEffect(() => {
    const sampleProducts = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        category: 'Electronics',
        rating: 4.8,
        reviews: 342,
        description: 'Crystal clear sound with active noise cancellation'
      },
      {
        id: '2',
        name: 'Designer Smartwatch',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
        category: 'Wearables',
        rating: 4.9,
        reviews: 521,
        description: 'Stay connected with advanced health features'
      },
      {
        id: '3',
        name: 'Professional Camera',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1519183071298-a2962eadc0a7?auto=format&fit=crop&w=800&q=80',
        category: 'Photography',
        rating: 4.7,
        reviews: 289,
        description: '4K video with professional-grade lens'
      },
      {
        id: '4',
        name: 'Portable Speaker',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1512418490979-92798cec0f9d?auto=format&fit=crop&w=800&q=80',
        category: 'Audio',
        rating: 4.6,
        reviews: 412,
        description: 'High-quality stereo sound on the go'
      },
      {
        id: '5',
        name: 'Laptop Stand',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1555617117-08ef641a1abd?auto=format&fit=crop&w=800&q=80',
        category: 'Accessories',
        rating: 4.5,
        reviews: 156,
        description: 'Ergonomic design for comfort and productivity'
      },
      {
        id: '6',
        name: 'Mechanical Keyboard',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1510565097016-186a2cc40f2d?auto=format&fit=crop&w=800&q=80',
        category: 'Peripherals',
        rating: 4.8,
        reviews: 678,
        description: 'RGB lighting with premium mechanical switches'
      },
    ]
    
    setProducts(sampleProducts)
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