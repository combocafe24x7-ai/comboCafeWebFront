
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Facebook, Instagram, X } from "lucide-react";

// A custom component for the WhatsApp icon
const WhatsAppIcon = (props: React.ComponentProps<'svg'>) => (
    <svg 
        {...props} 
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89C2.15 13.68 2.63 15.39 3.52 16.89L2.42 21.05L6.72 19.98C8.16 20.76 9.8 21.23 11.5 21.23H12.03C17.49 21.23 21.92 16.79 21.93 11.33C21.93 8.65 20.89 6.2 19.11 4.42C17.33 2.64 14.89 1.6 12.21 1.6L12.04 2ZM12.03 3.68C14.39 3.68 16.54 4.58 18.1 6.14C19.66 7.7 20.56 9.85 20.56 12.21C20.55 16.89 16.85 20.6 12.16 20.6H11.69C10.15 20.6 8.68 20.21 7.42 19.46L7.12 19.28L3.92 20.15L4.8 17.01L4.61 16.7C3.76 15.31 3.29 13.67 3.29 12.03C3.29 7.35 6.99 3.68 11.68 3.68H12.03ZM9.11 7.23C8.91 6.83 8.63 6.84 8.44 6.83C8.28 6.82 8.06 6.88 7.83 7.11C7.6 7.34 7.03 7.86 7.03 8.92C7.03 9.98 7.84 10.97 7.98 11.15C8.13 11.33 9.4 13.56 11.75 14.55C13.68 15.35 14.33 15.19 14.73 15.14C15.13 15.09 16.03 14.54 16.28 13.9C16.53 13.26 16.53 12.75 16.43 12.6C16.33 12.45 16.18 12.39 15.93 12.27C15.68 12.15 14.49 11.58 14.26 11.5C14.03 11.42 13.88 11.39 13.73 11.62C13.58 11.85 13.14 12.39 13 12.54C12.86 12.69 12.71 12.72 12.46 12.6C12.21 12.48 11.45 12.23 10.53 11.39C9.82 10.73 9.35 9.94 9.2 9.76C9.05 9.58 9.17 9.46 9.29 9.34C9.4 9.23 9.53 9.07 9.65 8.93C9.76 8.81 9.81 8.7 9.91 8.5C10.01 8.3 9.96 8.16 9.89 8.01C9.82 7.86 9.31 6.64 9.11 7.23Z"/>
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
        id: "cakes",
        headline: "Handcrafted Cakes",
        subtitle: "Taste the Celebration",
        description: "Experience our collection of artisanal cakes, baked with love and the finest ingredients for your special moments.",
        accentColor: "#FFDA63", // Warm Yellow
      },
      {
        id: "gifts",
        headline: "Curated Gifts",
        subtitle: "Bloom & Smile",
        description: "Brighten any day with our curated selection of fresh, vibrant flowers, arranged to capture the beauty of nature.",
        accentColor: "#FF8A80", // Soft Coral Pink
      },
      {
        id: "food",
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
      {
        id: "offerings",
        label: "Categories",
        sublinks: [
          { 
            id: "cakes", 
            label: "Cakes",
            sublinks: [
              { id: "cakes:Celebration Cakes", label: "Celebration Cakes" },
              { id: "cakes:Cakes & Desserts", label: "Cakes & Desserts" },
            ]
          },
          { id: "gifts", label: "Gifts" },
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
      { id: "contact", label: "Contact" },
    ],
  },
  offerings: {
    cakes: {
      "Celebration Cakes": {
        note: "Please order at least 2 hours in advance.",
        items: [
          { name: "Birthday Delight", description: "A joyous cake to make birthdays special.", price: "Rs350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/birthday%20delight%20350.jpeg", imageHint: "birthday cake" },
          { name: "Black Forest", description: "Classic chocolate sponge with whipped cream and cherries.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Black%20forest450%20.jpeg", imageHint: "black forest" },
          { name: "Butterscotch", description: "Sweet and crunchy butterscotch goodness.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20400.jpeg", imageHint: "butterscotch cake" },
          { name: "Butterscotch", description: "A rich cake with crunchy butterscotch bits.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butter%20scotch%20450.jpeg", imageHint: "butterscotch cake" },
          { name: "Butterscotch", description: "Deliciously rich with a butterscotch glaze.", price: "Rs390", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butterscotch%20390.jpeg", imageHint: "butterscotch cake" },
          { name: "Butterscotch", description: "A crowd-pleasing butterscotch creation.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butterscotch%20450%20(2).jpeg", imageHint: "butterscotch cake" },
          { name: "Butterscotch", description: "Irresistible butterscotch flavor in every bite.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/butterscotch%20450.jpeg", imageHint: "butterscotch cake" },
          { name: "Choco Blush", description: "A delicate chocolate cake with a rosy hint.", price: "Rs500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20blush%20500.jpeg", imageHint: "chocolate cake" },
          { name: "Choco Cafe", description: "The perfect blend of coffee and chocolate.", price: "Rs500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20400.jpeg", imageHint: "coffee cake" },
          { name: "Choco Cafe", description: "A coffee-lover's dream in cake form.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20400.jpeg", imageHint: "coffee cake" },
          { name: "Choco Cafe", description: "Rich coffee-infused chocolate cake.", price: "Rs430", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20cafe%20430%20.jpeg", imageHint: "coffee cake" },
          { name: "Choco Crunch", description: "A chocolate cake with a satisfying crunch.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20crunch%20400%20(2).jpeg", imageHint: "crunchy cake" },
          { name: "Choco Crunch", description: "Crunchy, chocolatey, and utterly delicious.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20crunch%20400.jpeg", imageHint: "crunchy cake" },
          { name: "Choco Delight", description: "A delightful treat for all chocolate lovers.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20delight%20450.jpeg", imageHint: "chocolate cake" },
          { name: "Choco Heart", description: "A heart-shaped cake full of chocolate love.", price: "Rs480", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20heart%20480.jpeg", imageHint: "heart cake" },
          { name: "Choco Heart", description: "The perfect chocolate heart for your loved one.", price: "Rs550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20heart%20550.jpeg", imageHint: "heart cake" },
          { name: "Choco KitKat", description: "A fun and crunchy cake surrounded by KitKat bars.", price: "Rs480", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20kitkat%20480.jpeg", imageHint: "kitkat cake" },
          { name: "Choco Oreo", description: "Creamy Oreo goodness in a decadent cake.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20oreo%20450.jpeg", imageHint: "oreo cake" },
          { name: "Choco Oreo Blush", description: "A beautiful cake blending Oreo and blush tones.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20oreo%20blush%20450%20.jpeg", imageHint: "oreo cake" },
          { name: "Choco Pineapple", description: "A surprising and delicious tropical chocolate mix.", price: "Rs380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20pineapple%20380%20%20(2).jpeg", imageHint: "pineapple cake" },
          { name: "Choco Pineapple", description: "Tropical pineapple meets rich chocolate.", price: "Rs380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20pineapple%20380%20.jpeg", imageHint: "pineapple cake" },
          { name: "Choco Shots", description: "A decadent cake topped with rich chocolate shots.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20shots%20450.jpeg", imageHint: "chocolate cake" },
          { name: "Choco Vanilla", description: "The classic and beloved combination of chocolate and vanilla.", price: "Rs350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20350%20.jpeg", imageHint: "vanilla cake" },
          { name: "Choco Vanilla", description: "A perfect swirl of chocolate and vanilla flavors.", price: "Rs360", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20360.jpeg", imageHint: "vanilla cake" },
          { name: "Choco Vanilla", description: "Classic flavors in a beautifully designed cake.", price: "Rs380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20380%20(2).jpeg", imageHint: "vanilla cake" },
          { name: "Choco Vanilla", description: "Simply delicious chocolate and vanilla.", price: "Rs380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20380.jpeg", imageHint: "vanilla cake" },
          { name: "Choco Vanilla", description: "A timeless favorite for any occasion.", price: "Rs390", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/choco%20vanilla%20390.jpeg", imageHint: "vanilla cake" },
          { name: "Choco Vanilla", description: "Rich chocolate and smooth vanilla in harmony.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Choco%20vanilla%20400.jpeg", imageHint: "vanilla cake" },
          { name: "Christmas Cake", description: "A festive treat to celebrate the holiday season.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/christmas%20cake%20400.jpeg", imageHint: "christmas cake" },
          { name: "Cup Cake", description: "A delightful, single-serving treat.", price: "Rs55", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/cup%20cake%2055.jpeg", imageHint: "cupcake" },
          { name: "Doll Cake (2 pounds)", description: "A beautiful doll cake, perfect for a princess party.", price: "Rs750", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doll%20cake%20750%202%20punds.jpeg", imageHint: "doll cake" },
          { name: "Doll Cake", description: "An enchanting and elegant doll cake creation.", price: "Rs800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doll%20cake%20800.jpeg", imageHint: "doll cake" },
          { name: "Doraemon Cake", description: "A fun cake featuring the beloved character, Doraemon.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/doraemon%20400.jpeg", imageHint: "cartoon cake" },
          { name: "Face Printed", description: "A personalized cake with a custom-printed face.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/face%20printed%20450.jpeg", imageHint: "photo cake" },
          { name: "Filled with Choco Chips", description: "A chocolate chip lover's dream cake.", price: "Rs500", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Filled%20with%20choco%20chips%20500%20.jpeg", imageHint: "chocolate chip" },
          { name: "Football", description: "The perfect cake for a football fan's celebration.", price: "Rs430", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/foot%20ball%20430.jpeg", imageHint: "football cake" },
          { name: "Mango Cake", description: "A refreshing and fruity cake with real mango.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/mango%20cake%20450.jpeg", imageHint: "mango cake" },
          { name: "Mango Delight", description: "A delightful cake bursting with mango flavor.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/mango%20delight%20450.jpeg", imageHint: "mango cake" },
          { name: "Pineapple", description: "A classic and refreshing pineapple-flavored cake.", price: "Rs350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/pineapple%20350.jpeg", imageHint: "pineapple cake" },
          { name: "Princess Cake", description: "A magical cake fit for a princess.", price: "Rs470", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/princes%20cake%20470.jpeg", imageHint: "princess cake" },
          { name: "Pure Choco", description: "For the ultimate chocolate purist, pure bliss.", price: "Rs450", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/pure%20choco%20450.jpeg", imageHint: "chocolate cake" },
          { name: "Queen Neck", description: "An elegant cake with a royal 'queen neck' design.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/queen%20neck%20400.jpeg", imageHint: "elegant cake" },
          { name: "Snow White", description: "A beautiful and pristine white-themed cake.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/snow%20white%20400%20.jpeg", imageHint: "white cake" },
          { name: "Strawberry Blush", description: "A lovely cake with a hint of strawberry blush.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/stawberry%20blush%20400.jpeg", imageHint: "strawberry cake" },
          { name: "Semi Doll Cake", description: "A charming and smaller version of our doll cake.", price: "Rs550", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/swmi%20doll%20cake%20550.jpeg", imageHint: "doll cake" },
          { name: "Two in One", description: "Two delicious flavors combined in one cake.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/two%20in%20one%20400.jpeg", imageHint: "combo cake" },
          { name: "Two in One", description: "Can't decide? Get the best of both worlds.", price: "Rs380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/two%20inone%20380.jpeg", imageHint: "combo cake" },
          { name: "Vanilla", description: "A classic, elegant vanilla cake for any occasion.", price: "Rs350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Vanilla%20350%20.jpeg", imageHint: "vanilla cake" },
          { name: "Vanilla Heart", description: "A heart-shaped cake with lovely vanilla flavor.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/vanilla%20heart%20400.jpeg", imageHint: "heart cake" },
          { name: "Vanilla with Choco Delight", description: "A vanilla base with a delightful chocolate twist.", price: "Rs800", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/Vanilla%20with%20choco%20delight%20800.jpeg", imageHint: "vanilla chocolate" },
          { name: "Vanilla", description: "Pure and simple vanilla perfection.", price: "Rs350", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/vnilla%20350.jpeg", imageHint: "vanilla cake" },
          { name: "White Bloom", description: "An elegant cake adorned with white floral blooms.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/white%20blooms%20400.jpeg", imageHint: "floral cake" },
          { name: "White Forest", description: "A light and creamy cake with white chocolate shavings.", price: "Rs400", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/white%20forest%20400.jpeg", imageHint: "white forest" },
          { name: "Yummy Butterscotch", description: "A truly yummy butterscotch experience.", price: "Rs380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/yummy%20butterscotch%20380%20.jpeg", imageHint: "butterscotch cake" },
          { name: "Yummy Butterscotch", description: "Delicious butterscotch that lives up to its name.", price: "Rs380", imageUrl: "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/cakes/yummy%20butterscoth%20380.jpeg", imageHint: "butterscotch cake" }
        ]
      },
       "Cakes & Desserts": {
        note: "Please order at least 2 hours in advance.",
        items: [
          { name: "Chocolate Cake (Slice)", description: "Decadent layers of rich chocolate sponge and ganache.", price: "Rs120", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
          { name: "Vanilla Cake (Slice)", description: "A classic, elegant vanilla cake with buttercream frosting.", price: "Rs100", imageUrl: findImage('vanilla-cake'), imageHint: findImageHint('vanilla-cake') },
          { name: "Strawberry Cake (Slice)", description: "Light, fruity, and topped with fresh strawberries.", price: "Rs130", imageUrl: findImage('strawberry-cake'), imageHint: findImageHint('strawberry-cake') },
          { name: "Red Velvet Cake", description: "A southern classic with a hint of cocoa and cream cheese frosting.", price: "Rs150", imageUrl: findImage('celebration-cake'), imageHint: findImageHint('celebration-cake') },
          { name: "Chocolate Brownie", description: "Fudgy, dense, and packed with chocolate chunks.", price: "Rs90", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
          { name: "Cup Cake (V/C)", description: "Your choice of vanilla or chocolate, perfectly portioned.", price: "Rs60", imageUrl: findImage('vanilla-cake'), imageHint: findImageHint('vanilla-cake') },
        ]
      },
    },
    gifts: [
        { name: "Single Rose", description: "A timeless, classic gesture of love and appreciation.", imageUrl: findImage('roses'), imageHint: findImageHint('roses'), price: "Rs50" },
        { name: "Flower Bouquets", description: "A stunning, artfully arranged collection of fresh blooms.", imageUrl: findImage('bouquets'), imageHint: findImageHint('bouquets'), price: "Starting at Rs500" },
        { name: "Cake + Flower Combo", description: "The perfect pair: a delicious treat and a beautiful bouquet.", imageUrl: findImage('gift-combos'), imageHint: findImageHint('gift-combos'), price: "Starting at Rs700" },
        { name: "Custom Gift", description: "The perfect gift for any occasion. Let them choose their favorite treat.", imageUrl: findImage('custom-gift'), imageHint: findImageHint('custom-gift'), price: "???" },
    ],
    food: {
      "Snacks": {
        items: [
          { name: "Veg Puff", description: "A flaky pastry filled with a savory vegetable mixture.", price: "Rs60", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches') },
          { name: "Cheese Sandwich", description: "A classic comfort food, grilled to perfection.", price: "Rs90", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches'), originalPrice: "Rs110" },
          { name: "Garlic Bread", description: "Toasted bread with a generous spread of garlic butter.", price: "Rs100", imageUrl: findImage('gourmet-sandwiches'), imageHint: findImageHint('gourmet-sandwiches') },
        ]
      },
      "Beverages": {
        "Hot Beverages": {
            items: [
                { name: "Espresso", description: "A strong, concentrated shot of pure coffee.", price: "Rs80", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
                { name: "Americano", description: "Espresso diluted with hot water for a milder flavor.", price: "Rs100", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
                { name: "Cappuccino", description: "The perfect balance of espresso, steamed milk, and foam.", price: "Rs120", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
                { name: "Caffè Latte", description: "A creamier option with more steamed milk than a cappuccino.", price: "Rs130", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
                { name: "Mocha", description: "A delightful mix of chocolate, espresso, and steamed milk.", price: "Rs140", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
                { name: "Hot Chocolate", description: "Rich, creamy, and comforting, made with real chocolate.", price: "Rs120", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
            ]
        },
        "Cold Beverages": {
            items: [
                { name: "Cold Coffee", description: "A classic creamy and refreshing cold coffee.", price: "Rs140", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
                { name: "Iced Latte", description: "Chilled espresso and milk over ice.", price: "Rs150", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
                { name: "Chocolate Frappe", description: "A blended iced drink with rich chocolate flavor.", price: "Rs160", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
                { name: "Strawberry Milkshake", description: "A thick, creamy milkshake made with real strawberries.", price: "Rs150", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
            ]
        }
      }
    }
  },
  menu: {
    cards: [
      { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_44_35%20AM.png" },
      { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_45_57%20AM.png" },
      { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_49_51%20AM.png" },
      { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_50_51%20AM.png" },
      { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_51_49%20AM.png" },
      { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%207,%202026,%2006_54_26%20AM.png" }
    ]
  },
  giftsGallery: [
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.00%20(1).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.00.jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(1).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(10).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(2).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(3).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(4).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(5).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(6).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(7).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(8).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01%20(9).jpeg" },
    { "url": "https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/gift%20images/WhatsApp%20Image%202026-01-08%20at%2020.19.01.jpeg" }
  ],
  bestsellers: [
    { name: "Cappuccino", tag: "Most Loved", description: "A classic blend of rich espresso, steamed milk, and a delicate layer of foam. It's the perfect pick-me-up at any time of day, loved for its balanced and comforting flavor.", imageUrl: findImage('specialty-coffee'), imageHint: findImageHint('specialty-coffee') },
    { name: "Chocolate Cake", tag: "Top Pick", description: "Our decadent chocolate cake is a slice of heaven for any chocolate lover. Made with rich cocoa and a silky ganache, it's an unforgettable indulgent experience.", imageUrl: findImage('chocolate-cake'), imageHint: findImageHint('chocolate-cake') },
    { name: "Cold Coffee", tag: "Fan Favorite", description: "A refreshing and creamy cold coffee to cool you down on a hot day. It's a sweet, smooth, and energizing treat that has become a customer favorite.", imageUrl: findImage('healthy-salads'), imageHint: findImageHint('healthy-salads') },
    { name: "Cake + Flower Combo", tag: "Perfect Gift", description: "The perfect combination of a delicious cake and a beautiful bouquet. This thoughtful gift is ideal for birthdays, anniversaries, or just to make someone's day special.", imageUrl: findImage('gift-combos'), imageHint: findImageHint('gift-combos') },
  ],
  contact: {
    address: "123 Blossom Lane, Flavor Town, 45678",
    phone: "8436860216",
    email: "combocafe24x7@gmail.com",
    hours: "Open Daily: 10am - 8pm",
    locationUrl: "https://www.google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/@24.1772241,87.7728579,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPa8FLuLWnB1huMew0G3KiWQ6ZlK760fuVO02So!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipPa8FLuLWnB1huMew0G3KiWQ6ZlK760fuVO02So%3Dw137-h195-k-no!7i2480!8i3508!4m7!3m6!1s0x39fa1c2b13747f7d:0x20d4a8fe5d070ebc!8m2!3d24.1772509!4d87.7727781!10e9!16s%2Fg%2F11f10f2vs5?entry=ttu&amp;g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
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
      { label: "About", href: "/about" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
    social: [
      { label: "Instagram", Icon: Instagram, href: "#" },
      { label: "X", Icon: X, href: "#" },
      { label: "Facebook", Icon: Facebook, href: "#" },
      { label: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/8436860216" }
    ],
    copyright: `© ${new Date().getFullYear()} Combo Café & Gift Shop. All rights reserved.`,
  },
};

    