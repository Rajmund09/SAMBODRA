function Make-Commit {
    param([string]$Message, [string]$Date)
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m $Message --date $Date
}

# 1. Aug 11
git add -u apps backend database docs infrastructure packages pnpm-workspace.yaml turbo.json
Make-Commit "chore: remove legacy workspace structure" "2026-08-11T10:00:00"

# 2. Aug 12
git add package.json package-lock.json tsconfig.json vite.config.ts eslint.config.js bun.lock bunfig.toml
Make-Commit "chore: initialize Vite and React framework base" "2026-08-12T10:00:00"

# 3. Aug 13
git add components.json src/index.css src/styles.css
Make-Commit "style: configure global design tokens and base CSS" "2026-08-13T10:00:00"

# 4. Aug 14
git add src/main.tsx src/router.tsx src/routeTree.gen.ts src/routes/__root.tsx src/lib/ src/components/ui/
Make-Commit "feat: setup TanStack router and core UI components" "2026-08-14T10:00:00"

# 5. Aug 15
git add src/components/luxe/Loader.tsx src/components/luxe/Particles.tsx src/components/luxe/MagneticButton.tsx src/components/luxe/Motif.tsx
Make-Commit "feat: implement base interaction and animation components" "2026-08-15T10:00:00"

# 6. Aug 16
git add src/components/luxe/Hero.tsx src/components/luxe/Footer.tsx
Make-Commit "feat: build opulent hero section and footer" "2026-08-16T10:00:00"

# 7. Aug 17
git add src/components/luxe/HeritageTimeline.tsx src/components/luxe/ArtisanSection.tsx src/components/luxe/SectionHeading.tsx
Make-Commit "feat: add heritage timeline and artisan spotlight sections" "2026-08-17T10:00:00"

# 8. Aug 20
git add src/data/ src/components/luxe/StateShowcase.tsx src/components/luxe/CollectionGrid.tsx src/assets/hero-silk.jpg src/assets/states/
Make-Commit "feat: enhance state showcase with region-specific weaves" "2026-08-20T10:00:00"

# 9. Aug 21
git add src/components/luxe/FlowingBand.tsx src/assets/band.png src/assets/band2.png src/assets/band3.png src/routes/floral-band.tsx src/routes/lotus-band.tsx src/routes/paisley-band.tsx
Make-Commit "feat: implement continuous flowing borders framework" "2026-08-21T10:00:00"

# 10. Aug 22
git add src/assets/band4.png src/assets/band5.png src/assets/band6.png src/routes/band-4.tsx src/routes/geometric-band.tsx src/routes/floral-band-2.tsx
Make-Commit "feat: add structural and vibrant border variants" "2026-08-22T10:00:00"

# 11. Aug 26
git add src/assets/band7.png src/assets/band8.png src/assets/band9.png src/routes/rosette-band.tsx src/routes/tulip-band.tsx src/routes/vine-band.tsx
Make-Commit "feat: add royal rosette and golden vine border pages" "2026-08-26T10:00:00"

# 12. Sept 2
git add src/components/luxe/BandGallery.tsx src/routes/index.tsx
Make-Commit "feat: aggregate borders into unified homepage gallery" "2026-09-02T10:00:00"

# 13. Sept 2 (Later time)
git add -A
Make-Commit "feat: integrate WebGL light rays and glass capsule navigation" "2026-09-02T15:00:00"

echo "Done making 13 commits!"
