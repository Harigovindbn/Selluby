'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Truck, Globe } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../../components/CartProvider'

const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 149.5 },
  INR: { symbol: '₹', rate: 83.1 },
  AUD: { symbol: 'A$', rate: 1.53 },
  CAD: { symbol: 'C$', rate: 1.36 },
  SGD: { symbol: 'S$', rate: 1.34 },
  HKD: { symbol: 'HK$', rate: 7.85 },
  CHF: { symbol: 'CHF', rate: 0.88 },
  SEK: { symbol: 'kr', rate: 10.5 },
  NOK: { symbol: 'kr', rate: 10.8 },
  MXN: { symbol: '$', rate: 17.0 },
  BRL: { symbol: 'R$', rate: 5.0 },
  ZAR: { symbol: 'R', rate: 18.5 },
  AED: { symbol: 'د.إ', rate: 3.67 },
  SAR: { symbol: '﷼', rate: 3.75 },
  NZD: { symbol: 'NZ$', rate: 1.67 },
  KRW: { symbol: '₩', rate: 1309 },
}

const COUNTRIES = [
  { code: 'US', name: 'United States', tax: 0.08 },
  { code: 'CA', name: 'Canada', tax: 0.13 },
  { code: 'GB', name: 'United Kingdom', tax: 0.20 },
  { code: 'DE', name: 'Germany', tax: 0.19 },
  { code: 'FR', name: 'France', tax: 0.20 },
  { code: 'AU', name: 'Australia', tax: 0.10 },
  { code: 'JP', name: 'Japan', tax: 0.10 },
  { code: 'IN', name: 'India', tax: 0.18 },
  { code: 'SG', name: 'Singapore', tax: 0.08 },
  { code: 'NZ', name: 'New Zealand', tax: 0.15 },
  { code: 'BR', name: 'Brazil', tax: 0.17 },
  { code: 'MX', name: 'Mexico', tax: 0.16 },
  { code: 'AE', name: 'United Arab Emirates', tax: 0.05 },
  { code: 'SA', name: 'Saudi Arabia', tax: 0.15 },
  { code: 'ZA', name: 'South Africa', tax: 0.15 },
  { code: 'MY', name: 'Malaysia', tax: 0.06 },
  { code: 'TH', name: 'Thailand', tax: 0.07 },
  { code: 'ID', name: 'Indonesia', tax: 0.10 },
]

