'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  RotateCcw,
} from 'lucide-react'
import { getProductById, products } from '../../../lib/products'
import { useCart } from '../../../components/CartProvider'

type DetailTab = 'overview' | 'features' | 'shipping' | 'reviews'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('black')
  const [selectedSize, setSelectedSize] = useState('M')
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { addItem } = useCart()

  const product = getProductById(params.id)

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products.filter((item) => item.id !== product.id).slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 pt-24 pb-16 text-center text-white">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/30">
          <h1 className="text-4xl font-bold">Product not found</h1>
          <p className="mt-4 text-gray-300">
            We couldn't find that item. Please return to the shop and choose another product.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-gray-100"
          >
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const activeImage = product.images[activeImageIndex] ?? product.image

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const tabs: Array<{ id: DetailTab; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'reviews', label: 'Reviews' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Image gallery */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/40">
              <div className="relative aspect-[4/3] bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                  {product.category}
                </div>

                {discount > 0 && (
                  <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                    Save {discount}%
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((current) =>
                      current === 0 ? product.images.length - 1 : current - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveImageIndex((current) => (current + 1) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-gray-300">Minimal product story</p>
                  <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
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
                  <Image
                    src={img}
                    alt={`${product.name} preview ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">In stock</p>
                <p className="mt-2 font-semibold text-white">{product.inStock ? 'Ready to ship' : 'Unavailable'}</p>
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
          </motion.section>

          {/* Product info */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{product.category}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-300">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        fill={index < Math.round(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span>
                    {product.rating.toFixed(1)} rating · {product.reviews} verified reviews
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="rounded-full border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
                aria-label="Toggle favorite"
              >
                <Heart
                  size={20}
                  className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                />
              </motion.button>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
              <span className="pb-1 text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>

            <p className="mt-5 text-base leading-7 text-gray-300">{product.description}</p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Color</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${
                      selectedColor === color
                        ? 'border-white bg-white text-slate-900'
                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Size</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedSize === size
                        ? 'border-white bg-white text-slate-900'
                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Quantity</p>
              <div className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-white/5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg text-white transition hover:bg-white/10"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg text-white transition hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-gray-100"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Share2 size={18} />
                Share Product
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <Truck size={18} className="text-blue-400" />
                <p className="mt-3 text-sm font-semibold text-white">Fast delivery</p>
                <p className="mt-1 text-sm text-gray-400">Ships in 24 hours</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <RotateCcw size={18} className="text-blue-400" />
                <p className="mt-3 text-sm font-semibold text-white">Easy returns</p>
                <p className="mt-1 text-sm text-gray-400">30-day return window</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <Shield size={18} className="text-blue-400" />
                <p className="mt-3 text-sm font-semibold text-white">Warranty</p>
                <p className="mt-1 text-sm text-gray-400">2-year protection</p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Detail tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="border-b border-white/10">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-t-2xl px-5 py-3 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? 'border border-b-0 border-white/10 bg-white/5 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-b-[2rem] border border-t-0 border-white/10 bg-white/5 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-10 md:grid-cols-2"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white">Built for a cleaner experience</h3>
                    <p className="mt-4 leading-7 text-gray-300">
                      This product page focuses on clarity: large imagery, simple layouts, and direct
                      access to the most important product details.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Quick highlights</h3>
                    <ul className="mt-4 space-y-3">
                      {product.features.slice(0, 5).map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-gray-300">
                          <Check size={18} className="mt-1 text-blue-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    {product.features.map((feature) => (
                      <div
                        key={feature}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4 text-gray-300"
                      >
                        <Check size={16} className="mb-3 text-blue-400" />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-4 md:grid-cols-3"
                >
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-lg font-semibold text-white">Standard shipping</p>
                    <p className="mt-2 text-gray-300">5–7 business days</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-lg font-semibold text-white">Express shipping</p>
                    <p className="mt-2 text-gray-300">2–3 business days</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-lg font-semibold text-white">Returns</p>
                    <p className="mt-2 text-gray-300">30-day easy return policy</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-lg font-semibold text-white">Verified rating</p>
                    <p className="mt-2 text-4xl font-bold text-white">{product.rating.toFixed(1)}</p>
                    <p className="mt-2 text-gray-300">{product.reviews} verified reviews</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-lg font-semibold text-white">Customer note</p>
                    <p className="mt-2 text-gray-300 leading-7">
                      Buyers love the minimal styling, reliable build, and the image-led product
                      presentation.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Related products */}
        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Related products</h2>
            <p className="mt-2 text-gray-300">More items with the same clean presentation.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group block">
                <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20">
                  <div className="relative h-52 bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.name}</h3>
                    <p className="mt-3 text-2xl font-bold text-white">${item.price.toFixed(2)}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
