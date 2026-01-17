import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

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
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cream Wool Sweater",
    price: 189,
    image: product1,
    images: [product1, product2, product3, product5],
    category: "women",
    subcategory: "Knitwear",
    isNew: true,
    description: "Luxuriously soft merino wool sweater with ribbed texture. Perfect for layering in transitional weather.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Charcoal", "Terracotta"],
  },
  {
    id: "2",
    name: "Terracotta Linen Blazer",
    price: 245,
    originalPrice: 320,
    image: product2,
    images: [product2, product1, product7, product3],
    category: "women",
    subcategory: "Outerwear",
    isSale: true,
    description: "Breathable linen blazer in a warm terracotta hue. Relaxed fit with classic tailoring details.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Terracotta", "Sage", "Cream"],
  },
  {
    id: "3",
    name: "Beige Wide-Leg Trousers",
    price: 165,
    image: product3,
    images: [product3, product7, product2, product1],
    category: "women",
    subcategory: "Trousers",
    description: "High-waisted wide-leg trousers in premium cotton. Elegant silhouette for office or evening.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Black", "White"],
  },
  {
    id: "4",
    name: "Charcoal Wool Coat",
    price: 385,
    image: product4,
    images: [product4, product8, product4, product8],
    category: "men",
    subcategory: "Outerwear",
    isNew: true,
    description: "Double-breasted wool coat with peak lapels. Timeless design meets modern comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Camel", "Navy"],
  },
  {
    id: "5",
    name: "Cashmere Scarf",
    price: 125,
    image: product5,
    images: [product5, product1, product7, product5],
    category: "women",
    subcategory: "Accessories",
    description: "Incredibly soft 100% cashmere scarf with subtle fringe detail. Essential luxury piece.",
    sizes: ["One Size"],
    colors: ["Cream", "Grey", "Blush"],
  },
  {
    id: "6",
    name: "Organic Cotton Onesie",
    price: 45,
    image: product6,
    images: [product6, product6, product6, product6],
    category: "baby",
    subcategory: "Bodysuits",
    isNew: true,
    description: "Ultra-soft organic cotton onesie, gentle on delicate skin. Easy snap closure.",
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    colors: ["Cream", "Sage", "Blush"],
  },
  {
    id: "7",
    name: "Sage Linen Shirt",
    price: 135,
    image: product7,
    images: [product7, product3, product2, product1],
    category: "women",
    subcategory: "Tops",
    description: "Relaxed-fit linen shirt in calming sage green. Perfect for effortless summer style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage", "White", "Sky"],
  },
  {
    id: "8",
    name: "Essential Cotton Tee",
    price: 65,
    image: product8,
    images: [product8, product4, product8, product4],
    category: "men",
    subcategory: "T-Shirts",
    description: "Premium heavyweight cotton t-shirt with perfect drape. A wardrobe essential.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey", "Navy"],
  },
];

export const getProductsByCategory = (category: string) => {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find((p) => p.id === id);
};
