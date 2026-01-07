
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Facebook, Instagram, Twitter } from "lucide-react";

// A custom component for the WhatsApp icon
const WhatsAppIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="WhatsApp"
  >
    <path d="M16.75 13.96c.25.13.42.2.46.3.05.1.05.75-.2 1.3-.25.55-1.12 1.1-1.52 1.25-.4.15-1.07.13-1.6-.08s-2.15-1-3.6-2.5c-1.15-1.15-2-2.5-2.2-2.9-.2-.4-.04-.6.12-.77.16-.17.35-.2.5-.2s.33.02.47.22c.14.2.3.66.35.7.05.05.07.12.02.2-.05.08-.1.18-.2.25-.1.08-.2.12-.25.2-.06.07-.12.15-.05.27.07.12.33.56.7.92.56.5.94.75 1.1.8.14.05.24.03.32-.03.1-.06.42-.5.54-.66.12-.17.22-.15.32-.1.1.04.65.3.75.36zM12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c1.85 0 3.55-.5 5-1.35l-1.3-1.3c-1.1.5-2.35.8-3.7.8a8 8 0 1 1 8-8c0 1.35-.3 2.6-.8 3.7l1.3 1.3C21.5 15.55 22 13.85 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);


const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
const findImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || '';

export const config = {
  brand: {
    name: "Combo Café & Gift Shop",
  },
  theme: {
    default: "light" as "light" | "dark",
    accentColor: "#D47B8C",
  },
  hero: {
    backgroundUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ezgif.com-video-to-webp-converter%20(2).webp",
    primaryCta: { text: "Explore", href: "#offerings" },
    secondaryCta: { text: "Order for Celebration", href: "#contact" },
    categories: [
      {
        id: "cakes" as const,
        headline: "Handcrafted Cakes",
        subtitle: "Taste the Celebration",
        description: "Experience our collection of artisanal cakes, baked with love and the finest ingredients for your special moments.",
        accentColor: "#D47B8C", // Muted Pink/Coral
      },
      {
        id: "flowers" as const,
        headline: "Fresh Flowers",
        subtitle: "Bloom & Smile",
        description: "Brighten any day with our curated selection of fresh, vibrant flowers, arranged to capture the beauty of nature.",
        accentColor: "#A6C2ED", // Soft Blue
      },
      {
        id: "food" as const,
        headline: "Delicious Food",
        subtitle: "Gifts of Joy",
        description: "Discover the perfect pairing of flavors and flowers. Our special combos are designed to make any occasion unforgettable.",
        accentColor: "#F2D59B", // Pale Gold
      },
    ],
  },
  navigation: {
    links: [
      { id: "home", label: "Home" },
      { id: "bestsellers", label: "Best Sellers" },
      { id: "offerings", label: "Offerings" },
      { id: "menu", label: "Menu" },
      { id: "contact", label: "Contact" },
    ],
  },
  offerings: {
    cakes: {
      "Celebration Cakes": {
        note: "You have to order",
        items: [
          { name: "Chocolate Cake", price: "₹120", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
          { name: "Vanilla Cake", price: "₹100", imageUrl: findImage('vanilla-cake'), imageHint: findImageHint('vanilla-cake') },
          { name: "Strawberry Cake", price: "₹130", imageUrl: findImage('strawberry-cake'), imageHint: findImageHint('strawberry-cake') },
          { name: "Red Velvet Cake", price: "₹150", imageUrl: findImage('celebration-cake'), imageHint: findImageHint('celebration-cake') },
          { name: "Chocolate Brownie", price: "₹90", imageUrl: findImage('best-seller-1'), imageHint: findImageHint('best-seller-1') },
          { name: "Cup Cake (Chocolate / Vanilla)", price: "₹60", imageUrl: findImage('best-seller-3'), imageHint: findImageHint('best-seller-3') },
        ]
      },
      "Cakes & Desserts": {
        items: [
          { name: "Chocolate Cake (Slice)", price: "₹120", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
          { name: "Vanilla Cake (Slice)", price: "₹100", imageUrl: findImage('vanilla-cake'), imageHint: findImageHint('vanilla-cake') },
          { name: "Strawberry Cake (Slice)", price: "₹130", imageUrl: findImage('strawberry-cake'), imageHint: findImageHint('strawberry-cake') },
          { name: "Red Velvet Cake (Slice)", price: "₹150", imageUrl: findImage('celebration-cake'), imageHint: findImageHint('celebration-cake') },
          { name: "Chocolate Brownie", price: "₹90", imageUrl: findImage('best-seller-1'), imageHint: findImageHint('best-seller-1') },
        ]
      }
    },
    flowers: [
        { name: "Single Rose", description: "A classic gesture.", imageUrl: findImage('roses'), imageHint: findImageHint('roses'), price: "₹50" },
        { name: "Flower Bouquets", description: "Artfully arranged.", imageUrl: findImage('bouquets'), imageHint: findImageHint('bouquets'), price: "Starting at ₹500" },
        { name: "Cake + Flower Combo", description: "The perfect pair.", imageUrl: findImage('gift-combos'), imageHint: findImageHint('gift-combos'), price: "Starting at ₹700" },
    ],
    food: {
      "Snacks": {
        items: [
          { name: "Veg Puff", price: "₹60", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches') },
          { name: "Cheese Sandwich", price: "₹90", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches') },
          { name: "Garlic Bread", price: "₹100", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches') },
        ]
      },
      "Beverages": {
        "Hot Beverages": {
            items: [
                { name: "Espresso", price: "₹80", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Americano", price: "₹100", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Cappuccino", price: "₹120", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Caffè Latte", price: "₹130", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Mocha", price: "₹140", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Hot Chocolate", price: "₹120", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
            ]
        },
        "Cold Beverages": {
            items: [
                { name: "Cold Coffee", price: "₹140", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy salads') },
                { name: "Iced Latte", price: "₹150", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy salads') },
                { name: "Chocolate Frappe", price: "₹160", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy salads') },
                { name: "Strawberry Milkshake", price: "₹150", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy salads') },
            ]
        }
      }
    }
  },
  menu: {
    cards: [
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_44_35%20AM.png" },
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_49_51%20AM.png" },
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_49_51%20AM.png" },
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_50_51%20AM.png" },
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_51_49%20AM.png" },
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_54_26%20AM.png" },
    ],
  },
  bestsellers: [
    { name: "Cappuccino", tag: "Most Loved", description: "A classic blend of rich espresso, steamed milk, and a delicate layer of foam.", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
    { name: "Chocolate Cake", tag: "Top Pick", description: "Our decadent chocolate cake is a slice of heaven for any chocolate lover.", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
    { name: "Cold Coffee", tag: "Fan Favorite", description: "A refreshing and creamy cold coffee to cool you down on a hot day.", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy salads') },
    { name: "Cake + Flower Combo", tag: "Perfect Gift", description: "The perfect combination of a delicious cake and a beautiful bouquet.", imageUrl: findImage('gift-combos'), imageHint: findImageHint('gift-combos') },
  ],
  contact: {
    address: "123 Blossom Lane, Flavor Town, 45678",
    phone: "8436860216",
    email: "combocafeandgifts@gmail.com",
    hours: "Mon-Sat: 8am - 8pm | Sun: 9am - 6pm",
    locationUrl: "https://www.google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/@24.1772241,87.7728579,17z/data=!4m7!3m6!1s0x39fa1c2b13747f7d:0x20d4a8fe5d070ebc!8m2!3d24.1772509!4d87.7727781!10e9!16s%2Fg%2F11f10f6vs5?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
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
      { label: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/8436860216" }
    ],
    copyright: `© ${new Date().getFullYear()} Combo Café & Gift Shop. All rights reserved.`,
  },
};
