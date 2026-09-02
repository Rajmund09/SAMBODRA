$ErrorActionPreference = "Stop"

# Helper function
function Commit-Chunk {
    param(
        [string]$Message,
        [string]$Date,
        [string[]]$Files
    )
    Write-Host "Committing: $Message"
    foreach ($file in $Files) {
        git add $file
    }
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m $Message --date=$Date
}

# 1
Commit-Chunk -Message "Initialize Next.js application structure" -Date "2026-08-09T10:00:00" -Files @(
    "apps/web/package.json",
    "apps/web/package-lock.json",
    "apps/web/tsconfig.json",
    "apps/web/next.config.ts",
    "apps/web/eslint.config.mjs",
    "apps/web/README.md",
    "apps/web/.gitignore",
    "apps/web/AGENTS.md",
    "apps/web/CLAUDE.md",
    "apps/web/public",
    "apps/web/app/favicon.ico"
)

# 2 (Delete old tracked files)
git add -u apps/web
$env:GIT_COMMITTER_DATE = "2026-08-09T11:30:00"
git commit -m "Cleanup deleted scaffolded files" --date="2026-08-09T11:30:00"

# 3
Commit-Chunk -Message "Migrate global CSS and remove Tailwind" -Date "2026-08-09T13:00:00" -Files @(
    "apps/web/app/globals.css",
    "apps/web/app/page.module.css"
)

# 4
Commit-Chunk -Message "Update Root Layout with metadata" -Date "2026-08-09T14:30:00" -Files @(
    "apps/web/app/layout.tsx"
)

# 5
Commit-Chunk -Message "Extract static taxonomy data" -Date "2026-08-09T16:00:00" -Files @(
    "apps/web/utils/data.ts"
)

# 6
Commit-Chunk -Message "Create SVG patterns generator utility" -Date "2026-08-09T17:30:00" -Files @(
    "apps/web/utils/patterns.ts"
)

# 7
Commit-Chunk -Message "Implement global ModalProvider for context" -Date "2026-08-09T19:00:00" -Files @(
    "apps/web/providers/ModalProvider.tsx"
)

# 8
Commit-Chunk -Message "Create animated Loader component" -Date "2026-08-10T09:00:00" -Files @(
    "apps/web/components/Loader.tsx"
)

# 9
Commit-Chunk -Message "Create Nav component with mobile menu" -Date "2026-08-10T10:30:00" -Files @(
    "apps/web/components/Nav.tsx"
)

# 10
Commit-Chunk -Message "Create Hero component with 3D tilt effects" -Date "2026-08-10T12:00:00" -Files @(
    "apps/web/components/Hero.tsx"
)

# 11
Commit-Chunk -Message "Implement Marquee and Craft story sections" -Date "2026-08-10T13:30:00" -Files @(
    "apps/web/components/Marquee.tsx",
    "apps/web/components/Craft.tsx"
)

# 12
Commit-Chunk -Message "Create interactive RegionExplorer component" -Date "2026-08-10T15:00:00" -Files @(
    "apps/web/components/RegionExplorer.tsx"
)

# 13
Commit-Chunk -Message "Build Weaves showcase and Refine taxonomy" -Date "2026-08-10T16:30:00" -Files @(
    "apps/web/components/Weaves.tsx",
    "apps/web/components/Refine.tsx",
    "apps/web/components/Editorial.tsx"
)

# 14
Commit-Chunk -Message "Finalize Heritage, Footer, and assemble Home page" -Date "2026-08-10T18:00:00" -Files @(
    "apps/web/components/Heritage.tsx",
    "apps/web/components/Newsletter.tsx",
    "apps/web/components/Footer.tsx",
    "apps/web/app/page.tsx"
)

git push
