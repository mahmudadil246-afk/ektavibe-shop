import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: "men" | "women" | "baby";
  subcategory: string;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  sizes: string[];
  colors: string[];
  reviews: Review[];
  rating: number;
}

const generateReviews = (productId: string): Review[] => {
  const reviewPool: Omit<Review, "id">[] = [
    {
      author: "Fatima K.",
      rating: 5,
      date: "2026-01-10",
      title: "Absolutely love it!",
      content: "The quality exceeded my expectations. The fabric is so soft and the fit is perfect. Will definitely buy more colors!",
      verified: true,
    },
    {
      author: "Rahim A.",
      rating: 4,
      date: "2026-01-08",
      title: "Great quality, runs slightly large",
      content: "Beautiful piece with excellent craftsmanship. I'd recommend sizing down if you prefer a more fitted look.",
      verified: true,
    },
    {
      author: "Nadia H.",
      rating: 5,
      date: "2026-01-05",
      title: "Perfect for the season",
      content: "This is exactly what I was looking for. The color is true to the photos and the material is breathable yet warm.",
      verified: true,
    },
    {
      author: "Kamal R.",
      rating: 5,
      date: "2025-12-28",
      title: "Exceptional value",
      content: "For the price point, this is outstanding quality. Feels like a luxury item. Fast shipping too!",
      verified: true,
    },
    {
      author: "Sabrina M.",
      rating: 4,
      date: "2025-12-20",
      title: "Nice but wish it had more colors",
      content: "Love the design and fit. Would be perfect if they offered it in more color options. Still very happy with my purchase.",
      verified: false,
    },
    {
      author: "Imran S.",
      rating: 5,
      date: "2025-12-15",
      title: "My new favorite!",
      content: "Already ordered another one in a different color. The attention to detail is remarkable. Highly recommend!",
      verified: true,
    },
  ];

  // Generate 3-5 reviews per product based on product ID
  const numReviews = 3 + (parseInt(productId) % 3);
  const startIndex = (parseInt(productId) * 2) % reviewPool.length;
  
  return Array.from({ length: numReviews }, (_, i) => ({
    ...reviewPool[(startIndex + i) % reviewPool.length],
    id: `${productId}-review-${i}`,
  }));
};

const calculateRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

const productsData: Omit<Product, 'rating'>[] = [
  {
    id: "1",
    name: "Cream Wool Sweater",
    price: 189,
    image: product1,
    images: [product1, product2, product3, product5],
    category: "women" as const,
    subcategory: "Knitwear",
    isNew: true,
    description: "Luxuriously soft merino wool sweater with ribbed texture. Perfect for layering in transitional weather.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Charcoal", "Terracotta"],
    reviews: generateReviews("1"),
  },
  {
    id: "2",
    name: "Terracotta Linen Blazer",
    price: 245,
    originalPrice: 320,
    image: product2,
    images: [product2, product1, product7, product3],
    category: "women" as const,
    subcategory: "Outerwear",
    isSale: true,
    description: "Breathable linen blazer in a warm terracotta hue. Relaxed fit with classic tailoring details.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Terracotta", "Sage", "Cream"],
    reviews: generateReviews("2"),
  },
  {
    id: "3",
    name: "Beige Wide-Leg Trousers",
    price: 165,
    image: product3,
    images: [product3, product7, product2, product1],
    category: "women" as const,
    subcategory: "Trousers",
    description: "High-waisted wide-leg trousers in premium cotton. Elegant silhouette for office or evening.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Black", "White"],
    reviews: generateReviews("3"),
  },
  {
    id: "4",
    name: "Charcoal Wool Coat",
    price: 385,
    image: product4,
    images: [product4, product8, product4, product8],
    category: "men" as const,
    subcategory: "Outerwear",
    isNew: true,
    description: "Double-breasted wool coat with peak lapels. Timeless design meets modern comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Camel", "Navy"],
    reviews: generateReviews("4"),
  },
  {
    id: "5",
    name: "Cashmere Scarf",
    price: 125,
    image: product5,
    images: [product5, product1, product7, product5],
    category: "women" as const,
    subcategory: "Accessories",
    description: "Incredibly soft 100% cashmere scarf with subtle fringe detail. Essential luxury piece.",
    sizes: ["One Size"],
    colors: ["Cream", "Grey", "Blush"],
    reviews: generateReviews("5"),
  },
  {
    id: "6",
    name: "Organic Cotton Onesie",
    price: 45,
    image: product6,
    images: [product6, product6, product6, product6],
    category: "baby" as const,
    subcategory: "Bodysuits",
    isNew: true,
    description: "Ultra-soft organic cotton onesie, gentle on delicate skin. Easy snap closure.",
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    colors: ["Cream", "Sage", "Blush"],
    reviews: generateReviews("6"),
  },
  {
    id: "7",
    name: "Sage Linen Shirt",
    price: 135,
    image: product7,
    images: [product7, product3, product2, product1],
    category: "women" as const,
    subcategory: "Tops",
    description: "Relaxed-fit linen shirt in calming sage green. Perfect for effortless summer style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage", "White", "Sky"],
    reviews: generateReviews("7"),
  },
  {
    id: "8",
    name: "Essential Cotton Tee",
    price: 65,
    image: product8,
    images: [product8, product4, product8, product4],
    category: "men" as const,
    subcategory: "T-Shirts",
    description: "Premium heavyweight cotton t-shirt with perfect drape. A wardrobe essential.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey", "Navy"],
    reviews: generateReviews("8"),
  },
];

export const products: Product[] = productsData.map((product) => ({
  ...product,
  rating: calculateRating(product.reviews),
}));

export const getProductsByCategory = (category: string) => {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find((p) => p.id === id);
};
