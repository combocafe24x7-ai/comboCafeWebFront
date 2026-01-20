
import { Facebook, Instagram, CakeSlice, Gift, Flower, Cookie, Home, BookOpen, PartyPopper, Heart, Sparkles, Package, MoreHorizontal } from "lucide-react";
import { GiChocolateBar } from "react-icons/gi";

const supabaseUrl = "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images";

export const config = {
  header: {
    utilityBar: {
      promoText: "Order Today, Receive Tomorrow",
    },
    logoUrl: `https://picsum.photos/seed/brand-logo/180/40`,
    navLinks: [
      { id: "cakes", label: "Cakes", href: "/cakes" },
      {
        id: "gifts",
        label: "Gifts",
        href: "/gifts",
        subLinks: [
          { id: "all-gifts", label: "All Gifts", href: "/gifts" },
          { id: "personalised-frames", label: "Personalised Frames", href: "/personalised-frames" },
          { id: "personalised-mugs-cushions", label: "Personalised Mugs & Cushions", href: "/personalised-gifts" },
        ]
      },
      { id: "food", label: "Food", href: "/food" },
      { id: "our-menu", label: "Our Menu", href: "/menu" },
      { id: "flowers", label: "Flowers & More", href: "/flowers" },
      { id: "about-us", label: "About Us", href: "/about" },
      { id: "contact-us", label: "Contact Us", href: "/contact" },
    ],
  },
  hero: {
    title: "ANNIVERSARY GIFTS",
    subtitle: "Perfect Products & Fresh Cakes",
    buttonText: "Shop Now",
    buttonLink: "#best-selling-cakes",
    imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/1ChatGPT%20Image%20Jan%2020,%202026,%2003_26_56%20PM_upscayl_2x_digital-art-4x.webp",
  },
  iconCategories: [
    { id: "cakes", label: "Cakes", href: "/cakes", Icon: CakeSlice },
    { id: "mugs", label: "Mugs", href: "/gifts", Icon: Gift },
    { id: "quick-bites", label: "Quick Bites", href: "/food", Icon: Cookie },
    { id: "flowers", label: "Flowers", href: "/flowers", Icon: Flower },
    { id: "combos", label: "Combos", href: "/flowers", Icon: Package },
    { id: "chocolates", label: "Chocolates", href: "/search?q=chocolate", Icon: GiChocolateBar },
    { id: "all-products", label: "All", href: "/", Icon: MoreHorizontal },
  ],
  serviceStrip: {
    title: "Bulk orders are acceptable",
  },
  freeDeliveryBanner: {
    imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2020,%202026,%2003_m33_32%20PM_upscayl_2x_digital-art-4x.webp",
    alt: "Free Delivery Banner"
  },
  menu: {
    title: "Our Menu",
    subtitle: "Explore our wide range of delicious offerings",
    images: [
      { id: "menu1", src: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/menu%201.png", alt: "Menu Page 1" },
      { id: "menu2", src: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/menu%202.png", alt: "Menu Page 2" },
      { id: "menu3", src: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/menu%203.png", alt: "Menu Page 3" },
      { id: "menu4", src: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/menu%204.png", alt: "Menu Page 4" },
      { id: "menu5", src: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/menu%205.png", alt: "Menu Page 5" },
      { id: "menu6", src: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/menu%206.png", alt: "Menu Page 6" },
    ]
  },
  productSections: {
    bestSellingCakes: [
      { id: "1", name: "Anniversary Gifts", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/vanilla%20heart%20400.jpeg", description: "A festive treat to make any birthday special.", badge: "BEST SELLER" },
      { id: "2", name: "Cake-Mug", price: "330", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(2)%20199.jpeg", description: "Layers of chocolate, cream, and cherries.", badge: "LIMITED STOCK" },
    ],
    allCakes: [
      { id: "c1", name: "Birthday Delight", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/birthday%20delight%20350.jpeg", description: "A festive treat for any birthday celebration." },
      { id: "c2", name: "Black Forest", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Black%20forest450%20.jpeg", description: "Classic layers of chocolate, cream, and cherry." },
      { id: "c3", name: "Butterscotch", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20400.jpeg", description: "Sweet and crunchy butterscotch goodness." },
      { id: "c4", name: "Butterscotch Special", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20450.jpeg", description: "An extra special butterscotch delight." },
    ],
    gifts: [
      { id: "g1", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(1)%20199.jpeg", description: "A classic mug for your daily coffee." },
      { id: "g2", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(2)%20199.jpeg", description: "A stylish mug for your favorite beverage." },
      { id: "g3", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20199.jpeg", description: "Another great coffee mug." },
    ],
    personalisedFrames: [
      { id: "g6", name: "Customised Photo Frame", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Photo%20Frame350.jpeg", description: "A classic frame for your cherished photos." },
    ],
    personalisedMugsAndCushions: [
      { id: "g1", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(1)%20199.jpeg", description: "A classic mug for your daily coffee." },
    ],
    foodItems: [
        { id: "f1", name: "Veg Puff", price: "60", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/veg%20puff.jpg", description: "A savory and flaky pastry filled with spiced vegetables." },
        { id: "f10", name: "Cold Coffee", price: "140", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cold%20beverages/cold%20coffee.jpg`, description: "A refreshing chilled coffee beverage." },
    ],
    snacks: [
        { id: "s1", name: "Veg Puff", price: "60", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/veg%20puff.jpg", description: "A savory and flaky pastry filled with spiced vegetables.", badge: "QUICK BITE" },
        { id: "s2", name: "Cheese Sandwich", price: "90", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/cheese%20sandwich.jpg", description: "A classic sandwich with a generous layer of cheese.", badge: "PREMIUM" },
        { id: "s3", name: "Garlic Bread", price: "100", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/garluc%20bread.jpg", description: "Toasted bread with a savory garlic butter spread.", badge: "SAME DAY" },
    ],
    hotBeverages: [
        { id: "hb1", name: "Espresso", price: "80", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/expresso.jpg`, description: "A strong and concentrated coffee shot.", badge: "HOT" },
        { id: "hb2", name: "Americano", price: "100", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/americano.jpg`, description: "Espresso diluted with hot water." },
        { id: "hb3", name: "Cappuccino", price: "120", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/cappacuino.jpg`, description: "Espresso, steamed milk, and milk foam." },
    ],
    flowerProducts: [
      { id: "fp1", name: "Single Rose", price: "50", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/flowers/single%20rose.jpg", description: "A single, elegant rose for a simple gesture." },
    ],
  },
  giftFinder: {
    title: "Looking for a perfect gift?",
    subtitle: "Use our gift finder",
    buttonText: "FIND",
    options: [
      { label: "For Who?", type: "who" },
      { label: "What Occasion?", type: "occasion" },
      { label: "What's Your Budget?", type: "budget" },
    ]
  },
  collections: {
    flowers: [
        { title: "Roses", imageUrl: "https://images.unsplash.com/photo-1518621736915-f3b17a1d02b2?w=500&auto=format&fit=crop" },
    ],
    cakes: [
        { id: "dc1", title: "Choco Cafe Cake", description: "A rich coffee and chocolate blend.", price: "430", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20430%20.jpeg" },
    ]
  },
  footer: {
    about: "Welcome to Combo Cafe & Gift Shop, your one-stop destination for delightful cakes, thoughtful gifts, and delicious food in Rampurhat.",
    copyright: `© {YEAR} Combo Cafe and Gift Shop. All rights reserved.`,
    social: [
      { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/share/19LJ2HN2aG/" },
      { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/combo_cafe_gift_store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    ],
    links: {
      help: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQs", href: "/faqs" },
        { label: "Customer Reviews", href: "/reviews" },
      ],
      business: [
        { label: "Corporate Gifting", href: "/coming-soon" },
        { label: "Franchise", href: "/coming-soon" },
      ],
      policies: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ]
    }
  },
  mobile: {
    promoBar: {
      text: "Save 20% | Code: NEWAPP",
      buttonText: "OPEN APP",
      buttonLink: "#"
    },
    bottomNav: [
      { id: "home", label: "Home", href: "/", Icon: Home },
      { id: "menu", label: "Menu", href: "/menu", Icon: BookOpen },
      { id: "gifts", label: "Gifts", href: "/gifts", Icon: Gift },
      { id: "flowers", label: "Flowers", href: "/flowers", Icon: Flower },
      { id: "food", label: "Food", href: "/food", Icon: Cookie }
    ]
  },
  payment: {
    qrCodeUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/qr%20code.jpeg"
  }
};
