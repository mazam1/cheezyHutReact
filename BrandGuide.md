# CarooFix — Brand Guide

> **Positioning:** Premium · Trustworthy · Efficient — car valuation & instant buying across UAE.

---

## 1. Brand Essence

**Mission:** Make selling a car in the UAE simple, fast, and trustworthy — letting owners convert vehicles to cash from their home or office with market-accurate offers.

**Vision:** To be the UAE's most trusted digital partner for vehicle resale and valuation — recognized for fairness, speed, and white-glove service.

**Core Values:**
- **Trust:** Transparent price estimates and secure transactions.
- **Speed:** Minimal friction — same-day valuations and fast payouts.
- **Professionalism:** Polished service, knowledgeable valuers, and consistent experiences.
- **Local Expertise:** UAE market-savvy, regulatory-aware, and culturally aligned.

---

## 2. Target Market & Positioning

**Primary Audience:** UAE car owners aged 28–55 who value convenience and trust — expatriates and nationals selling privately or through brokers.

**Secondary Audience:** Dealers and fleet managers seeking quick, honest valuations.

**Market Positioning Statement:**
> CarooFix is the premium, digital-first vehicle buyer in the UAE — combining on-demand convenience with institution-grade trust and clear pricing.

**Competitive Differentiators:**
- Full digital-first valuation flow with optional in-person inspection.
- Transparent market-pricing engine and documented breakdowns.
- White-glove pickup and paperwork handling for a premium experience.

---

## 3. Visual Identity

### Logo
- **Primary mark:** Horizontal lockup with wordmark and monogram (CF / stylized car silhouette inside a shield-like badge).
- **Variants:** Horizontal (primary), stacked (badge above wordmark), and monogram only for favicons and app icons.
- **Clear space:** Maintain a minimum clear space equal to the height of the badge around the logo.
- **Minimum Size:** 40px (monogram), 120px (horizontal lockup) for legibility in digital contexts.
- **Colors:** Use full-color logo on light backgrounds, white logo on dark backgrounds, and single-color (charcoal or gold) for monochrome use.

**Do not:** Stretch, rotate, recolor the monogram outside approved palette, or put the logo over busy imagery without a protective overlay.

### Imagery & Photography
- **Style:** Crisp, high-resolution photography — daylight, natural locations (UAE roads, city skyline), professional car close-ups (3/4 angle), and human elements (valuers, handshakes, keys exchange).
- **Mood:** Confident, calm, professional. Avoid gimmicky or overly playful filters.
- **Palette influence:** Use muted backgrounds with subject in natural colors; apply subtle warm-gold accents to reinforce the premium feel.

### Iconography & Motion
- **Icons:** Minimal geometric line-icons with 2px stroke for general UI; filled + rounded for primary actions. Use consistent stroke widths.
- **Motion:** Subtle micro-interactions — 120–200ms ease-in-out for hover/focus, gentle elevation changes on press, and a tasteful 300–500ms reveal for onboarding modals.

---

## 4. Color System (Light & Dark)

Design uses a restrained, authoritative palette: deep charcoal for trust, warm gold for premium accents, and calm neutrals for surfaces.

### Core Colors (hex)
- **Primary (Charcoal):** `#0B1320` — anchor text & brand weight
- **Secondary (Slate):** `#233040` — navigation, subhead
- **Accent / Gold:** `#C49A36` — CTA accents, microcopy highlights
- **Success:** `#1E9E6F`
- **Warning:** `#E08A00`
- **Danger/Error:** `#C3402F`

### Background & Surface
- **Light background:** `#F7F8FA` (page background)
- **Card surface (light):** `#FFFFFF`
- **Text primary (light):** `#0B1320`
- **Text secondary (light):** `#4B5563`

- **Dark background:** `#0A0F14` (page background)
- **Card surface (dark):** `#0F1720`
- **Text primary (dark):** `#E6EEF6`
- **Text secondary (dark):** `#A8B3C3`

### Neutral Scale (use for UI elements)
- `#F7F8FA` (100)
- `#E6EDF5` (200)
- `#CBD7E3` (300)
- `#94A6BC` (400)
- `#4B5563` (500)
- `#233040` (600)
- `#0B1320` (700)

**Accessibility note:** Ensure minimum contrast ratios: text-on-background >= 4.5:1 for body text. Use tools to verify WCAG AA/AAA compliance for combinations.

---

## 5. Typography

**Primary Typeface (UI / Headings):** *Poppins* — modern, geometric, slightly condensed for confident headers.
- **Fallback stack:** `Poppins, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`.

**Secondary Typeface (Long-form / Tone):** *Inter* — excellent readability for body copy and UI labels.
- **Fallback stack:** `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`.

**Hierarchy (recommended sizes / weights):**
- `H1` 48px / 600 (Poppins)
- `H2` 32px / 600 (Poppins)
- `H3` 24px / 600 (Poppins)
- `H4` 18px / 600 (Poppins)
- `Body` 16px / 400 (Inter)
- `Small` 14px / 400 (Inter)
- `Micro` 12px / 400 (Inter)

Line-height: 1.3–1.6 depending on context. Use tighter leading for large headings and more generous for paragraphs.

---

## 6. Light & Dark Theme Tokens (Tailwind-ready)

```css
:root {
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --text-primary: #0B1320;
  --text-secondary: #4B5563;
  --brand: #0B1320;
  --accent: #C49A36;
  --muted: #CBD7E3;
  --success: #1E9E6F;
  --warning: #E08A00;
  --danger: #C3402F;
}

.dark {
  --bg: #0A0F14;
  --surface: #0F1720;
  --text-primary: #E6EEF6;
  --text-secondary: #A8B3C3;
  --brand: #E6EEF6;
  --accent: #C49A36;
  --muted: #233040;
  --success: #1E9E6F;
  --warning: #E08A00;
  --danger: #C3402F;
}
```

---

*(Content continues as in the BrandGuide.md document you created earlier)*
