
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
      { imageUrl: `${supabaseUrl}/hero-banner-1.jpg`, alt: "Anniversary Gifts" },
      { imageUrl: `${supabaseUrl}/hero-banner-2.jpg`, alt: "Birthday Gifts" },
      { imageUrl: `${supabaseUrl}/hero-banner-3.jpg`, alt: "Same Day Delivery" },
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
  serviceStrip: [
    { title: "Get Today", description: "Same Day Delivery", imageUrl: `${supabaseUrl}/service-get-today.png` },
    { title: "Midnight", description: "Midnight Delivery", imageUrl: `${supabaseUrl}/service-midnight.png` },
    { title: "Just Launched", description: "New Arrivals", imageUrl: `${supabaseUrl}/service-just-launched.png` },
    { title: "Send in Bulk", description: "Bulk Orders", imageUrl: `${supabaseUrl}/service-send-in-bulk.png` },
  ],
  productSections: {
    bestSellingCakes: [
      { id: "1", name: "Birthday Delight Cake", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/birthday%20delight%20350.jpeg", description: "A festive treat to make any birthday special.", badge: "BESTSELLER" },
      { id: "2", name: "Classic Black Forest Cake", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Black%20forest450%20.jpeg", description: "Layers of chocolate, cream, and cherries." },
      { id: "3", name: "Sweet Butterscotch Cake", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20400.jpeg", description: "Rich with crunchy butterscotch bits." },
      { id: "4", name: "Choco Blush Cake", price: "500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20blush%20500.jpeg", description: "A beautiful and delicious chocolate creation.", badge: "PREMIUM" },
    ],
    customGiftsMugs: [
      { id: "cg1", name: "Customized White Mug", price: "249", imageUrl: "https://picsum.photos/seed/mug1/400/400", description: "A classic white mug, personalized for you." },
      { id: "cg2", name: "Customized Colour Mug", price: "280", imageUrl: "https://picsum.photos/seed/mug2/400/400", description: "Add a splash of color to your daily coffee." },
      { id: "cg3", name: "Customized Black Mug", price: "299", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/black%20mug%20330.jpeg", description: "A sleek and stylish personalized black mug." },
      { id: "cg4", name: "Magic Mug", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/magic-mug-399.jpg", description: "Pour in a hot drink and watch your image appear!" },
      { id: "cg5", name: "Customized Cushion", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hero%20images/ChatGPT%20Image%20Jan%2015,%202026,%2011_24_37%20PM.png", description: "A soft, personalized cushion for your home." },
    ],
    customGiftsFrames: [
      { id: "cf1", name: "Customized Normal Frame (8x12)", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/customized-photo-frame-350.jpg", description: "Frame your favorite memories in a classic 8x12 frame." },
      { id: "cf2", name: "Customized LED Frame (8x12)", price: "499", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-frame-800.jpg", description: "Light up your photos with a stunning LED frame." },
      { id: "cf3", name: "Customized LED Frame (12x18)", price: "799", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-premium-frame-650.jpg", description: "A larger LED frame for your most cherished moments." },
      { id: "cf4", name: "Heart/Round Mirror Frame", price: "349", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/led-mirror-350.jpg", description: "A unique and stylish mirror frame for your pictures." },
    ],
  },
  paymentBanners: {
    partners: { imageUrl: `${supabaseUrl}/payment-partners.png`, alt: "Payment partners" },
    appDownload: { imageUrl: `${supabaseUrl}/app-download-banner.png`, alt: "Download the app" },
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

    