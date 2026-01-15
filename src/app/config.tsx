
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const supabaseUrl = "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images";

export const config = {
  header: {
    utilityBar: {
      promoText: "Fast, Free, and Contactless Delivery",
    },
    logoUrl: `${supabaseUrl}/logo.svg`,
    navLinks: [
      { id: "birthday", label: "Birthday", href: "#" },
      { id: "anniversary", label: "Anniversary", href: "#" },
      { id: "cakes", label: "Cakes", href: "#" },
      { id: "flowers", label: "Flowers", href: "#" },
      { id: "plants", label: "Plants", href: "#" },
      { id: "gifts", label: "Gifts", href: "#" },
      { id: "personalised", label: "Personalised", href: "#" },
      { id: "combos", label: "Combos", href: "#" },
    ],
  },
  hero: {
    banners: [
      { imageUrl: `https://picsum.photos/seed/1/1280/720`, alt: "Promotional Banner 1" },
      { imageUrl: `https://picsum.photos/seed/2/1280/720`, alt: "Promotional Banner 2" },
      { imageUrl: `https://picsum.photos/seed/3/1280/720`, alt: "Promotional Banner 3" },
      { imageUrl: `https://picsum.photos/seed/4/1280/720`, alt: "Promotional Banner 4" },
    ],
  },
  iconCategories: [
    { label: "All Gifts", imageUrl: `${supabaseUrl}/icon-all-gifts.png`, href: "#" },
    { label: "Flowers", imageUrl: `${supabaseUrl}/icon-flowers.png`, href: "#" },
    { label: "Cakes", imageUrl: `${supabaseUrl}/icon-cakes.png`, href: "#" },
    { label: "Birthday", imageUrl: `${supabaseUrl}/icon-birthday.png`, href: "#" },
    { label: "Anniversary", imageUrl: `${supabaseUrl}/icon-anniversary.png`, href: "#" },
    { label: "Personalised", imageUrl: `${supabaseUrl}/icon-personalised.png`, href: "#" },
    { label: "Plants", imageUrl: `${supabaseUrl}/icon-plants.png`, href: "#" },
    { label: "Combos", imageUrl: `${supabaseUrl}/icon-combos.png`, href: "#" },
  ],
  serviceStrip: {
    title: "Bulk orders are acceptable",
  },
  productSections: {
    bestSellingCakes: [
      { id: "1", name: "Birthday Delight Cake", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/birthday%20delight%20350.jpeg", description: "A festive treat to make any birthday special.", badge: "BESTSELLER" },
      { id: "2", name: "Classic Black Forest Cake", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Black%20forest450%20.jpeg", description: "Layers of chocolate, cream, and cherries." },
      { id: "3", name: "Sweet Butterscotch Cake", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20400.jpeg", description: "Rich with crunchy butterscotch bits." },
      { id: "4", name: "Choco Blush Cake", price: "500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20blush%20500.jpeg", description: "A beautiful and delicious chocolate creation.", badge: "PREMIUM" },
    ],
    gifts: [
        { id: "g1", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/coffee-mug-199.jpg", description: "A classic mug for your daily coffee." },
        { id: "g2", name: "Colour Mug", price: "280", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/color-mug-280.jpg", description: "A vibrant mug to brighten your day." },
        { id: "g3", name: "Black Mug", price: "299", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/black-mug-299.jpg", description: "A sleek and stylish black mug." },
        { id: "g4", name: "Black Mug (Premium)", price: "330", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/black-mug-330.jpg", description: "A premium quality sleek black mug." },
        { id: "g5", name: "Magic Mug", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/magic-mug-350.jpg", description: "Reveals a surprise image with hot liquid." },
        { id: "g6", name: "Magic Mug (Premium)", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/magic-mug-399.jpg", description: "Customizable mug that reveals your image." },
        { id: "g7", name: "LED Mirror", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-mirror-350.jpg", description: "A stylish mirror with built-in LED lights." },
        { id: "g8", name: "Mirror Frame (Heart/Round)", price: "349", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/mirror-frame-349.jpg", description: "A unique shaped mirror frame for your pictures." },
        { id: "g9", name: "Pair Combo Gift", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/pair-combo-399.jpg", description: "A perfect gift set for a couple." }
    ],
    personalisedFrames: [
        { id: "pf1", name: "Customized Photo Frame (Normal)", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/customized-photo-frame-350.jpg", description: "A classic frame for your cherished photos." },
        { id: "pf2", name: "Normal Frame (8x12)", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/normal-frame-350.jpg", description: "Standard 8x12 inch photo frame." },
        { id: "pf3", name: "LED Frame (8x12)", price: "499", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-frame-499.jpg", description: "An 8x12 inch frame with LED illumination." },
        { id: "pf4", name: "LED Frame (12x18)", price: "799", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-frame-799.jpg", description: "A large 12x18 inch frame with LED illumination." },
        { id: "pf5", name: "LED Frame", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-frame-800.jpg", description: "A beautiful LED illuminated photo frame." },
        { id: "pf6", name: "LED Premium Frame", price: "650", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-premium-frame-650.jpg", description: "Premium quality LED frame, includes photo printing." },
        { id: "pf7", "name": "LED Premium Frame (Large)", "price": "800", "imageUrl": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-premium-frame-800.jpg", "description": "Top-tier premium LED illuminated photo frame." }
    ],
    personalisedMugsAndCushions: [
      { id: "pm1", name: "Customized White Mug", price: "249", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/custom-white-mug-249.jpg", description: "A classic white mug, personalized for you." },
      { id: "pm2", name: "Customized Mug", price: "249", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/custom-mug-249.jpg", description: "Your personal design on a quality mug." },
      { id: "pm3", name: "Magic Mug (Customized)", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/magic-mug-custom-350.jpg", description: "Pour in hot liquid to reveal your custom image." },
      { id: "pm4", name: "Magic Mug (Customized, Premium)", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/magic-mug-custom-399.jpg", description: "Premium version of the custom magic mug." },
      { id: "pm5", name: "Customized Cushion", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/custom-cushion-550.jpg", description: "A soft, personalized cushion for your home." }
    ],
  },
  giftFinder: {
    title: "Looking for a perfect gift?",
    subtitle: "Use our gift finder",
    imageUrl: `${supabaseUrl}/gift-finder.png`,
    options: [
      { label: "For Who?", type: "who" },
      { label: "What Occasion?", type: "occasion" },
      { label: "What's Your Budget?", type: "budget" },
    ]
  },
  collections: {
    flowers: [
        { title: "Roses", imageUrl: "https://images.unsplash.com/photo-1518621736915-f3b17a1d02b2?w=500&auto=format&fit=crop" },
        { title: "Lilies", imageUrl: "https://images.unsplash.com/photo-1502978379013-094950a51928?w=500&auto=format&fit=crop" },
        { title: "Carnations", imageUrl: "https://images.unsplash.com/photo-1600851893991-c75f32187d97?w=500&auto=format&fit=crop" },
        { title: "Orchids", imageUrl: "https://images.unsplash.com/photo-1519323719453-7313a1e50e94?w=500&auto=format&fit=crop" },
        { title: "Mixed Flowers", imageUrl: "https://images.unsplash.com/photo-1533616688484-a461e5a6c387?w=500&auto=format&fit=crop" },
    ],
    cakes: [
        { id: "dc1", title: "Choco Cafe Cake", description: "A rich coffee and chocolate blend.", price: "430", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20430%20.jpeg" },
        { id: "dc2", title: "Choco Crunch Cake", description: "A crunchy, chocolatey delight.", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20crunch%20400.jpeg" },
        { id: "dc3", title: "Choco Heart Cake", description: "A lovely heart-shaped chocolate cake.", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20heart%20550.jpeg" },
        { id: "dc4", title: "Choco KitKat Cake", description: "Loaded with delicious KitKat bars.", price: "480", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20kitkat%20480.jpeg" },
        { id: "dc5", title: "Choco Oreo Blush Cake", description: "A beautiful blend of Oreo and chocolate.", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20oreo%20blush%20450%20.jpeg" },
        { id: "dc6", title: "Doll Cake", description: "A beautiful doll-themed cake for a princess.", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doll%20cake%20800.jpeg" },
    ]
  },
  footer: {
    about: "Discover the perfect gift for every occasion. We are your one-stop destination for gifts, cakes, flowers, and more, offering reliable domestic delivery.",
    paymentIconsUrl: `${supabaseUrl}/payment-icons.png`,
    copyright: `© ${new Date().getFullYear()} Ferns & Petals. All rights reserved.`,
    social: [
      { label: "Facebook", Icon: Facebook, href: "#" },
      { label: "Instagram", Icon: Instagram, href: "#" },
      { label: "Twitter", Icon: Twitter, href: "#" },
      { label: "Youtube", Icon: Youtube, href: "#" },
    ],
    links: {
      help: [
        { label: "Track Your Order", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Customer Reviews", href: "#" },
      ],
      business: [
        { label: "Corporate Gifting", href: "#" },
        { label: "Franchise", href: "#" },
        { label: "Affiliate Program", href: "#" },
      ],
      policies: [
        { label: "Terms & Conditions", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Sitemap", href: "#" },
      ]
    }
  }
};
