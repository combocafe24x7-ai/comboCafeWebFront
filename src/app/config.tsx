
import { Facebook, Instagram, CakeSlice, Gift, Flower, Cookie, Home, BookOpen, PartyPopper, Heart, Sparkles, Package, ShoppingCart, User, Phone } from "lucide-react";

const supabaseUrl = "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/images";

const pizzas = [
  { id: "p1", name: "Margherita Veg Pizza", price: "150", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Margherita%20Veg%20Pizza.webp", description: "Classic Margherita with fresh tomatoes and cheese." },
  { id: "p2", name: "Corn Pizza", price: "150", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Corn%20Pizza.webp", description: "A delightful pizza topped with sweet corn and cheese." },
  { id: "p3", name: "Paneer Pizza", price: "160", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Pannir%20Pizza.webp", description: "Spicy paneer, onions, and capsicum on a cheesy base." },
  { id: "p4", name: "Chicken Pizza", price: "160", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Chicken%20Pizza.webp", description: "Loaded with succulent chicken pieces and cheese." },
];

const burgers = [
  { id: "b1", name: "Veg Cheese Burger", price: "70", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Veg%20Cheese%20.webp", description: "A classic veg patty with a slice of cheese." },
  { id: "b2", name: "Chilli Chicken Burger", price: "80", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Chilli%20chicken%20burger.webp", description: "Spicy chilli chicken in a soft burger bun." },
  { id: "b3", name: "Crispy Chicken Burger", price: "99", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Crishpy%20Chicken%20burger.webp", description: "A crispy chicken fillet for that perfect crunch." },
  { id: "b4", name: "Chicken Cheese Burger", price: "120", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Chicken%20Cheese%20Burger.webp", description: "Juicy chicken patty topped with melted cheese." },
];

const sandwiches = [
  { id: "sw3", name: "Paneer Sandwich", price: "80", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Pannir%20Sandwich%20.webp", description: "Grilled sandwich with a spicy paneer filling." },
  { id: "sw4", name: "Chicken Sandwich", price: "80", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Chicken%20Sandwich.webp", description: "Hearty sandwich with a savory chicken filling." },
  { id: "sw5", name: "Club Sandwich", price: "110", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Club%20Sandwich%20Sandwich.webp", description: "A classic multi-layered club sandwich." },
];

const noodles = [
  { id: "n1", name: "Veg Korean Noodles", price: "99", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Veg%20Korean%20Noodles.webp", description: "Spicy and savory Korean-style noodles with vegetables." },
  { id: "n2", name: "Chicken Korean Noodles", price: "129", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Chicken%20Korean%20Noodles%20.webp", description: "Spicy Korean noodles with tender chicken pieces." },
];

const pastas = [
  { id: "ps1", name: "Veg Masala Pasta", price: "85", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Veg%20Masala%20Pasta.webp", description: "Pasta cooked in a flavorful Indian masala sauce." },
  { id: "ps2", name: "Cheese White Sauce Macaroni Pasta", price: "95", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Cheese%20White%20Souce%20Macroni%20Pasta%20.webp", description: "Creamy white sauce macaroni pasta with cheese." },
  { id: "ps3", name: "Chicken White Sauce Pasta", price: "99", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Chicken%20White%20Souce%20Pasta.webp", description: "Pasta in a creamy white sauce with chicken." },
];

const snacks = [
  { id: "s2", name: "Cheese Sandwich", price: "90", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/cheese%20sandwich.jpg", description: "A classic sandwich with a generous layer of cheese." },
  { id: "s3", name: "Garlic Bread", price: "100", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/snacks/garluc%20bread.jpg", description: "Toasted bread with a savory garlic butter spread." },
  { id: "sw1", name: "Veg Cheese Sandwich", price: "55", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Veg%20Cheese%20Sandwich.webp", description: "A simple yet delicious veg and cheese sandwich." },
  { id: "sw2", name: "Corn Sandwich", price: "55", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/Corn%20Sandwich.webp", description: "Creamy sweet corn filling in a grilled sandwich." },
];

const friedItems = [
    { id: "f1", name: "Salted French Fries", price: "65", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/fried%20items/Salted%20french%20fries.webp", description: "Classic salted french fries." },
    { id: "f2", name: "Peri Peri French Fries", price: "80", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/fried%20items/peri%20peri%20french%20fries.webp", description: "Spicy peri peri flavored fries." },
    { id: "f3", name: "Hot & Spicy French Fries", price: "99", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/fried%20items/Hot%20&%20Spicy%20French%20Fries.webp", description: "Extra hot and spicy fries." },
    { id: "f4", name: "Crispy Chicken Wings", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/fried%20items/Crishpy%20Chicken%20Wings.webp", description: "4 pieces of crispy chicken wings." },
    { id: "f5", name: "Crispy Chicken Leg", price: "130", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/fried%20items/crispy%20chicken%20leg.webp", description: "2 pieces of crispy chicken legs." },
    { id: "f6", name: "Chicken Popcorn", price: "100", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/fried%20items/Crishpy%20Chicken%20pop%20corn.webp", description: "Bite-sized crispy chicken popcorn." },
    { id: "f7", name: "Chicken Pakora", price: "150", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/fried%20items/Chicken%20Pakora.webp", description: "10 pieces of traditional chicken pakora." }
];

const foodCombos = [
  { id: "fc1", name: "Chicken Burger Combo", price: "99", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_4a0fd9a26a2f1dfae1d4abebba74aad7dr%20(1).jpeg", description: "Chicken Burger, French Fries & Lime Mint Mojito" },
  { id: "fc2", name: "Double Pizza Combo", price: "299", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_834c6f3aba56f4eaf8a49b785eebe93cdr.jpeg", description: "Chicken Pizza + Paneer Pizza with 2 Masala Soda" },
  { id: "fc3", name: "Leg Bucket Combo", price: "350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_32e29558d7704da90264c899941f754eeg.png", description: "6pcs Leg Bucket + 1L Coke" },
  { id: "fc4", name: "Wings Bucket Combo", price: "299", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_1efb402d784fed8844a49254928a74d2eg.png", description: "6pcs Wings + 1L Coke" },
  { id: "fc5", name: "Chicken Breast Combo", price: "150", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_f1e30343a2e730fb7164aa2b1c9c1d1deg.png", description: "2 Chicken Breast + 2 Masala Coke" },
  { id: "fc6", name: "Chicken Strips Combo", price: "99", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_a3d63324ef143c5992444aed6d2d2b58eg.png", description: "6pcs Boneless Chicken Strips + 400ml Pepsi" },
  { id: "fc7", name: "Chicken Leg & Fries Combo", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_e0ec3d4af939b0b8497489e4495ea6e6eg.png", description: "2 Chicken Legs, French Fries & 2 Rose Crush" },
  { id: "fc8", name: "Popcorn Combo", price: "99", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/combo/Whisk_fb81eb943345afd8055485e68178df12eg.png", description: "Popcorn with Dip Mayo + 400ml Pepsi" },
];

export const config = {
  header: {
    utilityBar: {
      promoText: "For enquiries on WhatsApp: 84368 60216",
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
      {
        id: "food",
        label: "Food",
        href: "/food",
        subLinks: [
          { id: "all-food", label: "All Food", href: "/food" },
          { id: "pizzas", label: "Pizzas", href: "/food#pizzas" },
          { id: "burgers", label: "Burgers", href: "/food#burgers" },
          { id: "sandwiches", label: "Sandwiches", href: "/food#sandwiches" },
          { id: "noodles", label: "Noodles", href: "/food#noodles" },
          { id: "pastas", label: "Pastas", href: "/food#pastas" },
          { id: "fried-items", label: "Fried Items", href: "/food#fried-items" },
          { id: "snacks", label: "Snacks", href: "/food#snacks" },
        ]
      },
      { id: "combos", label: "Combos", href: "/combos" },
      { id: "chocolates", label: "Chocolates", href: "/chocolates" },
      { id: "about-us", label: "About Us", href: "/about-us" },
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
    { id: "cakes", label: "Cakes", href: "/cakes", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/buttons/cake%20.png" },
    { id: "mugs", label: "Mugs", href: "/personalised-gifts", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/buttons/mugs.png" },
    { id: "quick-bites", label: "Quick Bites", href: "/food", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/buttons/food.png" },
    { id: "combos", label: "Combos", href: "/combos", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/buttons/combo.png" },
    { id: "chocolates", label: "Chocolates", href: "/chocolates", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/buttons/chocolates.png" },
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
      { id: "g12", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.02.jpeg", description: "Personalize your mug with a cherished photo." },
      { id: "g13", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.03%20(1).jpeg", description: "A perfect gift with a personal touch." },
      { id: "g14", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.03%20(2).jpeg", description: "Start your day with a custom memory." },
      { id: "g15", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.03.jpeg", description: "Your favorite picture on a high-quality mug." },
      { id: "g16", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.04.jpeg", description: "A unique and thoughtful personalized gift." },
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
      { id: "g12", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.02.jpeg", description: "Personalize your mug with a cherished photo." },
      { id: "g13", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.03%20(1).jpeg", description: "A perfect gift with a personal touch." },
      { id: "g14", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.03%20(2).jpeg", description: "Start your day with a custom memory." },
      { id: "g15", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.03.jpeg", description: "Your favorite picture on a high-quality mug." },
      { id: "g16", name: "Customised Mug", price: "125", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/mug/WhatsApp%20Image%202026-01-26%20at%2008.07.04.jpeg", description: "A unique and thoughtful personalized gift." },
      { id: "g1", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(1)%20199.jpeg", description: "A classic mug for your daily coffee." },
      { id: "g2", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20(2)%20199.jpeg", description: "A stylish mug for your favorite beverage." },
      { id: "g3", name: "Coffee Mug", price: "199", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Coffee%20Mug%20199.jpeg", description: "Another great coffee mug." },
      { id: "g4", name: "Coffee Mug Pair", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/coffee%20mug%20399%20Pairs.jpeg", description: "A perfect gift for couples." },
      { id: "g5", name: "Customised Cushion", price: "550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Customized%20Cushion%20550.jpeg", description: "A soft, personalized cushion for your home." },
      { id: "g10", name: "Magic Mug", price: "399", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/Magic%20Mug%20399.jpeg", description: "Reveals a surprise image with hot liquid." }
    ],
    flowerProducts: [],
    foodItems: [...pizzas, ...burgers, ...sandwiches, ...noodles, ...pastas, ...snacks, ...friedItems],
    pizzas,
    burgers,
    sandwiches,
    noodles,
    pastas,
    snacks,
    friedItems,
    comboProducts: [
      ...foodCombos
    ],
    chocolates: [
      { id: "choc1", name: "Milky Bar", price: "40", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/chocolates/milkybar.webp", description: "Rich and creamy white chocolate bar." },
      { id: "choc2", name: "KitKat 150g", price: "185", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/chocolates/kitkat.webp", description: "Crisp wafer fingers covered with milk chocolate." },
      { id: "choc3", name: "Dairy Milk Silk", price: "230", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/Food/chocolates/diary%20mik.webp", description: "The classic taste of Cadbury dairy milk." }
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
      { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/profile.php?id=100063715835154", mobileHref: "fb://profile/100063715835154" },
      { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/combo_cafe_gift_store", mobileHref: "instagram://user?username=combo_cafe_gift_store" },
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
      { id: "cart", label: "Cart", href: "/checkout", Icon: ShoppingCart },
      { id: "gifts", label: "Gifts", href: "/gifts", Icon: Gift },
      { id: "wishlist", label: "Wishlist", href: "/coming-soon", Icon: Heart },
      { id: "contact", label: "Contact", href: "/contact", Icon: Phone }
    ]
  },
  payment: {
    qrCodeUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/qr%20code.jpeg"
  }
};

    
    

    











