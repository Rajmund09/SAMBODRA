# Sambodra Weaver UI

# SAMBODRA Lovable Prompt

Copy and paste the following prompt into Lovable to generate the SAMBODRA frontend:

***

**Role & Objective:**

Act as an elite frontend engineer and UI/UX luxury designer. Your objective is to build the initial working frontend for "SAMBODRA", a high-end Luxury Indian Saree E-commerce Platform. The application must exude absolute premium quality, cultural heritage, and modern web excellence.

**Tech Stack Requirements:**

- Framework: Next.js (App Router) or Vite (React)

- Language: TypeScript

- Styling: Tailwind CSS (use arbitrary values for precise luxury spacing/colors)

- Animation: Framer Motion (essential for all interactions), GSAP (for complex timelines), Lenis (smooth scrolling)

- 3D/Effects: React Three Fiber (for silk/fabric textures and particle effects)

- State Management: Zustand

- Data Fetching: TanStack Query (React Query)

- UI Library: shadcn/ui (customized heavily for luxury aesthetics) + Radix UI

**Design & Aesthetic Guidelines:**

1. **Vibe**: Opulent, heritage-meets-modern, immersive, and wildly expensive. Think Dior or Sabyasachi, but highly interactive.

2. **Color Palette**: Deep rich tones (Charcoal Black, Midnight Blue, Deep Maroon) mixed with metallic accents (Gold `#D4AF37`, Rose Gold `#B76E79`, Antique Silver).

3. **Typography**: Use a highly elegant serif font (like Playfair Display or Cinzel) for headings and an ultra-clean sans-serif (Inter or Outfit) for body text and navigation.

4. **Interactions**: Implement a custom trailing cursor (perhaps a golden thread or motif). Every hover state should feel intentional (slow eases, slight scales, glowing drop shadows).

5. **Glassmorphism**: Use sophisticated frosted glass effects (`backdrop-blur`) on navigation and floating cards to overlay on rich silk texture backgrounds.

**Core Sections to Build (Single Page / Landing Structure):**

1. **Immersive Hero Section**: 

   - Full-screen video or React Three Fiber silk fabric simulation background.

   - Large, elegant typography: "SAMBODRA - The Threads of Heritage".

   - A subtle, glowing "Explore the Royal Collection" CTA button.

   - Custom floating navbar that transitions from transparent to solid glassmorphism on scroll.

2. **The Heritage Timeline**: 

   - A vertical or horizontal scrolling timeline using GSAP ScrollTrigger.

   - Showcasing the history of Indian weaving, with fade-in images of artisans and looms.

3. **State Showcase (Interactive Heroic Section)**: 

   - The absolute masterpiece of the site. A section highlighting states (Odisha, West Bengal, Tamil Nadu, Uttar Pradesh, Kerala, Rajasthan).

   - **Interaction**: When a user clicks or hovers on a state name, the *entire background of the section* must seamlessly transition (using Framer Motion `AnimatePresence`).

   - Changes per state: Background color palette, specific decorative mandala/motifs, particle effects (e.g., gold dust for Rajasthan, dew drops for Kerala), and ambient lighting. 

4. **Premium Collections Carousel**: 

   - Horizontal scrolling carousel of saree cards.

   - Each card must be tall and elegant. On hover, the image scales slightly, and a "Quick View" button reveals itself. Include badges like "Handloom" or "Pure Silk".

5. **Artisan Stories**: 

   - A split layout. Left side: High-quality portrait of a weaver. Right side: A poetic description of their craft. Parallax scrolling effect on the image.

6. **Footer**: 

   - Grand, multi-column footer. Newsletter signup with a sophisticated floating label input. Instagram gallery grid. Copyright and links.

**Component Requirements:**

- **Navigation**: Mega-menu style dropdowns for "Collections" and "States".

- **Buttons**: Luxury magnetic buttons. When the mouse approaches, the button slightly pulls towards the cursor.

- **Loader**: A custom initial page loader featuring a spinning golden chakra or a weaving thread animation before revealing the site.

**Execution Rules:**

- DO NOT use generic placeholder colors (no standard blue-500 or red-500). Use the defined luxury palette.

- DO NOT just use static images. Where possible, add subtle continuous floating animations to motifs or background elements.

- Ensure all animations use custom bezier curves (e.g., `ease: [0.43, 0.13, 0.23, 0.96]`) for cinematic smoothness.

- Build this as a modular structure: separate your UI components, features, and animations.

- Make it fully responsive, ensuring the luxury feel translates perfectly to mobile devices.

Begin by building the Hero Section, State Showcase, and the overarching Navigation/Layout with the defined luxury theme.

***



enhance things by yours and implement

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://regal-weave-lab.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1a763e05-e5f2-4674-bca1-927bfbdad5d7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
