# 👑 RAMAM TEXTILES — Premium Luxury B2B & E-Commerce Platform

> **Authentic Jaipur Craftsmanship • Global Luxury Textiles • Wholesale OEM & Private Label**

**Ramam Textiles** is a production-ready, high-converting digital storefront and wholesale export portal designed for a heritage textile house based in **Jaipur, Rajasthan (India)**. The platform unites traditional Rajasthani craftsmanship (*Bagru Dabu* mud-resist, *Sanganeri* fine botanicals, pure *Mulmul* & *Cambric* cottons) with modern global luxury e-commerce UX.

---

## ✨ Key Features & Architecture

### 1. 🏛️ Luxury Visual Identity & Heritage Storytelling
- Curated color palette inspired by Jaipur palace frescoes, natural indigo vats, sandstone terracotta, and gold foil accents.
- Responsive typography pairing: **Cinzel** (Royal Headings), **Cormorant Garamond** (Editorial Accents), and **Plus Jakarta Sans** (Ultra-crisp modern UI).
- Real artisan workshop imagery covering Bagru printing tables, natural dye boiling, and hand-carved Sheesham woodblocks.

### 2. 💼 B2B Wholesale Engine & Instant RFQ
- **Wholesale Inquiry Basket & RFQ Drawer:** Multi-item selection with customizable MOQ counters (25–50+ units), custom specs notes, and instant quotation dispatch.
- **Direct WhatsApp Concierge:** Pre-filled structured B2B messages with SKU codes, target volumes, and buyer details.
- **Tiered Volume Pricing Matrices:** Tier 1 (MOQ), Tier 2 (Volume 10% off), Tier 3 (OEM Contract Rate) with production lead times.
- **Physical Swatch Folder Courier Request:** Built-in sample booking form for international boutique owners and designers.

### 3. ✂️ Interactive Custom Manufacturing & Private Label Wizard
- 4-Step interactive brief builder allowing designers to customize:
  1. Product Line (Apparel, Bags, Fabrics, Home)
  2. Base Fabric (60s Cambric, Mulmul Muslin, Chanderi Silk, Heavy Quilted Canvas)
  3. Print / Dye Technique (Wooden Hand Block, Bagru Dabu Indigo, Azo-free Natural Dyes)
  4. Private Label Add-ons (Custom Wooden Block Carving, Damask Woven Neck Tags, Gold Foil Swing Tags, Export Barcoding)

### 4. 🛍️ Comprehensive Product Catalog & Sourcing Engine
- Fast multi-criteria filtering: Category, Collection, Base Fabric, Printing Technique, and Sorting.
- Detailed Product Pages with interactive color swatch pickers, size matrices, multi-image galleries, and technical care guides.
- High-resolution **2026 Lookbook** with seasonal filters and lightbox viewing.

### 5. 🌐 Global Currency Converter & Worldwide Export Logistics
- Instant multi-currency calculation: **INR (₹), USD ($), EUR (€), GBP (£), AED (د.إ), AUD (A$)**.
- Dedicated export documentation guides (Certificate of Origin, GSP, DHL/FedEx Express Air & Ocean FCL/LCL Freight).
- Simulated real-time order and shipment milestone tracking.

---

## 🛠️ Technology Stack

- **Core:** React 18 + TypeScript + Vite 5
- **Styling:** Modular CSS design system with custom luxury tokens (`src/index.css`)
- **Icons:** `lucide-react`
- **Effects:** `canvas-confetti`
- **State Management:** React Context API with persistent `localStorage` for the Wholesale Basket

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Run the local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The app will be available at `http://localhost:5173/`.

---

## 📦 How to Deploy & Host on GitHub

### Option A: Deploy to GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add the `homepage` property and deploy scripts to `package.json`:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

### Option B: Push to GitHub & Connect to Vercel / Netlify (Recommended)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Ramam Textiles luxury B2B platform"
   ```
2. Create a new GitHub repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/ramam-textiles.git
   git branch -M main
   git push -u origin main
   ```
3. Import the repository into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant automatic HTTPS hosting and continuous deployment.

---

## 📜 License & Copyright
© 2026 Ramam Textiles. All rights reserved. Handcrafted with pride in Jaipur, Rajasthan, India.
