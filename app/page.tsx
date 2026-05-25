'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import BubbleProduct from '../components/BubbleProduct'
import { products as productCatalog, Product } from '../lib/products'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedBubble, setSelectedBubble] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)

  useEffect(() => {
    setProducts(productCatalog)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (products.length === 0) return

    const interval = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % products.length)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [products])

  const activeHeroProduct = products[activeHeroIndex] ?? null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_24%)]" />

      {/* Hero Section */}
      <section className="px-6 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
        >
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          Minimal storefront, smooth motion, premium products
        </motion.div>

        <motion.h1
          className="mb-4 text-5xl font-bold text-white md:text-6xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-slate-200 to-blue-200 bg-clip-text text-transparent">
            Discover products that feel clean and modern
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore a minimal product experience with better imagery, sliding hero visuals, and richer detail pages.
        </motion.p>

        <motion.div
          className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <Link href="#featured-products">
            <motion.span
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-black/20"
            >
              Browse products
            </motion.span>
          </Link>
          <Link href="#product-stories">
            <motion.span
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white"
            >
              View stories
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30">
              <AnimatePresence mode="wait">
                {activeHeroProduct && (
                  <motion.div
                    key={activeHeroProduct.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative overflow-hidden rounded-[1.5rem] bg-slate-950"
                  >
                    <div className="relative h-[22rem] sm:h-[28rem] overflow-hidden">
                      <img
                        src={activeHeroProduct.image}
                        alt={activeHeroProduct.name}
                        loading="eager"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                      {activeHeroProduct.category}
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/45 p-5 text-left backdrop-blur-md sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-gray-300">Featured product</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                          {activeHeroProduct.name}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-gray-300">
                          {activeHeroProduct.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-white">
                          ${activeHeroProduct.price.toFixed(2)}
                        </span>
                        <Link href={`/product/${activeHeroProduct.id}`}>
                          <span className="inline-flex cursor-pointer items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                            View full details
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid gap-4">
              {products.slice(0, 3).map((product, index) => (
                <motion.button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveHeroIndex(index)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className={`overflow-hidden rounded-2xl border bg-white/5 text-left transition ${
                    activeHeroIndex === index ? 'border-white/30' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 p-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{product.category}</p>
                      <h3 className="truncate text-base font-semibold text-white">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-300">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bubble Showcase Grid */}
      <div className="mx-auto max-w-7xl px-6">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <motion.div
              className="h-12 w-12 rounded-full border-b-2 border-l-2 border-r-2 border-white/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          <motion.div
            className="grid auto-rows-max grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants} className="flex justify-center">
                <BubbleProduct
                  product={product}
                  isSelected={selectedBubble === product.id}
                  onSelect={() =>
                    setSelectedBubble(selectedBubble === product.id ? null : product.id)
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Story Cards */}
      <section id="product-stories" className="mx-auto mt-20 max-w-7xl px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Featured products</h2>
          <p className="text-gray-300">Minimal cards with clean imagery and quick access to deeper product pages.</p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants} whileHover={{ y: -6 }}>
              <Link href={`/product/${product.id}`} className="group block">
                <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20">
                  <div className="relative h-56 bg-slate-900">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="line-clamp-1 text-lg font-semibold text-white">{product.name}</h3>
                      <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-gray-400">
                        {product.category}
                      </span>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-300">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
