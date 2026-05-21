'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Globe, Link as LinkIcon, MessageCircle, Mail } from 'lucide-react'

export default function Footer() {
  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/' },
        { label: 'New Arrivals', href: '/' },
        { label: 'Best Sellers', href: '/' },
        { label: 'Sale', href: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/' },
        { label: 'FAQ', href: '/' },
        { label: 'Shipping Info', href: '/' },
        { label: 'Returns', href: '/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/' },
        { label: 'Blog', href: '/' },
        { label: 'Careers', href: '/' },
        { label: 'Press', href: '/' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/' },
        { label: 'Terms of Service', href: '/' },
        { label: 'Cookie Policy', href: '/' },
        { label: 'Accessibility', href: '/' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              ShopHub
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Your premium destination for quality products and amazing deals.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[Globe, LinkIcon, MessageCircle, Mail].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  aria-label="Social link"
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {columns.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h3 className="font-bold text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="text-gray-400 hover:text-blue-400 transition text-sm inline-block"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-400 text-sm">Get exclusive deals and updates delivered to your inbox</p>
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Mail size={18} />
                <span className="hidden sm:inline">Subscribe</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <div className="grid md:grid-cols-2 gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 ShopHub. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end gap-6 text-gray-400 text-sm">
              <Link href="/" className="hover:text-blue-400 transition">Privacy</Link>
              <Link href="/" className="hover:text-blue-400 transition">Terms</Link>
              <Link href="/" className="hover:text-blue-400 transition">Sitemap</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}