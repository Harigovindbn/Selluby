'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye } from 'lucide-react'
import { useCart } from './CartProvider'
import type { Product } from '../lib/products'

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
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { addItem } = useCart()

  useEffect(() => {
    if (!isSelected) return
    setActiveImageIndex(0)
  }, [isSelected, product.id])

  const bubbleVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 160, damping: 20 },
    },
    hover: {
      y: -4,
      transition: { type: 'spring' as const, stiffness: 220, damping: 18 },
    },
    tap: { scale: 0.99 },
  }

  const popupVariants = {
    initial: { opacity: 0, scale: 0.96, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 220, damping: 22 },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 20,
      transition: { duration: 0.2 },
    },
  }

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const handleAddToCart = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    addItem(product, 1)
  }

  const goToPreviousImage = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setActiveImageIndex((current) =>
      current === 0 ? product.images.length - 1 : current - 1
    )
  }

  const goToNextImage = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setActiveImageIndex((current) => (current + 1) % product.images.length)
  }

  const activeImage = product.images[activeImageIndex] ?? product.image

  return (
    <>
      <motion.div
        variants={bubbleVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={onSelect}
        className="group relative h-[24rem] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/15 cursor-pointer"
      >
        <div className="absolute inset-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {product.category}
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          ${product.price.toFixed(2)}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-white">{product.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-300">
              {product.description}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className="shrink-0 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/15"
            aria-label="Toggle favorite"
          >
            <Heart
              size={18}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isSelected && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={onSelect}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              variants={popupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/50">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
                    <div className="relative aspect-[4/3] bg-slate-900">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImage}
                          src={activeImage}
                          alt={product.name}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.35 }}
                          className="h-full w-full object-cover"
                        />
                      </AnimatePresence>

                      <button
                        type="button"
                        onClick={goToPreviousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={goToNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>

                      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                        {product.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 p-4">
                      {product.images.map((img, idx) => (
                        <button
                          key={`${img}-${idx}`}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                            activeImageIndex === idx
                              ? 'border-white/40'
                              : 'border-white/10 hover:border-white/25'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${product.name} preview ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                          Product details
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                          {product.name}
                        </h2>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsFavorite(!isFavorite)
                        }}
                        className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
                        aria-label="Toggle favorite"
                      >
                        <Heart
                          size={20}
                          className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                        />
                      </motion.button>
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
                      <span className="flex items-center gap-1 text-yellow-400">
                        {'★'.repeat(Math.round(product.rating))}
                      </span>
                      <span>
                        {product.rating.toFixed(1)} rating · {product.reviews} reviews
                      </span>
                    </div>

                    <div className="mt-6 flex items-end gap-3">
                      <span className="text-4xl font-bold text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="pb-1 text-lg text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <p className="mt-6 text-base leading-7 text-gray-300">
                      {product.description}
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Stock</p>
                        <p className="mt-2 font-semibold text-white">
                          {product.inStock ? 'In stock' : 'Out of stock'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Colors</p>
                        <p className="mt-2 font-semibold text-white">{product.colors.length} options</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Sizes</p>
                        <p className="mt-2 font-semibold text-white">{product.sizes.length} options</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-white">What makes it special</h3>
                      <ul className="mt-4 space-y-3">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-1 text-blue-400">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-gray-100"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </motion.button>

                      <Link href={`/product/${product.id}`} className="block">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                          <Eye size={18} />
                          View Full Details
                        </motion.button>
                      </Link>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSelect}
                        className="w-full px-4 py-2 text-sm text-gray-400 transition hover:text-white"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
