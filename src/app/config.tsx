
import { Facebook, Instagram, CakeSlice, Gift, Flower, Cookie, Home, BookOpen, PartyPopper, Heart, Sparkles, Package } from "lucide-react";

const supabaseUrl = "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images";

export const config = {
  header: {
    utilityBar: {
      promoText: "Order Today, Receive Tomorrow",
    },
    logoUrl: `https://picsum.photos/seed/brand-logo/180/40`,
    phoneNumber: "84368 60216",
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
      {
        id: "food",
        label: "Food",
        href: "/food",
        subLinks: [
          { id: "all-food", label: "All Food & Drinks", href: "/food" },
          { id: "snacks", label: "Snacks", href: "/food" },
          { id: "hot-beverages", label: "Hot Beverages", href: "/food" },
          { id: "cold-beverages", label: "Cold Beverages", href: "/food" },
        ]
      },
      { id: "our-menu", label: "Our Menu", href: "/menu" },
      {
        id: "flowers",
        label: "Flowers & More",
        href: "/flowers",
        subLinks: [
          { id: "all-flowers", label: "All Flowers & Combos", href: "/flowers" },
          { id: "bouquets", label: "Flower Bouquets", href: "/flowers" },
          { id: "combos", label: "Combos & Hampers", href: "/flowers" },
        ]
      },
      { id: "about-us", label: "About Us", href: "/about" },
      { id: "contact-us", label: "Contact Us", href: "/contact" },
    ],
  },
  hero: {
    banners: [
      { imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hero%20images/ChatGPT%20Image%20Jan%2015,%202026,%2011_54_36%20PM.png`, alt: "Promotional Banner 1" },
      { imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hero%20images/ChatGPT%20Image%20Jan%2015,%202026,%2011_50_28%20PM.png`, alt: "Promotional Banner 2" },
      { imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hero%20images/ChatGPT%20Image%20Jan%2016,%202026,%2012_00_07%20AM.png`, alt: "Promotional Banner 3" },
      { imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hero%20images/ChatGPT%20Image%20Jan%2016,%202026,%2012_05_00%20AM.png`, alt: "Promotional Banner 4" },
    ],
  },
  iconCategories: [
    { id: "birthday", label: "Birthday", href: "/search?q=birthday", Icon: PartyPopper, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2007_04_13%20PM.png" },
    { id: "cakes", label: "Cakes", href: "/cakes", Icon: CakeSlice, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2005_40_12%20PM.png" },
    { id: "gifts", label: "Gifts", href: "/gifts", Icon: Gift, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2005_41_52%20PM.png" },
    { id: "flowers", label: "Flowers", href: "/flowers", Icon: Flower, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2005_45_36%20PM.png" },
    { id: "combos", label: "Combos", href: "/flowers", Icon: Package, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2007_09_22%20PM.png" },
    { id: "personalised", label: "Custom", href: "/personalised-gifts", Icon: Sparkles, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2007_40_47%20PM.png" },
    { id: "anniversary", label: "Celebrate", href: "/search?q=anniversary", Icon: Heart, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2007_09_35%20PM.png" },
    { id: "snacks", label: "Snacks", href: "/food", Icon: Cookie, imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2016,%202026,%2005_52_11%20PM.png" },
  ],
  serviceStrip: {
    title: "Bulk orders are acceptable",
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
      { id: "1", name: "Birthday Delight Cake", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/birthday%20delight%20350.jpeg", description: "A festive treat to make any birthday special.", badge: "BESTSELLER" },
      { id: "4", name: "Choco Blush Cake", price: "500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20blush%20500.jpeg", description: "A beautiful and delicious chocolate creation.", badge: "PREMIUM" },
    ],
    allCakes: [
      { id: "c1", name: "Birthday Delight", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/birthday%20delight%20350.jpeg", description: "A festive treat for any birthday celebration." },
      { id: "c2", name: "Black Forest", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Black%20forest450%20.jpeg", description: "Classic layers of chocolate, cream, and cherry." },
      { id: "c3", name: "Butterscotch", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20400.jpeg", description: "Sweet and crunchy butterscotch goodness." },
      { id: "c4", name: "Butterscotch Special", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20450.jpeg", description: "An extra special butterscotch delight." },
      { id: "c5", name: "Butterscotch Crunch", price: "390", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butterscotch%20390.jpeg", description: "A delightful crunch in every bite." },
      { id: "c6", name: "Premium Butterscotch", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butterscotch%20450%20(2).jpeg", description: "Our premium take on the classic butterscotch." },
      { id: "c7", name: "Classic Butterscotch", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butterscotch%20450.jpeg", description: "The classic butterscotch flavor you love." },
      { id: "c8", name: "Choco Blush", price: "500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20blush%20500.jpeg", description: "A beautiful and delicious chocolate creation." },
      { id: "c9", name: "Choco Cafe", price: "500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20400.jpeg", description: "The perfect blend of chocolate and coffee." },
      { id: "c10", name: "Choco Cafe Classic", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20400.jpeg", description: "A classic coffee and chocolate combination." },
      { id: "c11", name: "Choco Cafe Delight", price: "430", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20430%20.jpeg", description: "A delightful treat for coffee lovers." },
      { id: "c12", name: "Choco Crunch", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20crunch%20400%20(2).jpeg", description: "A satisfyingly crunchy chocolate cake." },
      { id: "c13", name: "Choco Crunch Extra", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20crunch%20400.jpeg", description: "Even more crunch in every chocolatey bite." },
      { id: "c14", name: "Choco Delight", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20delight%20450.jpeg", description: "Pure chocolate delight in a cake." },
      { id: "c15", name: "Choco Heart", price: "480", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20heart%20480.jpeg", description: "A heart-shaped cake for your loved ones." },
      { id: "c16", name: "Choco Heart Premium", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20heart%20550.jpeg", description: "A premium heart-shaped chocolate cake." },
      { id: "c17", name: "Choco KitKat", price: "480", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20kitkat%20480.jpeg", description: "Loaded with delicious KitKat bars." },
      { id: "c18", name: "Choco Oreo", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20oreo%20450.jpeg", description: "The perfect mix of chocolate and Oreo." },
      { id: "c19", name: "Choco Oreo Blush", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20oreo%20blush%20450%20.jpeg", description: "A beautiful blend of Oreo and chocolate." },
      { id: "c20", name: "Choco Pineapple", price: "380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20pineapple%20380%20%20(2).jpeg", description: "A tropical twist with chocolate and pineapple." },
      { id: "c21", name: "Choco Pineapple Classic", price: "380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20pineapple%20380%20.jpeg", description: "Classic pineapple cake with a hint of chocolate." },
      { id: "c22", name: "Choco Shots", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20shots%20450.jpeg", description: "A cake decorated with delicious chocolate shots." },
      { id: "c23", name: "Choco Vanilla", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20350%20.jpeg", description: "The timeless combination of chocolate and vanilla." },
      { id: "c24", name: "Choco Vanilla Swirl", price: "360", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20360.jpeg", description: "A beautiful swirl of chocolate and vanilla." },
      { id: "c25", name: "Choco Vanilla Special", price: "380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20380%20(2).jpeg", description: "A special treat with chocolate and vanilla." },
      { id: "c26", name: "Choco Vanilla Classic", price: "380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20380.jpeg", description: "The classic choco vanilla you can't resist." },
      { id: "c27", name: "Choco Vanilla Rich", price: "390", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20390.jpeg", description: "A richer version of your favorite choco vanilla." },
      { id: "c28", name: "Choco Vanilla Premium", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Choco%20vanilla%20400.jpeg", description: "Premium quality chocolate and vanilla cake." },
      { id: "c29", name: "Christmas Cake", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/christmas%20cake%20400.jpeg", description: "A festive cake to celebrate Christmas." },
      { id: "c30", name: "Cup Cake", price: "55", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/cup%20cake%2055.jpeg", description: "A delicious and cute cupcake." },
      { id: "c31", name: "Doll Cake (2 pounds)", price: "750", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doll%20cake%20750%202%20punds.jpeg", description: "A beautiful 2-pound doll-themed cake." },
      { id: "c32", name: "Doll Cake", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doll%20cake%20800.jpeg", description: "An elegant and stunning doll cake." },
      { id: "c33", name: "Doraemon Cake", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doraemon%20400.jpeg", description: "A fun cake for Doraemon fans." },
      { id: "c34", name: "Face Printed Cake", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/face%20printed%20450.jpeg", description: "A personalized cake with a printed face." },
      { id: "c35", name: "Filled with Choco Chips", price: "500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Filled%20with%20choco%20chips%20500%20.jpeg", description: "A cake generously filled with choco chips." },
      { id: "c36", name: "Football Cake", price: "430", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/foot%20ball%20430.jpeg", description: "The perfect cake for a football fan." },
      { id: "c37", name: "Mango Cake", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/mango%20cake%20450.jpeg", description: "A refreshing and delicious mango flavored cake." },
      { id: "c38", name: "Mango Delight", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/mango%20delight%20450.jpeg", description: "A delightful cake with the taste of fresh mangoes." },
      { id: "c39", name: "Pineapple Cake", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/pineapple%20350.jpeg", description: "A classic and refreshing pineapple cake." },
      { id: "c40", name: "Princess Cake", price: "470", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/princes%20cake%20470.jpeg", description: "A cake fit for a princess." },
      { id: "c41", name: "Pure Choco", price: "450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/pure%20choco%20450.jpeg", description: "For the ultimate chocolate lover." },
      { id: "c42", name: "Queen Neck", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/queen%20neck%20400.jpeg", description: "An elegant cake with a royal touch." },
      { id: "c43", name: "Snow White", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/snow%20white%20400%20.jpeg", description: "A beautiful cake inspired by Snow White." },
      { id: "c44", name: "Strawberry Blush", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/stawberry%20blush%20400.jpeg", description: "A blushing strawberry flavored cake." },
      { id: "c45", name: "Semi Doll Cake", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/swmi%20doll%20cake%20550.jpeg", description: "A charming and creative semi-doll cake." },
      { id: "c46", name: "Two in One", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/two%20in%20one%20400.jpeg", description: "Two flavors in one delicious cake." },
      { id: "c47", name: "Two in One Classic", price: "380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/two%20inone%20380.jpeg", description: "A classic two-flavor combination." },
      { id: "c48", name: "Vanilla", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Vanilla%20350%20.jpeg", description: "A simple and elegant vanilla cake." },
      { id: "c49", name: "Vanilla Heart", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/vanilla%20heart%20400.jpeg", description: "A heart-shaped vanilla cake for special moments." },
      { id: "c50", name: "Vanilla with Choco Delight", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Vanilla%20with%20choco%20delight%20800.jpeg", description: "Vanilla cake with a delightful chocolate twist." },
      { id: "c51", name: "Classic Vanilla", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/vnilla%20350.jpeg", description: "The timeless taste of classic vanilla." },
      { id: "c52", name: "White Bloom", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/white%20blooms%20400.jpeg", description: "An elegant cake with beautiful white blooms." },
      { id: "c53", name: "White Forest", price: "400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/white%20forest%20400.jpeg", description: "A delightful white chocolate version of black forest." },
      { id: "c54", name: "Yummy Butterscotch", price: "380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/yummy%20butterscotch%20380%20.jpeg", description: "A truly yummy butterscotch cake." },
      { id: "c55", name: "Yummy Butterscotch Extra", price: "380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/yummy%20butterscoth%20380.jpeg", description: "An extra yummy butterscotch experience." }
    ],
    gifts: [
      { id: "g1", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(1)%20199.jpeg", description: "A classic mug for your daily coffee." },
      { id: "g2", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(2)%20199.jpeg", description: "A stylish mug for your favorite beverage." },
      { id: "g3", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20199.jpeg", description: "Another great coffee mug." },
      { id: "g4", name: "Coffee Mug Pair", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/coffee%20mug%20399%20Pairs.jpeg", description: "A perfect gift for couples." },
      { id: "g5", name: "Customised Cushion", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Cushion%20550.jpeg", description: "A soft, personalized cushion for your home." },
      { id: "g6", name: "Customised Photo Frame", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Photo%20Frame350.jpeg", description: "A classic frame for your cherished photos." },
      { id: "g7", name: "LED Frame", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Led%20Frame%20800.jpeg", description: "A beautiful LED illuminated photo frame." },
      { id: "g8", name: "LED Mirror", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/LED%20Mirror%20350.jpeg", description: "A stylish mirror with built-in LED lights." },
      { id: "g9", name: "LED Premium Frame", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Led%20Premium%20Frame800.jpeg", description: "Top-tier premium LED illuminated photo frame." },
      { id: "g10", name: "Magic Mug", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Magic%20Mug%20399.jpeg", description: "Reveals a surprise image with hot liquid." },
      { id: "g11", name: "Customised Normal Frame", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Normal%20Frame%20size%208/12%20350.jpeg", description: "Standard 8x12 inch photo frame." }
    ],
    personalisedFrames: [
      { id: "g6", name: "Customised Photo Frame", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Photo%20Frame350.jpeg", description: "A classic frame for your cherished photos." },
      { id: "g7", name: "LED Frame", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Led%20Frame%20800.jpeg", description: "A beautiful LED illuminated photo frame." },
      { id: "g9", name: "LED Premium Frame", price: "800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Led%20Premium%20Frame800.jpeg", description: "Top-tier premium LED illuminated photo frame." },
      { id: "g11", name: "Customised Normal Frame", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Normal%20Frame%20size%208/12%20350.jpeg", description: "Standard 8x12 inch photo frame." }
    ],
    personalisedMugsAndCushions: [
      { id: "g1", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(1)%20199.jpeg", description: "A classic mug for your daily coffee." },
      { id: "g2", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(2)%20199.jpeg", description: "A stylish mug for your favorite beverage." },
      { id: "g3", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20199.jpeg", description: "Another great coffee mug." },
      { id: "g4", name: "Coffee Mug Pair", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/coffee%20mug%20399%20Pairs.jpeg", description: "A perfect gift for couples." },
      { id: "g5", name: "Customised Cushion", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Cushion%20550.jpeg", description: "A soft, personalized cushion for your home." },
      { id: "g10", name: "Magic Mug", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Magic%20Mug%20399.jpeg", description: "Reveals a surprise image with hot liquid." }
    ],
    foodItems: [
        { id: "f1", name: "Veg Puff", price: "60", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/veg%20puff.jpg", description: "A savory and flaky pastry filled with spiced vegetables." },
        { id: "f2", name: "Cheese Sandwich", price: "90", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/cheese%20sandwich.jpg", description: "A classic sandwich with a generous layer of cheese." },
        { id: "f3", name: "Garlic Bread", price: "100", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/garluc%20bread.jpg", description: "Toasted bread with a savory garlic butter spread." },
        { id: "f4", name: "Espresso", price: "80", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/expresso.jpg`, description: "A strong and concentrated coffee shot." },
        { id: "f5", name: "Americano", price: "100", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/americano.jpg`, description: "Espresso diluted with hot water, giving it a similar strength to drip coffee." },
        { id: "f6", name: "Cappuccino", price: "120", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/cappacuino.jpg`, description: "A classic coffee drink with equal parts espresso, steamed milk, and milk foam." },
        { id: "f7", name: "Caffè Latte", price: "130", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/latte.jpg`, description: "A coffee drink made with espresso and steamed milk." },
        { id: "f9", name: "Hot Chocolate", price: "120", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/hot%20chocolate.jpg`, description: "A warm and comforting chocolate-flavored drink." },
        { id: "f10", name: "Cold Coffee", price: "140", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cold%20beverages/cold%20coffee.jpg`, description: "A refreshing chilled coffee beverage." },
        { id: "f11", name: "Iced Latte", price: "150", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cold%20beverages/iced%20latte.jpg`, description: "Chilled espresso mixed with cold milk over ice." },
        { id: "f12", name: "Chocolate Frappe", price: "160", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cold%20beverages/chocolate%20frappe.jpg`, description: "A blended iced coffee drink with rich chocolate flavor." },
        { id: "f13", name: "Strawberry Milkshake", price: "150", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cold%20beverages/strawberry%20milkshake.jpg`, description: "A sweet and creamy shake made with fresh strawberries." }
    ],
    snacks: [
        { id: "s1", name: "Veg Puff", price: "60", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/veg%20puff.jpg", description: "A savory and flaky pastry filled with spiced vegetables." },
        { id: "s2", name: "Cheese Sandwich", price: "90", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/cheese%20sandwich.jpg", description: "A classic sandwich with a generous layer of cheese." },
        { id: "s3", name: "Garlic Bread", price: "100", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/garluc%20bread.jpg", description: "Toasted bread with a savory garlic butter spread." },
    ],
    hotBeverages: [
        { id: "hb1", name: "Espresso", price: "80", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/expresso.jpg`, description: "A strong and concentrated coffee shot." },
        { id: "hb2", name: "Americano", price: "100", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/americano.jpg`, description: "Espresso diluted with hot water." },
        { id: "hb3", name: "Cappuccino", price: "120", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/cappacuino.jpg`, description: "Espresso, steamed milk, and milk foam." },
        { id: "hb4", name: "Caffè Latte", price: "130", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/latte.jpg`, description: "Espresso with a larger amount of steamed milk." },
        { id: "hb6", name: "Hot Chocolate", price: "120", imageUrl: `https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hot%20bevrages/hot%20chocolate.jpg`, description: "A warm and comforting chocolate drink." },
    ],
    flowerProducts: [
      { id: "fp1", name: "Single Rose", price: "50", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/flowers/single%20rose.jpg", description: "A single, elegant rose for a simple gesture." },
      { id: "fp2", name: "Rose Bouquet", price: "299", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/flowers/rose%20bouquet.jpg", description: "A beautiful bouquet of fresh roses." },
      { id: "fp3", name: "Mixed Flower Bouquet", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/flowers/flower%20bouquet.jpg", description: "A vibrant mix of seasonal flowers." },
      { id: "fp4", name: "Cake + Flower Combo", price: "699", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/flowers/cake%20plus%20flower.jpg", description: "The perfect combo for any celebration." },
      { id: "fp5", name: "Gift Hampers", price: "499", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/flowers/gift%20hamper.jpg", description: "Thoughtfully curated hampers for your loved ones." },
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
    ],
    buttonText: "Find The Perfect Gift"
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
    about: "Welcome to Combo Cafe & Gift Shop, your one-stop destination for delightful cakes, thoughtful gifts, and delicious food in Rampurhat.",
    copyright: `© {YEAR} Combo Cafe and Gift Shop. All rights reserved.`,
    social: [
      { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/share/19LJ2HN2aG/" },
      { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/combo_cafe_gift_store" },
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
    