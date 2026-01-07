
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
    accentColor: "#FFDA63",
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
        accentColor: "#FFB6C1", // Baby Pink
      },
      {
        id: "flowers" as const,
        headline: "Fresh Flowers",
        subtitle: "Bloom & Smile",
        description: "Brighten any day with our curated selection of fresh, vibrant flowers, arranged to capture the beauty of nature.",
        accentColor: "#FF8A80", // Soft Coral
      },
      {
        id: "food" as const,
        headline: "Delicious Food",
        subtitle: "Gifts of Joy",
        description: "Discover the perfect pairing of flavors and flowers. Our special combos are designed to make any occasion unforgettable.",
        accentColor: "#82B1FF", // Sky Blue
      },
    ],
  },
  navigation: {
    links: [
      { id: "home", label: "Home" },
      { id: "bestsellers", label: "Best Sellers" },
      {
        id: "offerings",
        label: "Offerings",
        sublinks: [
          { 
            id: "cakes", 
            label: "Cakes",
            sublinks: [
              { id: "cakes:Celebration Cakes", label: "Celebration Cakes" },
              { id: "cakes:Cakes & Desserts", label: "Cakes & Desserts" },
            ]
          },
          { id: "flowers", label: "Flowers" },
          { 
            id: "food", 
            label: "Food",
            sublinks: [
              { id: "food:Snacks", label: "Snacks" },
              { 
                id: "food:Beverages", 
                label: "Beverages",
                sublinks: [
                  { id: "food:Beverages:Hot Beverages", label: "Hot Beverages" },
                  { id: "food:Beverages:Cold Beverages", label: "Cold Beverages" },
                ]
              },
            ]
          },
        ]
      },
      { id: "menu", label: "Menu" },
      { id: "contact", label: "Contact" },
    ],
  },
  offerings: {
    cakes: {
      "Celebration Cakes": {
        note: "You have to order",
        items: [
          { name: "Chocolate Cake", description: "Decadent layers of rich chocolate sponge and ganache.", price: "Rs 120", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
          { name: "Vanilla Cake", description: "A classic, elegant vanilla cake with buttercream frosting.", price: "Rs 100", imageUrl: findImage('vanilla-cake'), imageHint: findImageHint('vanilla-cake') },
          { name: "Strawberry Cake", description: "Light, fruity, and topped with fresh strawberries.", price: "Rs 130", imageUrl: findImage('strawberry-cake'), imageHint: findImageHint('strawberry-cake') },
          { name: "Red Velvet Cake", description: "A southern classic with a hint of cocoa and cream cheese frosting.", price: "Rs 150", imageUrl: findImage('celebration-cake'), imageHint: findImageHint('celebration-cake') },
          { name: "Chocolate Brownie", description: "Fudgy, dense, and packed with chocolate chunks.", price: "Rs 90", imageUrl: findImage('best-seller-1'), imageHint: findImageHint('best-seller-1') },
          { name: "Cup Cake (V/C)", description: "Your choice of vanilla or chocolate, perfectly portioned.", price: "Rs 60", imageUrl: findImage('best-seller-3'), imageHint: findImageHint('best-seller-3') },
        ]
      },
      "Cakes & Desserts": {
        items: [
          { name: "Choco Slice", description: "A perfect single serving of our decadent chocolate cake.", price: "Rs 120", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake'), originalPrice: "Rs 150" },
          { name: "Vanilla Slice", description: "A slice of classic vanilla cake, simple and delicious.", price: "Rs 100", imageUrl: findImage('vanilla-cake'), imageHint: findImageHint('vanilla-cake') },
          { name: "Strawberry Slice", description: "Enjoy the fresh, fruity flavor of our strawberry cake.", price: "Rs 130", imageUrl: findImage('strawberry-cake'), imageHint: findImageHint('strawberry-cake') },
          { name: "Red Velvet Slice", description: "A slice of our famous red velvet cake.", price: "Rs 150", imageUrl: findImage('celebration-cake'), imageHint: findImageHint('celebration-cake') },
          { name: "Fudgy Brownie", description: "Rich, chewy, and intensely chocolatey.", price: "Rs 90", imageUrl: findImage('best-seller-1'), imageHint: findImageHint('best-seller-1') },
        ]
      }
    },
    flowers: [
        { name: "Single Rose", description: "A timeless, classic gesture of love and appreciation.", imageUrl: findImage('roses'), imageHint: findImageHint('roses'), price: "Rs 50" },
        { name: "Flower Bouquets", description: "A stunning, artfully arranged collection of fresh blooms.", imageUrl: findImage('bouquets'), imageHint: findImageHint('bouquets'), price: "Starting at Rs 500" },
        { name: "Cake + Flower Combo", description: "The perfect pair: a delicious treat and a beautiful bouquet.", imageUrl: findImage('gift-combos'), imageHint: findImageHint('gift-combos'), price: "Starting at Rs 700" },
    ],
    food: {
      "Snacks": {
        items: [
          { name: "Veg Puff", description: "A flaky pastry filled with a savory vegetable mixture.", price: "Rs 60", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches') },
          { name: "Cheese Sandwich", description: "A classic comfort food, grilled to perfection.", price: "Rs 90", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches'), originalPrice: "Rs 110" },
          { name: "Garlic Bread", description: "Toasted bread with a generous spread of garlic butter.", price: "Rs 100", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches') },
        ]
      },
      "Beverages": {
        "Hot Beverages": {
            items: [
                { name: "Espresso", description: "A strong, concentrated shot of pure coffee.", price: "Rs 80", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Americano", description: "Espresso diluted with hot water for a milder flavor.", price: "Rs 100", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Cappuccino", description: "The perfect balance of espresso, steamed milk, and foam.", price: "Rs 120", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Caffè Latte", description: "A creamier option with more steamed milk than a cappuccino.", price: "Rs 130", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Mocha", description: "A delightful mix of chocolate, espresso, and steamed milk.", price: "Rs 140", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
                { name: "Hot Chocolate", description: "Rich, creamy, and comforting, made with real chocolate.", price: "Rs 120", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty coffee') },
            ]
        },
        "Cold Beverages": {
            items: [
                { name: "Cold Coffee", description: "A classic creamy and refreshing cold coffee.", price: "Rs 140", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
                { name: "Iced Latte", description: "Chilled espresso and milk over ice.", price: "Rs 150", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
                { name: "Chocolate Frappe", description: "A blended iced drink with rich chocolate flavor.", price: "Rs 160", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
                { name: "Strawberry Milkshake", description: "A thick, creamy milkshake made with real strawberries.", price: "Rs 150", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
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
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%nbsp;06_50_51%20AM.png" },
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_51_49%20AM.png" },
      { url: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_54_26%20AM.png" },
    ],
  },
  bestsellers: [
    { name: "Cappuccino", tag: "Most Loved", description: "A classic blend of rich espresso, steamed milk, and a delicate layer of foam. It's the perfect pick-me-up at any time of day, loved for its balanced and comforting flavor.", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
    { name: "Chocolate Cake", tag: "Top Pick", description: "Our decadent chocolate cake is a slice of heaven for any chocolate lover. Made with rich cocoa and a silky ganache, it's an unforgettable indulgent experience.", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
    { name: "Cold Coffee", tag: "Fan Favorite", description: "A refreshing and creamy cold coffee to cool you down on a hot day. It's a sweet, smooth, and energizing treat that has become a customer favorite.", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
    { name: "Cake + Flower Combo", tag: "Perfect Gift", description: "The perfect combination of a delicious cake and a beautiful bouquet. This thoughtful gift is ideal for birthdays, anniversaries, or just to make someone's day special.", imageUrl: findImage('gift-combos'), imageHint: findImageHint('gift-combos') },
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
