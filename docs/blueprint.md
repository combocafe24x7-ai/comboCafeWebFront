# **App Name**: Combo Café Cinematic

## Core Features:

- Dynamic Content Loading: Load all brand and product content (brand name, hero headline, descriptions, theme colors, product categories, menu items, contact details, social links, FAQs, WebP URLs) from a single JavaScript config object.
- Animated WebP Hero: Implement a full-screen hero section with an animated WebP background that loops smoothly, ensuring optimal GPU performance.
- Parallax Scrolling: Add gentle parallax effects (scale-in and vertical translate) to the hero section to create a smooth, cinematic feel without causing jank.
- Category Switching: Implement a right-side navigation control to switch between product categories (Cakes, Flowers, Special Combos), updating the hero text, accent color, and highlighted product category with fade-in/out animations.
- Product Grids/Tabs: Display cake and flower categories in grid or tab layouts, loading content from the JavaScript config object.
- Menu Display: Present café beverages, snacks, and desserts using menu items stored in a JavaScript array, dynamically displaying names, descriptions, prices, and categories.
- Theme Toggle: Switch between dark and light themes by leveraging information about theme settings defined in the Javascript config file.

## Style Guidelines:

- Color scheme: Dark mode (default) with a deep charcoal background (#121212), warm white text (#F0F0F0), and café-style warm highlights. Light mode with a soft off-white background (#F5F5F5), dark brown text (#333333), and subtle shadows.
- Accent color: Apply the brand's theme color (defined in the config) to CTA buttons, active indicators, section highlights, navigation accents, and hover states. To make the proposal more specific, the user has requested an example using warm yellow as theme accent color, using RGB hex value: #FFDA63.
- Font pairing: 'Playfair' (serif) for headlines, providing an elegant, fashionable feel, paired with 'PT Sans' (sans-serif) for body text.
- Note: currently only Google Fonts are supported.
- Cinematic hero section: Full-screen with the animated WebP background, overlay content on the left side, and right-side navigation control, maintaining a visually empty center area.
- Loading experience: Implement a full-screen loader with the brand name and a minimal spinner until the hero WebP is ready, then fade smoothly into the hero. Use small loaders near the PREV/NEXT control during category switches.
- Social icons: Use monochrome, theme-adaptive social icons in the footer.