import automationArt from '@/assets/tiers/feature-automation.webp'
import connectArt from '@/assets/tiers/feature-connect.webp'
import memoryArt from '@/assets/tiers/feature-memory.webp'
import sandboxArt from '@/assets/tiers/feature-sandbox.webp'
import { cn } from '@/lib/utils'

// Reproduces the portal's tier-card hero treatment at thumbnail size: each webp sits
// over a solid well and blends into it. The well is the ONLY hard-coded brand color on
// the billing page — everything else stays on the app's own tokens. It carries the
// Foxxy orange rather than the portal's blue, so the blended art reads warm.
const WELL = '#c2410c'

const BLEND_CLASS = {
  lighten: 'mix-blend-lighten',
  normal: '',
  screen: 'mix-blend-screen'
} as const

type TierBlend = keyof typeof BLEND_CLASS

interface TierArtSpec {
  blend: TierBlend
  src: string
}

// Keyed by lowercase tier NAME, not tier_id: real tier_ids are Prisma cuids that
// differ per environment, while names are stable. `free`/`starter` share the
// entry-tier art. An unknown name resolves to null → the card renders text-only.
const TIER_ART: Record<string, TierArtSpec> = {
  free: { blend: 'screen', src: connectArt },
  plus: { blend: 'screen', src: memoryArt },
  starter: { blend: 'screen', src: connectArt },
  super: { blend: 'lighten', src: automationArt },
  ultra: { blend: 'normal', src: sandboxArt }
}

export function resolveTierArt(tierName?: null | string): null | TierArtSpec {
  if (!tierName) {
    return null
  }

  return TIER_ART[tierName.trim().toLowerCase()] ?? null
}

/**
 * Small rounded thumbnail (~40px) rendering the tier art over an accent-tinted well.
 * Returns null for unknown tiers so the caller lays out a text-only card without
 * reserving empty art space. Imported via vite static imports so the URLs resolve
 * under a packaged `file://` origin with webSecurity on.
 */
export function TierArt({ className, name, size = 40 }: { className?: string; name?: null | string; size?: number }) {
  const art = resolveTierArt(name)

  if (!art) {
    return null
  }

  return (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-md', className)}
      style={{ background: WELL, height: size, width: size }}
    >
      <img
        alt=""
        className={cn('pointer-events-none absolute inset-0 size-full max-w-none object-cover', BLEND_CLASS[art.blend])}
        src={art.src}
      />
    </div>
  )
}
