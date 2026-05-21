export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  images: string[]
  category: string
  inStock: boolean
  description: string
  features: string[]
  colors: string[]
  sizes: string[]
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512499617640-c2f999fe8fb8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519400197700-0f84a6d1c89f?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'Electronics',
    inStock: true,
    description: 'Experience premium sound quality with wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.',
    features: [
      'Active Noise Cancellation (ANC)',
      '30-Hour Battery Life',
      'Premium Sound Quality (Hi-Res Audio)',
      'Comfortable Over-Ear Design',
      'Foldable Design with Carry Case',
      'Bluetooth 5.3 Connectivity',
      'Built-in Microphone for Calls',
      'Touch Controls',
    ],
    colors: ['black', 'silver', 'gold', 'rose-gold'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Designer Smartwatch',
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.9,
    reviews: 521,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'Wearables',
    inStock: true,
    description: 'Stay connected with a designer smartwatch featuring fitness tracking, notifications, and premium craftsmanship.',
    features: [
      'Fitness Tracking',
      'Heart Rate Monitor',
      'Sleep Tracking',
      'Notifications',
      'Water Resistant',
      'Custom Watch Faces',
    ],
    colors: ['black', 'silver', 'rose-gold'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '3',
    name: 'Professional Camera',
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.7,
    reviews: 289,
    image: 'https://images.unsplash.com/photo-1519183071298-a2962eadc0a7?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1519183071298-a2962eadc0a7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519183071298-a2962eadc0a7?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'Photography',
    inStock: true,
    description: 'Capture every moment in stunning detail with our professional-grade camera, built for both photo and video.',
    features: [
      '4K Video Recording',
      'Professional Lens',
      'Fast Autofocus',
      'High ISO Performance',
    ],
    colors: ['black'],
    sizes: ['One Size'],
  },
  {
    id: '4',
    name: 'Portable Speaker',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.6,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1512418490979-92798cec0f9d?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1512418490979-92798cec0f9d?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'Audio',
    inStock: true,
    description: 'Take premium stereo sound anywhere with this portable speaker featuring rich bass and long battery life.',
    features: [
      'Bluetooth Connectivity',
      'Long Battery Life',
      'Rich Bass',
      'Compact Design',
    ],
    colors: ['black', 'blue'],
    sizes: ['One Size'],
  },
  {
    id: '5',
    name: 'Laptop Stand',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1555617117-08ef641a1abd?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1555617117-08ef641a1abd?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'Accessories',
    inStock: true,
    description: 'Ergonomic laptop stand designed to improve posture and airflow while you work.',
    features: [
      'Adjustable Height',
      'Sturdy Aluminum Build',
      'Portable Design',
    ],
    colors: ['silver', 'black'],
    sizes: ['One Size'],
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    price: 199.99,
    originalPrice: 239.99,
    rating: 4.8,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1510565097016-186a2cc40f2d?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1510565097016-186a2cc40f2d?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'Peripherals',
    inStock: true,
    description: 'Premium mechanical keyboard with RGB lighting and durable switches for gaming and productivity.',
    features: [
      'RGB Lighting',
      'Tactile Switches',
      'Durable Build',
    ],
    colors: ['black', 'white'],
    sizes: ['One Size'],
  },
]

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}