export default function Checkout() {
  const [currency, setCurrency] = useState<keyof typeof CURRENCIES>('USD')
  const [country, setCountry] = useState(COUNTRIES[0])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    sameAsShipping: true,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderStep, setOrderStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [errors, setErrors] = useState<string[]>([])
  const [completedTotal, setCompletedTotal] = useState<number | null>(null)
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCart()

  const subtotal = totalPrice
  const tax = subtotal * country.tax
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  const convertPrice = (price: number) => {
    const rate = CURRENCIES[currency].rate
    return (price * rate).toFixed(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const validateShipping = () => {
    const newErrors: string[] = []

    if (!formData.firstName.trim()) newErrors.push('First name is required.')
    if (!formData.lastName.trim()) newErrors.push('Last name is required.')
    if (!formData.email.trim()) {
      newErrors.push('Email is required.')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Enter a valid email address.')
    }
    if (!formData.phone.trim() || !/^\+?[0-9\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.push('Enter a valid phone number.')
    }
    if (!formData.address.trim()) newErrors.push('Street address is required.')
    if (!formData.city.trim()) newErrors.push('City is required.')
    if (!formData.zipCode.trim()) newErrors.push('ZIP code is required.')

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const validatePayment = () => {
    const newErrors: string[] = []
    const cardNumber = formData.cardNumber.replace(/\s+/g, '')
    const expiryIsValid = /^\d{2}\/\d{2}$/.test(formData.cardExpiry)

    if (!cardNumber || !/^\d{13,19}$/.test(cardNumber)) {
      newErrors.push('Enter a valid card number (13-19 digits).')
    }
    if (!expiryIsValid) {
      newErrors.push('Enter a valid expiry date in MM/YY format.')
    }
    if (!formData.cardCvc || !/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.push('Enter a valid CVC.')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (orderStep === 'shipping') {
      if (!validateShipping()) return
      setOrderStep('payment')
      setErrors([])
      return
    }

    if (orderStep === 'payment') {
      if (!validatePayment()) return
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setCompletedTotal(total)
        setOrderStep('confirmation')
        clearCart()
      }, 2000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  if (items.length === 0 && orderStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center rounded-3xl border border-white/10 bg-white/5 p-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-300 mb-8">
            Add items to your cart before checking out. Browse our store for premium products and fast shipping.
          </p>
          <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition">
            Back to shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {orderStep === 'confirmation' ? (
          /* Order Confirmation */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-4xl">✓</span>
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8">
              <p className="text-gray-400 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-blue-400">#SHP-{Math.random().toString(36).substring(7).toUpperCase()}</p>

              <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {CURRENCIES[currency].symbol}{convertPrice(completedTotal ?? total)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Delivery Address</p>
                  <p className="text-white mt-2 font-semibold">{formData.city}, {country.code}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Expected Delivery</p>
                  <p className="text-white mt-2 font-semibold">3-5 Business Days</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.a
                href="/"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition"
              >
                Continue Shopping
              </motion.a>
              <p className="text-gray-400 text-sm">
                You'll receive an email confirmation shortly with your order details
              </p>
            </div>
          </motion.div>
        ) : (
          /* Checkout Form */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <motion.div
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step Indicator */}
                <div className="flex gap-4 mb-8">
                  {(['shipping', 'payment'] as const).map((step, idx) => (
                    <motion.div key={step} className="flex items-center gap-3 flex-1">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                          orderStep === step
                            ? 'bg-blue-500 text-white'
                            : idx < (['shipping', 'payment'] as const).indexOf(orderStep)
                            ? 'bg-green-500 text-white'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {idx + 1}
                      </motion.div>
                      <span className={`capitalize font-semibold ${
                        orderStep === step ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {errors.length > 0 && (
                  <div className="space-y-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-100 mb-6">
                    <p className="font-semibold">Please fix the following:</p>
                    <ul className="list-disc list-inside text-sm text-red-100">
                      {errors.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Shipping Information */}
                {orderStep === 'shipping' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>

                      {/* Currency & Country Selection */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            <Globe size={16} className="inline mr-2" />
                            Country
                          </label>
                          <select
                            value={country.code}
                            onChange={(e) => {
                              const selected = COUNTRIES.find(c => c.code === e.target.value)
                              if (selected) setCountry(selected)
                            }}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                          >
                            {COUNTRIES.map(c => (
                              <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Currency
                          </label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as keyof typeof CURRENCIES)}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                          >
                            {Object.keys(CURRENCIES).map(curr => (
                              <option key={curr} value={curr}>{curr}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                          placeholder="123 Main Street"
                        />
                      </div>

                      {/* City, State, Zip */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            State / Province
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="NY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Payment Information */}
                {orderStep === 'payment' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Lock size={24} />
                      Payment Method
                    </h2>

                    {/* Card Details */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4532 1234 5678 9010"
                        maxLength={19}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 font-mono"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/50">
                      <p className="text-blue-300 text-sm flex items-center gap-2">
                        <Lock size={16} />
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8 border-t border-white/10">
                  {orderStep === 'payment' && (
                    <button
                      type="button"
                      onClick={() => setOrderStep('shipping')}
                      className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition font-semibold"
                    >
                      Back
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-bold disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : orderStep === 'shipping' ? 'Continue to Payment' : 'Complete Purchase'}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Order Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  {items.length === 0 ? (
                    <p className="text-gray-400">No items in cart.</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.product.id} className="grid grid-cols-12 gap-4 items-center text-gray-300">
                        <div className="col-span-6">
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-sm text-gray-400">{item.product.category}</p>
                        </div>
                        <div className="col-span-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
                          >
                            −
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="col-span-3 text-right space-y-1">
                          <p className="font-semibold">
                            {CURRENCIES[currency].symbol}{convertPrice(item.product.price * item.quantity)}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-xs text-red-300 hover:text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{CURRENCIES[currency].symbol}{convertPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax ({(country.tax * 100).toFixed(0)}%)</span>
                    <span>{CURRENCIES[currency].symbol}{convertPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="flex items-center gap-2">
                      <Truck size={16} />
                      Shipping
                    </span>
                    <span>{shipping === 0 ? 'FREE' : `${CURRENCIES[currency].symbol}${convertPrice(shipping)}`}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50">
                  <p className="text-gray-300 text-sm mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-white">
                    {CURRENCIES[currency].symbol}{convertPrice(total)}
                  </p>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 rounded-lg bg-white/5 text-center">
                  <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                    <Lock size={16} />
                    100% Secure Checkout
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}