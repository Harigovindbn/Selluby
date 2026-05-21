'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { useCart } from './CartProvider'
import type { Product } from '../lib/products'

interface Props {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  description: string
  category: string
}

export default function BubbleProduct({
  product,
  isSelected,
  onSelect,
}: {
  product: Product
  isSelected: boolean
  onSelect: () => void
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  const bubbleVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 200, damping: 20 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  }

  const popupVariants = {
    initial: { scale: 0, opacity: 0, y: 20 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 }
    },
    exit: {
      scale: 0,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  }

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <>
      {/* Bubble */}
      <motion.div
        variants={bubbleVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={onSelect}
        className="relative w-80 h-96 rounded-3xl overflow-hidden cursor-pointer group"
        style={{
          background: `linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))`,
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>

        {/* Product Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-between p-6">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <span className="bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
              {product.category}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsFavorite(!isFavorite)
              }}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
            >
              <Heart
                size={20}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
              />
            </motion.button>
          </div>

          {/* Bottom Section */}
          <div>
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? '★' : '☆'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-300 ml-1">({product.reviews})</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-white mb-2">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Floating Action */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          <button className="w-full bg-white/90 backdrop-blur-sm text-blue-600 py-2 rounded-lg font-semibold hover:bg-white transition">
            View Details
          </button>
        </motion.div>
      </motion.div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {isSelected && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={onSelect}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Popup Content */}
            <motion.div
              variants={popupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="bg-slate-900 rounded-2xl border border-blue-500/30 overflow-hidden max-w-2xl w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Product Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-xl overflow-hidden h-96 md:h-auto"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-500/80 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
                      {product.category}
                    </div>
                  </motion.div>

                  {/* Product Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        {product.name}
                      </h2>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-lg">★</span>
                          ))}
                        </div>
                        <span className="text-gray-300">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Description */}
                      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        <p className="text-gray-400 flex items-center gap-2">
                          <span className="text-blue-400">✓</span> Premium Quality
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <span className="text-blue-400">✓</span> Free Shipping
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <span className="text-blue-400">✓</span> 30-Day Returns
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={20} />
                        Add to Cart
                      </motion.button>

                      <Link href={`/product/${product.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full border border-blue-400/50 text-blue-400 py-3 rounded-lg font-bold hover:bg-blue-400/10 transition flex items-center justify-center gap-2"
                        >
                          <Eye size={20} />
                          View Full Details
                        </motion.button>
                      </Link>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSelect}
                        className="w-full text-gray-400 py-2 hover:text-gray-300 transition"
                      >
                        Close
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}