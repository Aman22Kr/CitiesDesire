# CitiesDesire — 1947 Heritage North Indian Culinary Brand

A modern, responsive, multi-page static web application recreating the legendary culinary presence of **Daryaganj Restaurant** under the brand identity **CitiesDesire** for GitHub user **Aman22kr**.

Built with **Vite**, **React**, **Tailwind CSS**, and **React Router (HashRouter)**, fully prepared for automated static deployment to **GitHub Pages via GitHub Actions**.

---

## 1. What the Website Does

CitiesDesire is an experiential North Indian dining web application that celebrates the historic post-partition invention of **The Original 1947 Butter Chicken** and **The Original 1947 Dal Makhani** by Shri Kundan Lal Jaggi. 

The application provides:
- A showcase of timeless heirloom recipes cooked over charcoal embers with hand-churned white butter.
- An interactive, multi-step **Table Reservation Engine** across 15+ outlets with instant vouchers and cancellation management.
- An interactive **5-Senses Takeaway & Delivery** system with triple-thermal insulation guarantees, botanical aroma notes, and acoustic Spotify soundscapes.
- Comprehensive culinary filtering, dynamic dish detail pages, dietary toggles, customer feedback, and careers portal.

---

## 2. Reference Website & New Brand Identity

| Detail | Specification |
| :--- | :--- |
| **Reference Website** | [https://www.daryaganj.com/](https://www.daryaganj.com/) |
| **New Brand Identity** | **CitiesDesire** ("By the Inventors of Butter Chicken & Dal Makhani") |
| **GitHub User / Owner** | **Aman22kr** |
| **Heritage Anchor** | Post-Partition 1947 Old Delhi, Shri Kundan Lal Jaggi & Swaran Jaggi ("Gold" Edition) |
| **Visual Palette** | Deep Obsidian (`#0c0a09`), Regal Gold (`#c29b38`), Charcoal Taupe (`#1c1917`), Stone Muted (`#a8a29e`) |
| **Typography** | Editorial Serif (`Cormorant Garamond`) + Modern Precision Sans (`Plus Jakarta Sans`) |

---

## 3. Main Pages & Features Implemented

1. **Homepage (`#/`)**:
   - Hero banner with high-resolution royal feast imagery, 1947 heritage tag, and dual CTAs.
   - Dual signature masterpiece spotlight: *The Original 1947 Butter Chicken* and *The Original 1947 Dal Makhani*.
   - The *Five Senses of CitiesDesire* interactive sensory switcher (Touch, Smell, Taste, Hear, See) with an integrated acoustic sitar soundscape player.
   - Gold Private Dining Room & Ambiance spotlight.
   - Awards marquee (NDTV Food Awards 2025, Shark Tank India feature).
   - Diner stories & testimonials.
   - Reusable compact advertisement placeholder.

2. **Heritage Story Page (`#/story`)**:
   - Complete historical narrative of Shri Kundan Lal Jaggi in 1947 Old Delhi.
   - The genesis of Butter Chicken for late-night refugee travelers.
   - 18-hour charcoal simmering technique for Dal Makhani.
   - Swaran Jaggi ("Gold") dedication.
   - Archival documentary video area with a 16:9 blank YouTube placeholder.
   - Interactive historical chronology timeline (1947 to 2026).

3. **Menu Page (`#/menu`)**:
   - Full North Indian heritage menu with categories (1947 Signatures, Charcoal Starters, Gravies, Tandoori Breads, Biryani, Desserts, Beverages).
   - Dynamic real-time search filtering across dish titles, subtitles, descriptions, and ingredients.
   - Dietary selectors: All, Pure Vegetarian, Non-Vegetarian, and Chef's Specials.
   - Sorting options: Popularity, Price (Low to High), Price (High to Low), and Spice Level.
   - Saved favorites quick view filter.
   - Clean anti-pill typography with typographic separators (`·`).

4. **Dish Detail Page (`#/menu/:id`)**:
   - High-fidelity detail page showing origin history, ingredients, serving size, calories, allergens, and customer ratings.
   - Interactive spice profile customizer (*Mild*, *Authentic 1947*, *Spicy*).
   - Serving quantity stepper and direct takeaway bag integration.
   - Perfect pairing suggestions (e.g. Artisanal Cheese Garlic Naan, Damask Rose Shikanji).

5. **Outlets & Sanctuaries (`#/outlets`)**:
   - Directory of 15+ outlets across Delhi NCR, Gurugram, Noida, Punjab (Ludhiana & Mohali), and Bangkok (Sukhumvit Soi 18).
   - City filter tabs, addresses, timings, direct phone dials, and Google Maps direction links.
   - Direct "Book Table" button pre-selecting the destination outlet.

6. **Table Reservations (`#/book-table`)**:
   - Interactive reservation form: Outlet selection, date picker, lunch/dinner slot selector, guest counter, occasion picker, and seating atmosphere (*Gold Private Dining*, *Heritage Main Hall*, *Window Alcove*).
   - Instant booking confirmation voucher with reference code and celebratory confetti.
   - Saved bookings manager displaying active reservations stored in `localStorage` with cancellation options.

7. **5-Senses Delivery & Takeaway (`#/delivery`)**:
   - Interactive cart management: item quantity modification, removal, and spice review.
   - 5-Senses thermal unboxing guarantee breakdown.
   - Promo code simulator (Enter `CITIES1947` or `HERITAGE15` for 15% discount).
   - Doorstep Delivery vs. Outlet Takeaway selector.
   - Checkout simulator generating tracked order codes.

8. **Awards & Press (`#/awards`)**:
   - Exhibition of 56 awards including NDTV Food Awards 2025 and Restaurateur of the Year.
   - Shark Tank India Season 2 feature with a 16:9 blank video presentation placeholder.

9. **Careers Page (`#/careers`)**:
   - Open roles in Culinary Operations, Tandoor Craftsmanship, General Management, and Hospitality.
   - Working application submission form with instant feedback.

10. **Concierge & Contact (`#/contact`)**:
    - Corporate headquarters coordinates and guest assistance hotline.
    - Guest feedback and dining inquiry form with interactive 5-star rating selector.
    - Expandable accordion for Frequently Asked Questions (FAQs).

11. **Custom 404 Page (`*`)**:
    - Heritage-themed recovery page with quick navigation back to Home and Menu.

12. **Compact Advertisement Placeholder (`AdPlaceholder.tsx`)**:
    - Unobtrusive sponsor banner placed near the bottom of all relevant pages above the footer.

13. **YouTube Video Placeholder (`YouTubePlaceholder.tsx`)**:
    - Maintains exact 16:9 aspect ratio and dimensions without external iframe dependencies.

---

## 4. Project Structure

```
citiesdesire/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Official GitHub Pages deployment workflow
├── src/
│   ├── assets/
│   │   └── images/             # Generated high-resolution food & interior assets
│   ├── components/
│   │   ├── AdPlaceholder.tsx   # Reusable compact advertising placeholder
│   │   ├── Footer.tsx          # Heritage footer with brand and GitHub attributions
│   │   ├── Navbar.tsx          # Top Bar Contract compliant 3-zone header
│   │   ├── ToastContainer.tsx  # Non-intrusive action feedback toasts
│   │   └── YouTubePlaceholder.tsx # 16:9 blank video player placeholder
│   ├── context/
│   │   └── AppContext.tsx      # Browser localStorage state & context provider
│   ├── data/
│   │   └── mockData.ts         # Dishes, outlets, 5-senses info, awards, careers, FAQs
│   ├── pages/
│   │   ├── AwardsPage.tsx      # Awards archive & Shark Tank showcase
│   │   ├── BookTablePage.tsx   # Interactive table reservation engine
│   │   ├── CareersPage.tsx     # Job listings & application form
│   │   ├── ContactPage.tsx     # Inquiries, feedback stars, & FAQs
│   │   ├── DeliveryPage.tsx    # 5-Senses delivery checkout & promo codes
│   │   ├── DishDetailPage.tsx  # Dynamic dish detail page (/#/menu/:id)
│   │   ├── HomePage.tsx        # Hero, signature dishes, 5 senses, reviews
│   │   ├── MenuPage.tsx        # Search, categories, dietary filters, cards
│   │   ├── NotFoundPage.tsx    # 404 recovery page
│   │   ├── OutletsPage.tsx     # 15+ outlets across India & Bangkok
│   │   └── StoryPage.tsx       # 1947 origin story & historical timeline
│   ├── types/
│   │   └── index.ts            # TypeScript definitions for entities
│   ├── App.tsx                 # HashRouter setup & scroll restoration
│   ├── index.css               # Tailwind CSS v4 directives & font variables
│   └── main.tsx                # React DOM entry point
├── .env.example                # Runtime environment variables sample
├── .gitignore                  # Git ignore rules (package-lock.json included)
├── index.html                  # HTML5 entry with Cormorant Garamond & Jakarta fonts
├── metadata.json               # Applet identity and capabilities
├── package.json                # Dependencies, scripts, and project metadata
├── package-lock.json           # Verified npm lockfile for npm ci
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite configuration with base: './' for GitHub Pages
```

---

## 5. Prerequisites & Compatible Node.js / npm Versions

- **Node.js**: `v20.x` or `v22.x` (LTS versions recommended).
- **npm**: `v10.x` or higher.
- **Git**: Installed and configured with your GitHub credentials.

---

## 6. How to Install Dependencies

Clone your repository locally and install the verified dependency tree:

```bash
git clone https://github.com/Aman22kr/CitiesDesire.git
cd CitiesDesire
npm ci
```

*(Note: `npm ci` strictly adheres to `package-lock.json` and ensures consistent dependencies across all environments).*

---

## 7. How to Run the Development Server

Start the local Vite development server:

```bash
npm run dev
```

The application will start on `http://localhost:3000` (or `http://localhost:5173`). Open the URL in any modern web browser.

---

## 8. How to Generate and Preview the Production Build

1. Build the production bundle into `./dist`:
   ```bash
   npm run build
   ```

2. Preview the compiled production build locally:
   ```bash
   npm run preview
   ```

3. Type-check without emitting files:
   ```bash
   npm run lint
   ```

---

## 9. How `localStorage` is Used and Its Limitations

The application uses browser `localStorage` under stable keys (`citiesdesire_*`):
- **Cart / Bag**: Preserves selected dishes, quantities, and customized spice preferences.
- **Table Reservations**: Stores submitted bookings with unique reference codes, allowing users to review and cancel reservations across page refreshes.
- **Saved Dishes (Favorites)**: Stores dish IDs bookmarked by the user.
- **Promo Codes**: Stores verified promotional discounts (e.g. `CITIES1947`).
- **Search History & Recently Viewed**: Remembers recent search keywords and visited dish pages.

### Limitations:
- `localStorage` is **specific to the user's current browser and device**.
- Data does **not synchronize across multiple devices** or browsers.
- Clearing browser cache or using Incognito/Private mode will reset the data to default mock records.
- Simulated checkout and reservation flows do not send real SMS messages, charge credit cards, or connect to an external server.

---

## 10. How to Configure the GitHub Repository and Username

1. Create a new GitHub repository named `CitiesDesire` on your GitHub account (`Aman22kr`):
   ```
   https://github.com/new
   Repository name: CitiesDesire
   Visibility: Public
   ```

2. In your local workspace, link your remote origin:
   ```bash
   git remote add origin https://github.com/Aman22kr/CitiesDesire.git
   git branch -M main
   ```

---

## 11. How to Enable GitHub Pages Using GitHub Actions

To host the site on GitHub Pages using the automated workflow:

1. Navigate to your repository on GitHub: `https://github.com/Aman22kr/CitiesDesire`
2. Click on the **Settings** tab.
3. In the left sidebar under the "Code and automation" section, click on **Pages**.
4. Under **Build and deployment** > **Source**, select:
   ```
   GitHub Actions
   ```
5. Save the setting. The `.github/workflows/deploy.yml` workflow will automatically run whenever code is pushed to `main`.

---

## 12. How to Push Changes and Trigger Automatic Deployment

Whenever you make improvements to the codebase:

```bash
git add .
git commit -m "Enhance 1947 menu and reservations"
git push origin main
```

This triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`. Once the workflow finishes (typically 45–60 seconds), your live site will be accessible at:
```
https://Aman22kr.github.io/CitiesDesire/
```

You can also trigger a manual deployment anytime from GitHub under **Actions** > **Deploy to GitHub Pages** > **Run workflow**.

---

## 13. How to Troubleshoot Common Deployment Problems

- **Blank screen on GitHub Pages**:
  - Ensure `vite.config.ts` includes `base: './'`. This guarantees asset paths (`./assets/...`) resolve correctly when deployed to subdirectories like `/CitiesDesire/`.
  - Ensure all routing uses `HashRouter` instead of `BrowserRouter` so that refreshing URLs like `/#/menu` does not return a 404 error from GitHub Pages' static file server.
- **`npm ci` fails during GitHub Action**:
  - Verify that `package-lock.json` is committed to the repository and not excluded by `.gitignore`.
- **Pages deployment workflow permission error**:
  - In your GitHub repository, go to **Settings** > **Actions** > **General** > **Workflow permissions** and select **Read and write permissions**.

---

## 14. How to Change Brand Name, Content, and Visual Theme

1. **Brand Name**:
   - Search and replace `CitiesDesire` across `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/pages/HomePage.tsx`, and `index.html`.
2. **Color Palette**:
   - The brand gold accent is `#c29b38`. To change to another accent (e.g. sapphire `#2563eb` or emerald `#059669`), update the color tokens in `src/index.css` and Tailwind class instances.
3. **Menu & Outlets**:
   - Edit `src/data/mockData.ts` to add, edit, or remove menu items, pricing, images, and restaurant locations.

---

## 15. How to Reuse the Project for Another Website

To rebrand this project for another hospitality brand or cuisine:
1. Update `src/data/mockData.ts` with the new restaurant's menu items, categories, and outlet locations.
2. Replace imagery in `src/assets/images/` or update references in `mockData.ts`.
3. Update brand typography in `index.html` (Google Fonts) and `src/index.css`.
4. Update page titles and OpenGraph tags in `index.html` and `metadata.json`.

---

## 16. Mock Implementations & Remaining Limitations

- **No Live Backend / Database**: All data updates (cart, reservations, job applications, feedback) are stored in client-side `localStorage`.
- **Simulated Payment & Checkout**: The checkout flow simulates order generation with realistic confirmation tracking; no monetary transactions are processed.
- **SMS & Email Notifications**: Reservation and order vouchers are displayed in-app; no third-party SMS or email dispatch service is configured.
- **Video Embeds**: In accordance with the prompt guidelines, video players display high-fidelity blank 16:9 aspect-ratio placeholders instead of embedding external YouTube iframes.

---

*Crafted for Aman22kr | Inspired by the 1947 Culinary Heritage of Daryaganj*
