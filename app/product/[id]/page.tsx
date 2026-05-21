'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react'
import Link from 'next/link'
import { getProductById, products } from '../../../lib/products'
import { useCart } from '../../../components/CartProvider'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('black')
  const [selectedSize, setSelectedSize] = useState('M')
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details')
  const { addItem } = useCart()

  const product = getProductById(params.id)
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center text-white px-6">
        <div className="max-w-3xl mx-auto py-40 rounded-3xl border border-white/10 bg-white/5">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-300 mb-8">We couldn't find that product. Please return to the shop and choose another item.</p>
          <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-400 transition text-white px-6 py-3 rounded-lg">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 3)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      {/* Breadcrumb */}
      <motion.div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-blue-400 transition">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover rounded-xl"
              />
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  -{discount}%
                </div>
              )}
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-400 transition"
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {product.name}
                </h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                  />
                </motion.button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <span className="text-gray-300">
                  {product.rating} ({product.reviews} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-6 mb-8">
              {/* Color Selection */}
              <div>
                <p className="text-gray-300 font-semibold mb-3">Color</p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full transition ${
                        selectedColor === color ? 'ring-2 ring-blue-400' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-gray-300 font-semibold mb-3">Size</p>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 transition font-semibold ${
                        selectedSize === size
                          ? 'border-blue-400 bg-blue-400/20 text-blue-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-gray-300 font-semibold mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-white w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8 p-4 rounded-lg bg-green-500/20 border border-green-500/50">
              <p className="text-green-400 font-semibold">✓ In Stock - Ships within 24 hours</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addItem(product, quantity)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-blue-400/50 text-blue-400 py-4 rounded-lg font-bold hover:bg-blue-400/10 transition flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                Share Product
              </motion.button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 text-gray-300">
                <Truck size={20} className="text-blue-400" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <RotateCcw size={20} className="text-blue-400" />
                <span>30-day easy returns policy</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield size={20} className="text-blue-400" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b border-white/10 mb-8">
            <div className="flex gap-8">
              {(['details', 'reviews', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold transition capitalize ${
                    activeTab === tab
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-3">
                        <span className="text-blue-400 font-bold mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="space-y-6 text-gray-300">
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-lg font-semibold text-white mb-3">Customer Reviews</p>
                  <p>{product.rating} stars based on {product.reviews} verified buyers.</p>
                  <div className="mt-4 flex items-center gap-2 text-yellow-400 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="mt-4 text-gray-400">Browse our product details and experience the quality that customers love.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shipping' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="space-y-4 text-gray-300">
                <p>• Standard Shipping: 5-7 business days</p>
                <p>• Express Shipping: 2-3 business days</p>
                <p>• Overnight Shipping: Next business day</p>
                <p className="mt-6">All orders ship with tracking information</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Related Products */}
        <motion.section
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((prod) => (
              <Link key={prod.id} href={`/product/${prod.id}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-800">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold group-hover:text-blue-400 transition">{prod.name}</p>
                    <p className="text-2xl font-bold text-blue-400 mt-2">${prod.price.toFixed(2)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}