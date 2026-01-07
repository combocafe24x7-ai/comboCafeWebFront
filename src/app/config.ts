import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Facebook, Instagram, Twitter } from "lucide-react";

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
const findImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || '';

export const config = {
  brand: {
    name: "Combo Café & Gift Shop",
  },
  theme: {
    default: "dark" as "light" | "dark",
    accentColor: "#FFDA63",
  },
  hero: {
    backgroundUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ezgif.com-video-to-webp-converter%20(2).webp",
    primaryCta: { text: "Explore Menu", href: "#menu" },
    secondaryCta: { text: "Order for Celebration", href: "#contact" },
    categories: [
      {
        headline: "Handcrafted Cakes",
        subtitle: "Taste the Celebration",
        description: "Experience our collection of artisanal cakes, baked with love and the finest ingredients for your special moments.",
        accentColor: "#FFDA63", // Warm Yellow
      },
      {
        headline: "Fresh Flowers",
        subtitle: "Bloom & Smile",
        description: "Brighten any day with our curated selection of fresh, vibrant flowers, arranged to capture the beauty of nature.",
        accentColor: "#FF8A80", // Soft Coral
      },
      {
        headline: "Special Combos",
        subtitle: "Gifts of Joy",
        description: "Discover the perfect pairing of flavors and flowers. Our special combos are designed to make any occasion unforgettable.",
        accentColor: "#82B1FF", // Sky Blue
      },
    ],
  },
  navigation: {
    links: [
      { id: "home", label: "Home" },
      { id: "menu", label: "Menu" },
      { id: "offerings", label: "Cakes & Flowers" },
      { id: "bestsellers", label: "Best Sellers" },
      { id: "contact", label: "Contact" },
    ],
  },
  offerings: {
    cakes: [
      { name: "Chocolate Cakes", description: "Decadent and rich.", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
      { name: "Strawberry Cakes", description: "Fruity and fresh.", imageUrl: findImage('strawberry-cake'), imageHint: findImageHint('strawberry-cake') },
      { name: "Vanilla Cakes", description: "Classic and elegant.", imageUrl: findImage('vanilla-cake'), imageHint: findImageHint('vanilla-cake') },
      { name: "Celebration Cakes", description: "Custom for you.", imageUrl: findImage('celebration-cake'), imageHint: findImageHint('celebration-cake') },
    ],
    flowers: [
      { name: "Roses", description: "Timeless romance.", imageUrl: findImage('roses'), imageHint: findImageHint('roses') },
      { name: "Bouquets", description: "Artfully arranged.", imageUrl: findImage('bouquets'), imageHint: findImageHint('bouquets') },
      { name: "Gift Combos", description: "Thoughtful presents.", imageUrl: findImage('gift-combos'), imageHint: findImageHint('gift-combos') },
      { name: "Seasonal Flowers", description: "Fresh and vibrant.", imageUrl: findImage('seasonal-flowers'), imageHint: findImageHint('seasonal-flowers') },
    ],
  },
  menu: {
    items: [
      { name: "Espresso", description: "Rich and aromatic shot of coffee.", price: "$3.00", category: "Beverages" },
      { name: "Latte", description: "Espresso with steamed milk and a touch of foam.", price: "$4.50", category: "Beverages" },
      { name: "Croissant", description: "Buttery, flaky, and freshly baked.", price: "$3.50", category: "Snacks" },
      { name: "Cheesecake Slice", description: "Creamy New York style cheesecake.", price: "$6.00", category: "Desserts" },
      { name: "Iced Tea", description: "Refreshing black tea, lightly sweetened.", price: "$3.00", category: "Beverages" },
      { name: "Scone", description: "Served with jam and cream.", price: "$4.00", category: "Snacks" },
    ],
  },
  bestsellers: [
    { name: "Velvet Heart Cake", tag: "Most Loved", imageUrl: findImage('best-seller-1'), imageHint: findImageHint('best-seller-1') },
    { name: "Sunrise Bouquet", tag: "Top Pick", imageUrl: findImage('best-seller-2'), imageHint: findImageHint('best-seller-2') },
    { name: "Celebration Box", tag: "Perfect Gift", imageUrl: findImage('best-seller-3'), imageHint: findImageHint('best-seller-3') },
  ],
  contact: {
    address: "123 Blossom Lane, Flavor Town, 45678",
    phone: "+1 (234) 567-890",
    email: "hello@combocafe.com",
    hours: "Mon-Sat: 8am - 8pm | Sun: 9am - 6pm",
    mapImage: {
      url: findImage('map-image'),
      hint: findImageHint('map-image'),
    }
  },
  faq: {
    items: [
      { question: "Do you offer vegan or gluten-free options?", answer: "Yes! We have a selection of delicious vegan and gluten-free cakes and snacks. Please ask our staff for today's offerings." },
      { question: "Can I place a custom order for a cake?", answer: "Absolutely. We specialize in custom celebration cakes. Please contact us at least 48 hours in advance to discuss your design." },
      { question: "Do you deliver flowers?", answer: "We offer local delivery for our flower bouquets and gift combos. You can place an order through our website or by calling us directly." },
      { question: "Is there seating available at the café?", answer: "Yes, we have cozy indoor seating as well as a small outdoor patio area for you to enjoy your coffee and treats." },
    ],
  },
  finalCta: {
    headline: "Your Daily Dose of Delight",
    description: "Whether it's a coffee break, a sweet craving, or a beautiful gift, we're here to make your day a little more special.",
    buttonText: "Visit Combo Café Today",
  },
  footer: {
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    social: [
      { label: "Instagram", Icon: Instagram, href: "#" },
      { label: "Twitter", Icon: Twitter, href: "#" },
      { label: "Facebook", Icon: Facebook, href: "#" },
    ],
    copyright: `© ${new Date().getFullYear()} Combo Café & Gift Shop. All rights reserved.`,
  },
};
