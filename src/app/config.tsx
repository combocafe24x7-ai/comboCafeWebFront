
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
      { id: "1", name: "Birthday Delight Cake", price: "Rs. 350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/birthday%20delight%20350.jpeg", description: "A festive treat to make any birthday special.", badge: "BESTSELLER" },
      { id: "2", name: "Classic Black Forest Cake", price: "Rs. 450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Black%20forest450%20.jpeg", description: "Layers of chocolate, cream, and cherries." },
      { id: "3", name: "Sweet Butterscotch Cake", price: "Rs. 400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20400.jpeg", description: "Rich with crunchy butterscotch bits." },
      { id: "4", name: "Choco Blush Cake", price: "Rs. 500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20blush%20500.jpeg", description: "A beautiful and delicious chocolate creation.", badge: "PREMIUM" },
    ],
    birthdaySpecial: [
      { id: "5", name: "Personalised Birthday Mug", price: "Rs. 349", imageUrl: `${supabaseUrl}/prod-bday-1.jpg`, description: "A custom mug for a personal touch." },
      { id: "6", name: "Elegant Birthday Flower Bouquet", price: "Rs. 899", imageUrl: `${supabaseUrl}/prod-bday-2.jpg`, description: "Fresh blooms to celebrate their day.", badge: "BESTSELLER" },
      { id: "7", name: "Birthday Explosion Box", price: "Rs. 799", imageUrl: `${supabaseUrl}/prod-bday-3.jpg`, description: "A surprise in every layer.", badge: "NEW" },
      { id: "8", name: "Zodiac Sign Hamper", price: "Rs. 1299", imageUrl: `${supabaseUrl}/prod-bday-4.jpg`, description: "A gift tailored to their star sign." },
    ],
    anniversaryGifts: [
      { id: "9", name: "Forever Rose in Glass Dome", price: "Rs. 1499", imageUrl: `${supabaseUrl}/prod-anni-1.jpg`, description: "An everlasting symbol of your love.", badge: "PREMIUM" },
      { id: "10", name: "Personalised Couple Caricature", price: "Rs. 999", imageUrl: `${supabaseUrl}/prod-anni-2.jpg`, description: "A fun and quirky keepsake." },
      { id: "11", name: "Heart-Shaped Red Velvet Cake", price: "Rs. 749", imageUrl: `${supabaseUrl}/prod-anni-3.jpg`, description: "A romantic and delicious gesture." },
      { id: "12", name: "Anniversary Wine Glasses Set", price: "Rs. 1199", imageUrl: `${supabaseUrl}/prod-anni-4.jpg`, description: "Toast to your years together." },
    ]
  },
  occasionTabs: {
    title: "Gifts by Occasion",
    tabs: [
      { id: "for-her", label: "For Her" },
      { id: "for-him", label: "For Him" },
      { id: "for-kids", label: "For Kids" },
      { id: "for-parents", label: "For Parents" },
    ],
    products: {
      "for-her": [
        { id: "13", name: "Jewellery Box", price: "Rs. 899", imageUrl: `${supabaseUrl}/prod-her-1.jpg`, description: "An elegant box for her treasures." },
        { id: "14", name: "Scented Candle Set", price: "Rs. 699", imageUrl: `${supabaseUrl}/prod-her-2.jpg`, description: "Aromas to relax and soothe." },
        { id: "15", name: "Luxury Spa Hamper", price: "Rs. 1599", imageUrl: `${supabaseUrl}/prod-her-3.jpg`, description: "A pampering spa experience at home." },
        { id: "16", name: "Personalised Photo Frame", price: "Rs. 499", imageUrl: `${supabaseUrl}/prod-her-4.jpg`, description: "Capture a cherished memory." },
      ],
      "for-him": [
        { id: "17", name: "Leather Wallet & Belt Combo", price: "Rs. 1299", imageUrl: `${supabaseUrl}/prod-him-1.jpg`, description: "A classic and stylish accessory set." },
        { id: "18", name: "Grooming Kit", price: "Rs. 999", imageUrl: `${supabaseUrl}/prod-him-2.jpg`, description: "Everything he needs to look his best." },
        { id: "19", name: "Whiskey Decanter Set", price: "Rs. 2499", imageUrl: `${supabaseUrl}/prod-him-3.jpg`, description: "For the distinguished gentleman." },
        { id: "20", name: "Smart Watch", price: "Rs. 3499", imageUrl: `${supabaseUrl}/prod-him-4.jpg`, description: "Stay connected in style." },
      ],
      "for-kids": [
        { id: "21", name: "Plush Toy", price: "Rs. 599", imageUrl: `${supabaseUrl}/prod-kids-1.jpg`, description: "A cuddly friend for your little one." },
        { id: "22", name: "Remote Control Car", price: "Rs. 1199", imageUrl: `${supabaseUrl}/prod-kids-2.jpg`, description: "Hours of racing fun." },
      ],
      "for-parents": [
         { id: "23", name: "Personalised Mugs", price: "Rs. 699", imageUrl: `${supabaseUrl}/prod-parents-1.jpg`, description: "A daily reminder of your love." },
         { id: "24", name: "Indoor Plant", price: "Rs. 799", imageUrl: `${supabaseUrl}/prod-parents-2.jpg`, description: "A touch of green to brighten their home." },
      ]
    },
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
        { title: "Roses", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images/collection-roses.jpg" },
        { title: "Lilies", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images/collection-lilies.jpg" },
        { title: "Carnations", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images/collection-carnations.jpg" },
        { title: "Orchids", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images/collection-orchids.jpg" },
        { title: "Mixed Flowers", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images/collection-mixed.jpg" },
    ],
    cakes: [
        { title: "Choco Cafe Cake", description: "A rich coffee and chocolate blend.", price: "Rs. 430", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20430%20.jpeg" },
        { title: "Choco Crunch Cake", description: "A crunchy, chocolatey delight.", price: "Rs. 400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20crunch%20400.jpeg" },
        { title: "Choco Heart Cake", description: "A lovely heart-shaped chocolate cake.", price: "Rs. 550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20heart%20550.jpeg" },
        { title: "Choco KitKat Cake", description: "Loaded with delicious KitKat bars.", price: "Rs. 480", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20kitkat%20480.jpeg" },
        { title: "Choco Oreo Blush Cake", description: "A beautiful blend of Oreo and chocolate.", price: "Rs. 450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20oreo%20blush%20450%20.jpeg" },
        { title: "Doll Cake", description: "A beautiful doll-themed cake for a princess.", price: "Rs. 800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doll%20cake%20800.jpeg" },
        { title: "Doraemon Cake", description: "A fun cake for fans of the beloved character.", price: "Rs. 400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doraemon%20400.jpeg" },
        { title: "Mango Delight Cake", description: "A refreshing and fruity mango treat.", price: "Rs. 450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/mango%20delight%20450.jpeg" },
        { title: "Pineapple Cake", description: "A classic, light, and tangy pineapple cake.", price: "Rs. 350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/pineapple%20350.jpeg" },
        { title: "Christmas Cake", description: "A festive cake to celebrate the season.", price: "Rs. 400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/christmas%20cake%20400.jpeg" },
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

    