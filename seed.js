const productsModel = require('./DB/models/productModel')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const products = [
  // ==================== Electronics ====================
  {
    title: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description:
      "Premium wireless headphones with active noise cancellation, deep bass, and long-lasting battery life.",
    quantity: 45,
    sold: 12,
    price: 89.99,
    priceAfterDiscount: 79.99,
    colors: ["Black", "White", "Blue"],
    productImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944",
    ],
    category: "6a8c260397bedbd9cde3f537",
    subcategories: ["6a8c394d8a5019788a1a0106"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 324,
  },
  {
    title: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    description:
      "Compact waterproof Bluetooth speaker with powerful sound, deep bass, and up to twelve hours of battery life.",
    quantity: 67,
    sold: 23,
    price: 59.99,
    priceAfterDiscount: 49.99,
    colors: ["Black", "Red", "Blue"],
    productImage:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    ],
    category: "6a8c260397bedbd9cde3f537",
    subcategories: ["6a8c394d8a5019788a1a0106"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 187,
  },
  {
    title: "Mechanical Gaming Keyboard",
    slug: "mechanical-gaming-keyboard",
    description:
      "RGB mechanical gaming keyboard with customizable lighting, tactile switches, and durable construction.",
    quantity: 32,
    sold: 18,
    price: 79.99,
    priceAfterDiscount: 69.99,
    colors: ["Black", "White"],
    productImage:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    ],
    category: "6a8c260397bedbd9cde3f537",
    subcategories: ["6a8c394d8a5019788a1a0106"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 298,
  },
  {
    title: "4K Ultra HD Monitor",
    slug: "4k-ultra-hd-monitor",
    description:
      "Twenty-seven inch 4K monitor with vibrant colors, ultra-thin bezels, and excellent image quality.",
    quantity: 21,
    sold: 9,
    price: 349.99,
    priceAfterDiscount: 319.99,
    colors: ["Black"],
    productImage:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    ],
    category: "6a8c260397bedbd9cde3f537",
    subcategories: ["6a8c394d8a5019788a1a0106"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.8,
    ratingsQuantity: 421,
  },
  {
    title: "Smart Home Hub",
    slug: "smart-home-hub",
    description:
      "Central smart home hub that connects and controls compatible lights, sensors, and household devices.",
    quantity: 38,
    sold: 14,
    price: 119.99,
    priceAfterDiscount: 104.99,
    colors: ["White", "Black"],
    productImage:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3",
    images: [
      "https://images.unsplash.com/photo-1558008258-3256797b43f3",
    ],
    category: "6a8c260397bedbd9cde3f537",
    subcategories: ["6a8c394d8a5019788a1a0106"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 156,
  },

  // ==================== Smartphones ====================
  {
    title: "Galaxy X Pro",
    slug: "galaxy-x-pro",
    description:
      "Flagship smartphone with a stunning AMOLED display, advanced camera system, and powerful processor.",
    quantity: 24,
    sold: 16,
    price: 899.99,
    priceAfterDiscount: 849.99,
    colors: ["Black", "Silver", "Blue"],
    productImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    ],
    category: "6a8c269b97bedbd9cde3f53a",
    subcategories: ["6a8c39978a5019788a1a010e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 834,
  },
  {
    title: "iPhone Ultra",
    slug: "iphone-ultra",
    description:
      "Premium smartphone featuring a powerful processor, professional camera system, and stunning display.",
    quantity: 18,
    sold: 27,
    price: 1199.99,
    priceAfterDiscount: 1149.99,
    colors: ["Black", "Silver", "Gold"],
    productImage:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    ],
    category: "6a8c269b97bedbd9cde3f53a",
    subcategories: ["6a8c39978a5019788a1a010e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.8,
    ratingsQuantity: 1204,
  },
  {
    title: "Pixel Pro Max",
    slug: "pixel-pro-max",
    description:
      "AI-powered smartphone with exceptional photography capabilities, clean software, and long battery life.",
    quantity: 31,
    sold: 19,
    price: 799.99,
    priceAfterDiscount: 749.99,
    colors: ["Black", "White", "Green"],
    productImage:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    ],
    category: "6a8c269b97bedbd9cde3f53a",
    subcategories: ["6a8c39978a5019788a1a010e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 643,
  },
  {
    title: "OnePlus Nova",
    slug: "oneplus-nova",
    description:
      "Fast and powerful smartphone with a smooth high-refresh-rate display and fast charging technology.",
    quantity: 43,
    sold: 11,
    price: 649.99,
    priceAfterDiscount: 599.99,
    colors: ["Black", "Blue"],
    productImage:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
    ],
    category: "6a8c269b97bedbd9cde3f53a",
    subcategories: ["6a8c39978a5019788a1a010e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 367,
  },
  {
    title: "Budget Phone Plus",
    slug: "budget-phone-plus",
    description:
      "Affordable smartphone with long battery life, bright display, reliable performance, and modern design.",
    quantity: 72,
    sold: 35,
    price: 249.99,
    priceAfterDiscount: 219.99,
    colors: ["Black", "Blue", "Gray"],
    productImage:
      "https://images.unsplash.com/photo-1512499617640-c2f999098c01",
    images: [
      "https://images.unsplash.com/photo-1512499617640-c2f999098c01",
    ],
    category: "6a8c269b97bedbd9cde3f53a",
    subcategories: ["6a8c39978a5019788a1a010e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.2,
    ratingsQuantity: 189,
  },

  // ==================== Laptops ====================
  {
    title: "MacBook Pro 16",
    slug: "macbook-pro-16",
    description:
      "High-performance professional laptop with a stunning Retina display and powerful processor.",
    quantity: 12,
    sold: 8,
    price: 2499.99,
    priceAfterDiscount: 2399.99,
    colors: ["Space Gray", "Silver"],
    productImage:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    images: [
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    ],
    category: "6a8c26f197bedbd9cde3f53d",
    subcategories: ["6a8c39e28a5019788a1a0114"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.9,
    ratingsQuantity: 934,
  },
  {
    title: "Dell XPS 15",
    slug: "dell-xps-15",
    description:
      "Premium Windows laptop designed for productivity, software development, and creative professional work.",
    quantity: 17,
    sold: 13,
    price: 1799.99,
    priceAfterDiscount: 1699.99,
    colors: ["Silver"],
    productImage:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    ],
    category: "6a8c26f197bedbd9cde3f53d",
    subcategories: ["6a8c39e28a5019788a1a0114"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 562,
  },
  {
    title: "ThinkPad Business 14",
    slug: "thinkpad-business-14",
    description:
      "Reliable business laptop with an excellent keyboard, strong security features, and durable construction.",
    quantity: 29,
    sold: 17,
    price: 1099.99,
    priceAfterDiscount: 999.99,
    colors: ["Black"],
    productImage:
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef",
    images: [
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef",
    ],
    category: "6a8c26f197bedbd9cde3f53d",
    subcategories: ["6a8c39e28a5019788a1a0114"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 321,
  },
  {
    title: "Gaming Beast 17",
    slug: "gaming-beast-17",
    description:
      "Powerful gaming laptop with dedicated graphics, high refresh rate display, and advanced cooling system.",
    quantity: 9,
    sold: 21,
    price: 1899.99,
    priceAfterDiscount: 1799.99,
    colors: ["Black"],
    productImage:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    ],
    category: "6a8c26f197bedbd9cde3f53d",
    subcategories: ["6a8c39e28a5019788a1a0114"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.8,
    ratingsQuantity: 445,
  },
  {
    title: "Student Laptop Air",
    slug: "student-laptop-air",
    description:
      "Lightweight and affordable laptop ideal for students, browsing, office work, and everyday tasks.",
    quantity: 54,
    sold: 32,
    price: 599.99,
    priceAfterDiscount: 549.99,
    colors: ["Silver", "Gray"],
    productImage:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    ],
    category: "6a8c26f197bedbd9cde3f53d",
    subcategories: ["6a8c39e28a5019788a1a0114"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.3,
    ratingsQuantity: 276,
  },

  // ==================== Fashion ====================
  {
    title: "Classic Cotton T-Shirt",
    slug: "classic-cotton-t-shirt",
    description:
      "Comfortable premium cotton t-shirt suitable for everyday wear with a soft and breathable fabric.",
    quantity: 120,
    sold: 46,
    price: 24.99,
    priceAfterDiscount: 19.99,
    colors: ["Black", "White", "Navy", "Gray"],
    productImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    category: "6a8c28b397bedbd9cde3f540",
    subcategories: ["6a8c39ff8a5019788a1a0118"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 198,
  },
  {
    title: "Premium Denim Jacket",
    slug: "premium-denim-jacket",
    description:
      "Classic denim jacket with a modern fit, durable construction, and timeless everyday style.",
    quantity: 41,
    sold: 18,
    price: 89.99,
    priceAfterDiscount: 79.99,
    colors: ["Blue", "Black"],
    productImage:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    ],
    category: "6a8c28b397bedbd9cde3f540",
    subcategories: ["6a8c39ff8a5019788a1a0118"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 154,
  },
  {
    title: "Slim Fit Chinos",
    slug: "slim-fit-chinos",
    description:
      "Modern slim-fit chinos made from stretch cotton fabric for comfort and everyday versatility.",
    quantity: 63,
    sold: 27,
    price: 54.99,
    priceAfterDiscount: 44.99,
    colors: ["Beige", "Black", "Navy"],
    productImage:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    ],
    category: "6a8c28b397bedbd9cde3f540",
    subcategories: ["6a8c39ff8a5019788a1a0118"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.3,
    ratingsQuantity: 132,
  },
  {
    title: "Leather Sneakers",
    slug: "leather-sneakers",
    description:
      "Minimalist leather sneakers designed for comfort, durability, and everyday casual style.",
    quantity: 47,
    sold: 22,
    price: 99.99,
    priceAfterDiscount: 89.99,
    colors: ["White", "Black"],
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    ],
    category: "6a8c28b397bedbd9cde3f540",
    subcategories: ["6a8c39ff8a5019788a1a0118"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 389,
  },
  {
    title: "Classic Baseball Cap",
    slug: "classic-baseball-cap",
    description:
      "Adjustable cotton baseball cap with a timeless design suitable for casual everyday outfits.",
    quantity: 86,
    sold: 31,
    price: 19.99,
    priceAfterDiscount: 16.99,
    colors: ["Black", "White", "Navy"],
    productImage:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    ],
    category: "6a8c28b397bedbd9cde3f540",
    subcategories: ["6a8c39ff8a5019788a1a0118"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.2,
    ratingsQuantity: 97,
  },

  // ==================== Home & Kitchen ====================
  {
    title: "Modern Coffee Maker",
    slug: "modern-coffee-maker",
    description:
      "Programmable coffee maker with multiple brewing modes, reusable filter, and modern compact design.",
    quantity: 36,
    sold: 19,
    price: 79.99,
    priceAfterDiscount: 69.99,
    colors: ["Black", "Silver"],
    productImage:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
    ],
    category: "6a8c290d97bedbd9cde3f543",
    subcategories: ["6a8c3a158a5019788a1a011c"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 245,
  },
  {
    title: "Non-Stick Cookware Set",
    slug: "non-stick-cookware-set",
    description:
      "Complete ten-piece cookware set with durable non-stick coating and comfortable heat-resistant handles.",
    quantity: 28,
    sold: 14,
    price: 129.99,
    priceAfterDiscount: 114.99,
    colors: ["Black", "Gray"],
    productImage:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
    ],
    category: "6a8c290d97bedbd9cde3f543",
    subcategories: ["6a8c3a158a5019788a1a011c"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 318,
  },
  {
    title: "Smart Air Fryer",
    slug: "smart-air-fryer",
    description:
      "Digital air fryer with multiple cooking presets, adjustable temperature, and smart control features.",
    quantity: 33,
    sold: 25,
    price: 109.99,
    priceAfterDiscount: 94.99,
    colors: ["Black", "White"],
    productImage:
      "https://images.unsplash.com/photo-1648131983257-3c8f2b6cdb7a",
    images: [
      "https://images.unsplash.com/photo-1648131983257-3c8f2b6cdb7a",
    ],
    category: "6a8c290d97bedbd9cde3f543",
    subcategories: ["6a8c3a158a5019788a1a011c"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 432,
  },
  {
    title: "Minimalist Table Lamp",
    slug: "minimalist-table-lamp",
    description:
      "Elegant LED table lamp with adjustable brightness and a clean minimalist design for modern interiors.",
    quantity: 52,
    sold: 21,
    price: 44.99,
    priceAfterDiscount: 39.99,
    colors: ["White", "Black"],
    productImage:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    ],
    category: "6a8c290d97bedbd9cde3f543",
    subcategories: ["6a8c3a158a5019788a1a011c"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 126,
  },
  {
    title: "Modern Wall Clock",
    slug: "modern-wall-clock",
    description:
      "Minimalist wall clock designed for modern interiors with a silent movement and elegant appearance.",
    quantity: 44,
    sold: 17,
    price: 39.99,
    priceAfterDiscount: 34.99,
    colors: ["Black", "White"],
    productImage:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    ],
    category: "6a8c290d97bedbd9cde3f543",
    subcategories: ["6a8c3a158a5019788a1a011c"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.3,
    ratingsQuantity: 88,
  },

  // ==================== Sports ====================
  {
    title: "Professional Running Shoes",
    slug: "professional-running-shoes",
    description:
      "Lightweight professional running shoes with responsive cushioning and breathable upper material.",
    quantity: 58,
    sold: 32,
    price: 119.99,
    priceAfterDiscount: 104.99,
    colors: ["Black", "White", "Red"],
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    ],
    category: "6a8c29d097bedbd9cde3f546",
    subcategories: ["6a8c3a328a5019788a1a0120"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.8,
    ratingsQuantity: 534,
  },
  {
    title: "Premium Yoga Mat",
    slug: "premium-yoga-mat",
    description:
      "Non-slip eco-friendly yoga mat with excellent cushioning and comfortable surface for daily workouts.",
    quantity: 74,
    sold: 29,
    price: 34.99,
    priceAfterDiscount: 29.99,
    colors: ["Purple", "Black", "Green"],
    productImage:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
    ],
    category: "6a8c29d097bedbd9cde3f546",
    subcategories: ["6a8c3a328a5019788a1a0120"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 287,
  },
  {
    title: "Adjustable Dumbbell Set",
    slug: "adjustable-dumbbell-set",
    description:
      "Space-saving adjustable dumbbells suitable for strength training and home workout routines.",
    quantity: 25,
    sold: 16,
    price: 149.99,
    priceAfterDiscount: 134.99,
    colors: ["Black"],
    productImage:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    ],
    category: "6a8c29d097bedbd9cde3f546",
    subcategories: ["6a8c3a328a5019788a1a0120"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 376,
  },
  {
    title: "Fitness Resistance Bands",
    slug: "fitness-resistance-bands",
    description:
      "Set of five resistance bands with different resistance levels for full-body home workouts.",
    quantity: 91,
    sold: 43,
    price: 29.99,
    priceAfterDiscount: 24.99,
    colors: ["Black", "Red", "Green", "Blue"],
    productImage:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc",
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc",
    ],
    category: "6a8c29d097bedbd9cde3f546",
    subcategories: ["6a8c3a328a5019788a1a0120"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 219,
  },
  {
    title: "Basketball Pro",
    slug: "basketball-pro",
    description:
      "Official-size basketball with excellent grip, durable construction, and consistent bounce performance.",
    quantity: 48,
    sold: 21,
    price: 39.99,
    priceAfterDiscount: 34.99,
    colors: ["Orange"],
    productImage:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    images: [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    ],
    category: "6a8c29d097bedbd9cde3f546",
    subcategories: ["6a8c3a328a5019788a1a0120"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 145,
  },

  // ==================== Beauty ====================
  {
    title: "Hydrating Face Cream",
    slug: "hydrating-face-cream",
    description:
      "Daily moisturizing face cream suitable for all skin types with a lightweight and non-greasy formula.",
    quantity: 67,
    sold: 31,
    price: 29.99,
    priceAfterDiscount: 24.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    ],
    category: "6a8c2a2b97bedbd9cde3f549",
    subcategories: ["6a8c3a478a5019788a1a0124"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 321,
  },
  {
    title: "Vitamin C Serum",
    slug: "vitamin-c-serum",
    description:
      "Brightening facial serum enriched with vitamin C and antioxidants to support healthy glowing skin.",
    quantity: 54,
    sold: 26,
    price: 39.99,
    priceAfterDiscount: 34.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    ],
    category: "6a8c2a2b97bedbd9cde3f549",
    subcategories: ["6a8c3a478a5019788a1a0124"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 458,
  },
  {
    title: "Luxury Perfume",
    slug: "luxury-perfume",
    description:
      "Elegant long-lasting fragrance with balanced woody, floral, and fresh notes suitable for special occasions.",
    quantity: 39,
    sold: 18,
    price: 89.99,
    priceAfterDiscount: 79.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1541643600914-78b084683601",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601",
    ],
    category: "6a8c2a2b97bedbd9cde3f549",
    subcategories: ["6a8c3a478a5019788a1a0124"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.8,
    ratingsQuantity: 612,
  },
  {
    title: "Professional Hair Dryer",
    slug: "professional-hair-dryer",
    description:
      "High-performance hair dryer with multiple heat settings, powerful airflow, and ergonomic design.",
    quantity: 43,
    sold: 17,
    price: 69.99,
    priceAfterDiscount: 59.99,
    colors: ["Black", "White"],
    productImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    ],
    category: "6a8c2a2b97bedbd9cde3f549",
    subcategories: ["6a8c3a478a5019788a1a0124"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 198,
  },
  {
    title: "Makeup Brush Set",
    slug: "makeup-brush-set",
    description:
      "Complete professional makeup brush set with soft synthetic bristles for precise and comfortable application.",
    quantity: 76,
    sold: 35,
    price: 49.99,
    priceAfterDiscount: 39.99,
    colors: ["Black", "Pink"],
    productImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    ],
    category: "6a8c2a2b97bedbd9cde3f549",
    subcategories: ["6a8c3a478a5019788a1a0124"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 276,
  },

  // ==================== Books ====================
  {
    title: "Clean Code",
    slug: "clean-code",
    description:
      "A practical guide to writing clean, readable, maintainable, and professional software code.",
    quantity: 83,
    sold: 57,
    price: 34.99,
    priceAfterDiscount: 29.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    ],
    category: "6a8c2a8097bedbd9cde3f54c",
    subcategories: ["6a8c3ac48a5019788a1a013a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.9,
    ratingsQuantity: 1523,
  },
  {
    title: "The Pragmatic Programmer",
    slug: "the-pragmatic-programmer",
    description:
      "A classic software engineering book focused on practical development skills and professional programming practices.",
    quantity: 71,
    sold: 49,
    price: 39.99,
    priceAfterDiscount: 34.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    ],
    category: "6a8c2a8097bedbd9cde3f54c",
    subcategories: ["6a8c3ac48a5019788a1a013a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.9,
    ratingsQuantity: 1287,
  },
  {
    title: "Design Patterns",
    slug: "design-patterns",
    description:
      "Comprehensive introduction to reusable object-oriented software design patterns and principles.",
    quantity: 45,
    sold: 28,
    price: 44.99,
    priceAfterDiscount: 39.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    images: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    ],
    category: "6a8c2a8097bedbd9cde3f54c",
    subcategories: ["6a8c3ac48a5019788a1a013a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 743,
  },
  {
    title: "JavaScript Deep Dive",
    slug: "javascript-deep-dive",
    description:
      "Advanced guide to modern JavaScript concepts, asynchronous programming, functions, and development patterns.",
    quantity: 62,
    sold: 36,
    price: 42.99,
    priceAfterDiscount: 37.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1517842645767-c639042777db",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db",
    ],
    category: "6a8c2a8097bedbd9cde3f54c",
    subcategories: ["6a8c3ac48a5019788a1a013a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 492,
  },
  {
    title: "Atomic Habits",
    slug: "atomic-habits",
    description:
      "Practical strategies for building good habits, breaking bad habits, and improving everyday behavior.",
    quantity: 95,
    sold: 74,
    price: 24.99,
    priceAfterDiscount: 21.99,
    colors: [],
    productImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    ],
    category: "6a8c2a8097bedbd9cde3f54c",
    subcategories: ["6a8c3ac48a5019788a1a013a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.8,
    ratingsQuantity: 2156,
  },

  // ==================== Gaming ====================
  {
    title: "Gaming Mouse Pro",
    slug: "gaming-mouse-pro",
    description:
      "High-precision gaming mouse with customizable RGB lighting, programmable buttons, and ergonomic design.",
    quantity: 64,
    sold: 29,
    price: 69.99,
    priceAfterDiscount: 59.99,
    colors: ["Black", "White"],
    productImage:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    ],
    category: "6a8c2b4f97bedbd9cde3f54f",
    subcategories: ["6a8c3aad8a5019788a1a0136"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 428,
  },
  {
    title: "Gaming Headset",
    slug: "gaming-headset",
    description:
      "Immersive surround-sound gaming headset with noise isolation, clear microphone, and comfortable ear cushions.",
    quantity: 47,
    sold: 24,
    price: 99.99,
    priceAfterDiscount: 84.99,
    colors: ["Black", "White"],
    productImage:
      "https://images.unsplash.com/photo-1599669454699-248893623440",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440",
    ],
    category: "6a8c2b4f97bedbd9cde3f54f",
    subcategories: ["6a8c3aad8a5019788a1a0136"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 367,
  },
  {
    title: "Gaming Controller",
    slug: "gaming-controller",
    description:
      "Wireless gaming controller with ergonomic design, responsive buttons, and low-latency connectivity.",
    quantity: 52,
    sold: 31,
    price: 59.99,
    priceAfterDiscount: 49.99,
    colors: ["Black", "White", "Blue"],
    productImage:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
    images: [
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
    ],
    category: "6a8c2b4f97bedbd9cde3f54f",
    subcategories: ["6a8c3aad8a5019788a1a0136"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 289,
  },
  {
    title: "RGB Gaming Desk",
    slug: "rgb-gaming-desk",
    description:
      "Spacious gaming desk with cable management, RGB lighting, and a durable large desktop surface.",
    quantity: 18,
    sold: 12,
    price: 199.99,
    priceAfterDiscount: 179.99,
    colors: ["Black"],
    productImage:
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f",
    images: [
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f",
    ],
    category: "6a8c2b4f97bedbd9cde3f54f",
    subcategories: ["6a8c3aad8a5019788a1a0136"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 176,
  },
  {
    title: "Gaming Chair Pro",
    slug: "gaming-chair-pro",
    description:
      "Ergonomic gaming chair with lumbar support, adjustable armrests, reclining backrest, and premium padding.",
    quantity: 14,
    sold: 19,
    price: 249.99,
    priceAfterDiscount: 224.99,
    colors: ["Black", "Red"],
    productImage:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
    ],
    category: "6a8c2b4f97bedbd9cde3f54f",
    subcategories: ["6a8c3aad8a5019788a1a0136"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 341,
  },

  // ==================== Accessories ====================
  {
    title: "Leather Wallet",
    slug: "leather-wallet",
    description:
      "Slim genuine leather wallet with multiple card slots, cash compartment, and compact everyday design.",
    quantity: 82,
    sold: 38,
    price: 39.99,
    priceAfterDiscount: 34.99,
    colors: ["Black", "Brown"],
    productImage:
      "https://images.unsplash.com/photo-1627123424574-724758594e93",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93",
    ],
    category: "6a8c2c2b97bedbd9cde3f555",
    subcategories: ["6a8c3a7e8a5019788a1a012e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 143,
  },
  {
    title: "Classic Sunglasses",
    slug: "classic-sunglasses",
    description:
      "Timeless sunglasses with UV protection, lightweight frames, and a comfortable fit for everyday use.",
    quantity: 73,
    sold: 41,
    price: 59.99,
    priceAfterDiscount: 49.99,
    colors: ["Black", "Brown"],
    productImage:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    ],
    category: "6a8c2c2b97bedbd9cde3f555",
    subcategories: ["6a8c3a7e8a5019788a1a012e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 218,
  },
  {
    title: "Minimalist Backpack",
    slug: "minimalist-backpack",
    description:
      "Water-resistant backpack with a dedicated laptop compartment, comfortable straps, and modern design.",
    quantity: 49,
    sold: 26,
    price: 79.99,
    priceAfterDiscount: 69.99,
    colors: ["Black", "Gray", "Green"],
    productImage:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    ],
    category: "6a8c2c2b97bedbd9cde3f555",
    subcategories: ["6a8c3a7e8a5019788a1a012e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 367,
  },
  {
    title: "Classic Wrist Watch",
    slug: "classic-wrist-watch",
    description:
      "Elegant analog wrist watch with stainless steel case, reliable movement, and timeless design.",
    quantity: 31,
    sold: 14,
    price: 129.99,
    priceAfterDiscount: 114.99,
    colors: ["Silver", "Black", "Gold"],
    productImage:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    ],
    category: "6a8c2c2b97bedbd9cde3f555",
    subcategories: ["6a8c3a7e8a5019788a1a012e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 256,
  },
  {
    title: "Travel Organizer",
    slug: "travel-organizer",
    description:
      "Compact travel organizer for passports, cards, documents, cables, and other essential travel items.",
    quantity: 91,
    sold: 34,
    price: 29.99,
    priceAfterDiscount: 24.99,
    colors: ["Black", "Brown"],
    productImage:
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd",
    images: [
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd",
    ],
    category: "6a8c2c2b97bedbd9cde3f555",
    subcategories: ["6a8c3a7e8a5019788a1a012e"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.3,
    ratingsQuantity: 91,
  },

  // ==================== Furniture ====================
  {
    title: "Modern Office Chair",
    slug: "modern-office-chair",
    description:
      "Ergonomic office chair with adjustable height, lumbar support, breathable backrest, and comfortable padding.",
    quantity: 26,
    sold: 13,
    price: 179.99,
    priceAfterDiscount: 159.99,
    colors: ["Black", "Gray"],
    productImage:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    ],
    category: "6a8c2bb797bedbd9cde3f552",
    subcategories: ["6a8c3a958a5019788a1a0132"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 287,
  },
  {
    title: "Minimalist Coffee Table",
    slug: "minimalist-coffee-table",
    description:
      "Modern wooden coffee table with a clean minimalist design suitable for contemporary living rooms.",
    quantity: 19,
    sold: 8,
    price: 149.99,
    priceAfterDiscount: 134.99,
    colors: ["Oak", "Walnut"],
    productImage:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d",
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d",
    ],
    category: "6a8c2bb797bedbd9cde3f552",
    subcategories: ["6a8c3a958a5019788a1a0132"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 132,
  },
  {
    title: "Modern Bookshelf",
    slug: "modern-bookshelf",
    description:
      "Five-tier bookshelf designed for modern living spaces with a sturdy frame and spacious storage.",
    quantity: 22,
    sold: 11,
    price: 119.99,
    priceAfterDiscount: 104.99,
    colors: ["White", "Black", "Oak"],
    productImage:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156",
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156",
    ],
    category: "6a8c2bb797bedbd9cde3f552",
    subcategories: ["6a8c3a958a5019788a1a0132"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 109,
  },
  {
    title: "Queen Bed Frame",
    slug: "queen-bed-frame",
    description:
      "Sturdy modern queen-size bed frame with a minimalist upholstered headboard and strong support system.",
    quantity: 11,
    sold: 6,
    price: 399.99,
    priceAfterDiscount: 359.99,
    colors: ["Gray", "Beige"],
    productImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    ],
    category: "6a8c2bb797bedbd9cde3f552",
    subcategories: ["6a8c3a958a5019788a1a0132"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.7,
    ratingsQuantity: 198,
  },
  {
    title: "Modern Floor Lamp",
    slug: "modern-floor-lamp",
    description:
      "Elegant floor lamp with adjustable directional lighting and modern minimalist metal construction.",
    quantity: 35,
    sold: 17,
    price: 89.99,
    priceAfterDiscount: 79.99,
    colors: ["Black", "Gold"],
    productImage:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    ],
    category: "6a8c2bb797bedbd9cde3f552",
    subcategories: ["6a8c3a958a5019788a1a0132"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.3,
    ratingsQuantity: 87,
  },

  // ==================== Automotive ====================
  {
    title: "Car Phone Mount",
    slug: "car-phone-mount",
    description:
      "Universal dashboard phone mount with a strong adjustable grip and easy one-hand operation.",
    quantity: 94,
    sold: 48,
    price: 24.99,
    priceAfterDiscount: 19.99,
    colors: ["Black"],
    productImage:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a",
    images: [
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a",
    ],
    category: "6a8c2c8197bedbd9cde3f558",
    subcategories: ["6a8c3a6a8a5019788a1a012a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.4,
    ratingsQuantity: 234,
  },
  {
    title: "Car Vacuum Cleaner",
    slug: "car-vacuum-cleaner",
    description:
      "Compact high-power vacuum cleaner designed specifically for cleaning car interiors and hard-to-reach areas.",
    quantity: 41,
    sold: 23,
    price: 49.99,
    priceAfterDiscount: 44.99,
    colors: ["Black", "Gray"],
    productImage:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001",
    ],
    category: "6a8c2c8197bedbd9cde3f558",
    subcategories: ["6a8c3a6a8a5019788a1a012a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 176,
  },
  {
    title: "LED Car Interior Lights",
    slug: "led-car-interior-lights",
    description:
      "Multicolor LED interior lighting kit with remote control and multiple brightness modes.",
    quantity: 68,
    sold: 34,
    price: 34.99,
    priceAfterDiscount: 29.99,
    colors: ["RGB"],
    productImage:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    ],
    category: "6a8c2c8197bedbd9cde3f558",
    subcategories: ["6a8c3a6a8a5019788a1a012a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.3,
    ratingsQuantity: 142,
  },
  {
    title: "Car Emergency Kit",
    slug: "car-emergency-kit",
    description:
      "Comprehensive roadside emergency kit containing essential tools for unexpected vehicle situations.",
    quantity: 37,
    sold: 15,
    price: 69.99,
    priceAfterDiscount: 59.99,
    colors: ["Black", "Red"],
    productImage:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc",
    images: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc",
    ],
    category: "6a8c2c8197bedbd9cde3f558",
    subcategories: ["6a8c3a6a8a5019788a1a012a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.6,
    ratingsQuantity: 205,
  },
  {
    title: "Premium Car Cleaning Kit",
    slug: "premium-car-cleaning-kit",
    description:
      "Complete car cleaning kit with microfiber towels, brushes, and cleaning accessories for vehicle detailing.",
    quantity: 56,
    sold: 27,
    price: 44.99,
    priceAfterDiscount: 39.99,
    colors: ["Black"],
    productImage:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24",
    ],
    category: "6a8c2c8197bedbd9cde3f558",
    subcategories: ["6a8c3a6a8a5019788a1a012a"],
    brand: "6a8c3c6f5a8e09afd0149183",
    ratingsAverage: 4.5,
    ratingsQuantity: 156,
  },
];


const DB = process.env.CONNECTION_STRING

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Database connected successfully');

    await productsModel.deleteMany();
    console.log('Products deleted');

    await productsModel.insertMany(products);
    console.log('Products inserted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

connectDB();