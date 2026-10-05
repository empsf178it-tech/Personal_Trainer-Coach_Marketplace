# PULSEFIT — Personal Trainer & Coach Marketplace

**Brand Tagline:** “Train Smarter. Recover Better.”  
**Category:** Nutrition & Recovery / Fitness Marketplace

PULSEFIT is a premium, lightweight, responsive frontend website that connects individuals with certified personal trainers, nutrition specialists, and mobility/recovery coaches.

---

## 🌟 Key Features

1. **Brand Identity & Design System**:
   - Custom palette: Midnight Charcoal (`#151917`), Performance Green (`#B9F56A`), Warm White (`#F8F8F3`), Soft Gray (`#E8EAE4`), Graphite (`#636961`).
   - Premium Google Typography: `Space Grotesk` (headings) and `Inter` (body).
   - High-quality editorial athletic and lifestyle photography.

2. **Mobile-First Responsive Navbar**:
   - **Desktop (≥ 992px)**: Sticky header with wordmark, center links, and CTA button.
   - **Mobile (< 992px)**: Strict display showing **ONLY** the PULSEFIT brand name on the left and Hamburger on the right.
   - **Mobile Navigation Overlay**: Full-screen dark charcoal overlay menu (`01 — Home`, `02 — About`, `03 — Services`, `04 — Contact`) with smooth slide animations, staggered link reveals, body scroll-lock, and ESC key closing.

3. **Homepage (7 Sections)**:
   - **Section 01 — Hero**: Cinematic full-width background photo, slow image zoom, scroll indicator, green accent underline, dual CTAs.
   - **Section 02 — Our Approach**: The PULSEFIT Method with 3 pillars (TRAIN, NOURISH, RECOVER).
   - **Section 03 — Featured Coaches**: 3 trainer profiles (Alex Morgan, Priya Sharma, Daniel Brooks) with profile detail modals.
   - **Section 04 — Coaching Programs**: Interactive program cards opening detail modals.
   - **Section 05 — How It Works**: 4-step horizontal (desktop) / vertical (mobile) timeline with animated progress bar.
   - **Section 06 — Nutrition & Recovery**: Split-screen editorial layout highlighting holistic wellness.
   - **Section 07 — Final CTA & Footer**: High-impact closing section with consistent footer.

4. **About Page (6 Sections)**:
   - About Hero, Our Story, Core Principles (Individuality, Consistency, Balance), Network Showcase, What Makes Us Different, Closing CTA.

5. **Services Page (6 Sections)**:
   - Services Hero, Personal Training, Nutrition Coaching, Mobility & Recovery, Interactive Coach Directory (with dynamic JS category filtering), Get Started CTA.

6. **Pricing Page (5 Unique Sections with Animations)**:
   - **Section 01 — Pricing Hero & Billing Toggle**: Animated Monthly vs Annual discount toggle (Save 20%).
   - **Section 02 — Coaching Tier Cards**: 3 animated pricing tiers (Essential, Pro Performance, Elite) with "Most Popular" highlight badge.
   - **Section 03 — Core Benefits Grid**: 4-column feature breakdown with micro-animations.
   - **Section 04 — Interactive Habit & Impact Calculator**: Interactive range slider and goal selector calculating estimated coach oversight hours and progress velocity.
   - **Section 05 — 30-Day Risk-Free Guarantee & Final CTA**: Money-back promise and direct plan inquiry trigger.

7. **Contact Page (5 Sections)**:
   - Contact Hero, Contact Form with full client-side JS validation and success state, How We Can Help, Accessible FAQ Accordion, Final CTA.


7. **Accessibility & Motion Language**:
   - ARIA roles, focus management, modal focus trap, `prefers-reduced-motion` CSS overrides, and zero horizontal scrolling (`overflow-x: hidden` / responsive grids).

---

## 🚀 How to Run Locally

Since this is a lightweight frontend-only website using standard HTML5, CSS3, Vanilla JavaScript ES6, and CDN dependencies:

1. **Direct Browser**:
   Double click or open any of the HTML files directly in your web browser:
   - `pulsefit/index.html`
   - `pulsefit/about.html`
   - `pulsefit/services.html`
   - `pulsefit/contact.html`

2. **Local HTTP Server (Optional)**:
   If using a local web server (e.g., Python or Node live-server):
   ```bash
   cd pulsefit
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 📁 File Structure

```text
pulsefit/
├── index.html
├── about.html
├── services.html
├── pricing.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── hero-bg.jpg
│       ├── coach-alex.jpg
│       ├── coach-priya.jpg
│       ├── coach-daniel.jpg
│       ├── program-strength.jpg
│       ├── program-fatloss.jpg
│       ├── program-nutrition.jpg
│       ├── program-recovery.jpg
│       ├── about-hero.jpg
│       ├── about-story.jpg
│       └── pricing-hero.jpg
└── README.md
```

---

## 🛠️ Tech Stack & Constraints
- **HTML5** & **CSS3** (Custom Properties, Flexbox, Grid)
- **Vanilla JavaScript (ES6)** (DOM Manipulation, IntersectionObserver)
- **Bootstrap 5** (CDN layout utilities)
- **Google Fonts** (Space Grotesk & Inter via CDN)
- **No external animation libraries** (Native CSS keyframes & transitions)
