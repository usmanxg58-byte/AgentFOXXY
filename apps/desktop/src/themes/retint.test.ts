import { describe, expect, it } from 'vitest'

import { contrastRatio, hexToOklch, withHue } from './color'
import { githubTheme, nousTheme } from './presets'
import { retintTheme, themeHue } from './retint'
import type { DesktopThemeColors } from './types'

const HUES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

// A retint seed for each hue, at the authored accent's lightness/chroma.
const seedAt = (hue: number) => withHue(nousTheme.colors.primary, hue)

/** The Foxxy brand orange, as the CLI wordmark uses it. 7.3:1 on the dark
 *  sidebar but only 2.6:1 on the light one, so light has to darken it. */
const FOXXY_ORANGE = '#F97316'

/** A burnt orange: 6.6:1 on the light sidebar, 2.9:1 on the dark one. The
 *  mirror of FOXXY_ORANGE, so dark is the mode that has to adapt. */
const DEEP_ORANGE = '#963f02'

describe('themeHue', () => {
  it('reads the accent hue that ships', () => {
    // Foxxy orange. Both palettes sit at this hue — light seeds `#ab4a00` and
    // dark `#d06c33`, the same orange at two lightnesses, which is what lets one
    // pick serve both appearances.
    expect(themeHue(nousTheme)).toBe(48)
    expect(Math.round(hexToOklch(nousTheme.darkColors!.primary)!.h)).toBe(48)
  })

  it('reads the upstream GitHub green from the unforked theme', () => {
    // `github` keeps the original accent, so the fork's orange can move freely
    // without redefining what upstream looks like.
    expect(themeHue(githubTheme)).toBe(148)
    expect(Math.round(hexToOklch(githubTheme.darkColors!.primary)!.h)).toBe(148)
  })
})

// The two seeds are the whole point of the fork, and both are load-bearing:
// `#ab4a00` is the brand orange at the deepest lightness that still clears AA on
// the light sidebar, and dark carries a lifted twin because that same hex is
// under 4.5:1 on the near-black one. Anything that re-derives these must keep
// both legible.
describe('the shipped nous accents', () => {
  const cases = [
    { appearance: 'light', colors: nousTheme.colors, seed: '#ab4a00' },
    { appearance: 'dark', colors: nousTheme.darkColors!, seed: '#d06c33' }
  ] as const

  it.each(cases)('$appearance seeds every accent slot from $seed', ({ colors, seed }) => {
    for (const key of ['primary', 'ring', 'midground', 'composerRing'] as const) {
      expect(colors[key]).toBe(seed)
    }
  })

  it.each(cases)('$appearance clears AA on its own sidebar', ({ colors, seed }) => {
    expect(contrastRatio(seed, colors.sidebarBackground!)).toBeGreaterThanOrEqual(4.5)
  })

  it.each(cases)('$appearance keeps text on the accent readable', ({ colors, seed }) => {
    expect(contrastRatio(seed, colors.primaryForeground)).toBeGreaterThanOrEqual(4.5)
  })

  it('is one orange at two lightnesses, not two oranges', () => {
    const light = hexToOklch(nousTheme.colors.primary)!
    const dark = hexToOklch(nousTheme.darkColors!.primary)!

    expect(Math.abs(light.h - dark.h)).toBeLessThan(2)
    expect(dark.l).toBeGreaterThan(light.l)
  })

  it('leaves GitHub’s neutrals in place — only the accent family is forked', () => {
    for (const key of ['background', 'foreground', 'card', 'border', 'sidebarBackground'] as const) {
      expect(nousTheme.colors[key]).toBe(githubTheme.colors[key])
      expect(nousTheme.darkColors![key]).toBe(githubTheme.darkColors![key])
    }
  })
})

describe('retintTheme', () => {
  // The load-bearing property: the mix ratios in retint.ts must be the same
  // ones that produced the shipped palette. If they drift, retinting at the
  // theme's OWN hue stops being a no-op — and this catches it.
  it('is an identity at the theme’s own accent', () => {
    const same = retintTheme(nousTheme, nousTheme.colors.primary)

    expect(same.colors).toEqual(nousTheme.colors)
    expect(same.darkColors).toEqual(nousTheme.darkColors)
  })

  it('moves every accent-family slot, in both modes', () => {
    const rose = retintTheme(nousTheme, seedAt(350))

    for (const mode of ['colors', 'darkColors'] as const) {
      const before = nousTheme[mode]!
      const after = rose[mode]!

      for (const key of [
        'primary',
        'ring',
        'midground',
        'composerRing',
        'accent',
        'secondary',
        'userBubble'
      ] as const) {
        expect(after[key], `${mode}.${key}`).not.toBe(before[key])
      }
    }
  })

  it('keeps the four seed slots locked together', () => {
    const teal = retintTheme(nousTheme, seedAt(195)).colors

    expect(teal.ring).toBe(teal.primary)
    expect(teal.midground).toBe(teal.primary)
    expect(teal.composerRing).toBe(teal.primary)
  })

  it('leaves the chrome alone', () => {
    // The neutrals are the app's surface, not its brand. A hue knob that also
    // swung these would make every theme a monochrome wash.
    const violet = retintTheme(nousTheme, seedAt(285))

    for (const key of ['background', 'foreground', 'card', 'border', 'muted', 'mutedForeground'] as const) {
      expect(violet.colors[key], key).toBe(nousTheme.colors[key])
      expect(violet.darkColors![key], `dark ${key}`).toBe(nousTheme.darkColors![key])
    }
  })

  it('holds perceived lightness and chroma while only the hue moves', () => {
    const base = hexToOklch(nousTheme.colors.primary)!

    for (const hue of HUES) {
      const seed = hexToOklch(retintTheme(nousTheme, seedAt(hue)).colors.primary)!

      expect(Math.abs(seed.l - base.l), `L at ${hue}`).toBeLessThan(0.02)
      // Chroma can only be REDUCED, and only where sRGB can't show it.
      expect(seed.c, `C at ${hue}`).toBeLessThanOrEqual(base.c + 0.005)
    }
  })

  // The accent labels the sidebar in small uppercase text, so a hue that
  // collapses against it ships invisible section headers.
  it('keeps the accent readable on the sidebar at every hue', () => {
    for (const hue of HUES) {
      const t = retintTheme(nousTheme, seedAt(hue))

      for (const mode of ['colors', 'darkColors'] as const) {
        const c = t[mode] as DesktopThemeColors
        const ratio = contrastRatio(c.primary, c.sidebarBackground ?? c.background)

        expect(ratio, `${mode} @ ${hue}°`).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  it('re-picks the foreground that sits on the accent', () => {
    for (const hue of HUES) {
      const c = retintTheme(nousTheme, seedAt(hue)).colors

      expect(contrastRatio(c.primary, c.primaryForeground), `on-accent @ ${hue}°`).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('accepts any hex form and ignores junk', () => {
    expect(retintTheme(nousTheme, '#F97316').colors.primary).toBe(retintTheme(nousTheme, 'f97316').colors.primary)
    // A half-typed hex from a text input must not blow up the theme.
    expect(retintTheme(nousTheme, '#00').colors).toEqual(nousTheme.colors)
    expect(retintTheme(nousTheme, 'nonsense').colors).toEqual(nousTheme.colors)
  })

  // Why one hex can't just be dropped into both palettes. GitHub's two sidebars
  // sit at opposite ends of the lightness range, and an orange accent is legible
  // on only one of them at a time: a burnt orange dark enough for near-white is
  // under 4.5:1 on near-black, and a bright orange that sings on near-black is
  // 2.6:1 on near-white. Each mode therefore adapts the pick to its own surface.
  describe('a seed that only works in the light mode', () => {
    // 6.6:1 on the light sidebar, 2.9:1 on the dark one.
    const deep = retintTheme(nousTheme, DEEP_ORANGE)

    it('keeps the picked color where it already passes', () => {
      expect(deep.colors.primary.toLowerCase()).toBe(DEEP_ORANGE.toLowerCase())
    })

    it('lightens it for the mode where it does not', () => {
      const dark = deep.darkColors!.primary

      expect(dark.toLowerCase()).not.toBe(DEEP_ORANGE.toLowerCase())
      expect(contrastRatio(dark, deep.darkColors!.sidebarBackground!)).toBeGreaterThanOrEqual(4.5)
    })

    it('adapts by lightness, holding the hue — so it still reads as the brand', () => {
      const picked = hexToOklch(DEEP_ORANGE)!
      const adapted = hexToOklch(deep.darkColors!.primary)!

      expect(Math.abs(adapted.h - picked.h)).toBeLessThan(3)
      expect(adapted.l).toBeGreaterThan(picked.l)
      // A burnt orange is well inside sRGB, so lifting it costs no chroma at
      // all. Anything that mixed toward white instead would show up here as a
      // collapse, because that path drags the hue and leaves a pastel.
      expect(adapted.c).toBeGreaterThan(picked.c * 0.9)
    })
  })

  // The mirror case, and the one the fork actually runs into: the brand orange
  // is the bright one. Blue never exercised this direction — `#0053FD` was
  // already dark enough for near-white, so the light palette never had to clamp.
  describe('a seed that only works in the dark mode', () => {
    // 7.3:1 on the dark sidebar, 2.6:1 on the light one.
    const bright = retintTheme(nousTheme, FOXXY_ORANGE)

    it('darkens it for the light palette, rather than shipping it unreadable', () => {
      const light = bright.colors.primary

      expect(light.toLowerCase()).not.toBe(FOXXY_ORANGE.toLowerCase())
      expect(contrastRatio(light, bright.colors.sidebarBackground!)).toBeGreaterThanOrEqual(4.5)
      expect(hexToOklch(light)!.l).toBeLessThan(hexToOklch(FOXXY_ORANGE)!.l)
    })

    it('holds the hue in both directions', () => {
      const picked = hexToOklch(FOXXY_ORANGE)!

      for (const mode of ['colors', 'darkColors'] as const) {
        const c = bright[mode] as DesktopThemeColors
        expect(Math.abs(hexToOklch(c.primary)!.h - picked.h), mode).toBeLessThan(3)
      }
    })

    it('trades chroma only where sRGB cannot show it', () => {
      const picked = hexToOklch(FOXXY_ORANGE)!
      const adapted = hexToOklch(bright.darkColors!.primary)!

      // Carrying `#F97316` up by this theme's own light→dark offset lands it at
      // a lightness where its C 0.19 is out of gamut, so the clamp gives some
      // of it back. That is the honest cost of staying on the hue; what must not
      // happen is the mix-toward-white collapse, which would drop far more and
      // drag the hue with it. Half the original chroma is the line between
      // "same orange, lighter" and "washed out".
      expect(adapted.l).toBeGreaterThan(picked.l)
      expect(adapted.c).toBeLessThan(picked.c)
      expect(adapted.c).toBeGreaterThan(picked.c * 0.55)
    })
  })

  it('does not brand a slot that never tracked the accent', () => {
    // mono's ring is a neutral gray on purpose.
    const neutralRing = {
      ...nousTheme,
      colors: { ...nousTheme.colors, ring: '#9a9a9a' },
      darkColors: undefined
    }

    expect(retintTheme(neutralRing, '#8250df').colors.ring).toBe('#9a9a9a')
  })

  // A theme may shade its accent across slots rather than repeating one hex —
  // midnight runs a `#8b80e8` ring under a `#ddd6ff` primary. Both are the
  // same violet; matching on exact equality left the ring behind and produced
  // a half-retinted theme.
  describe('a theme whose accent slots are shades of each other', () => {
    const shaded = {
      ...nousTheme,
      colors: { ...nousTheme.colors, primary: '#ddd6ff', ring: '#8b80e8', midground: '#8b80e8' },
      darkColors: undefined
    }

    it('moves every slot in the family', () => {
      const teal = retintTheme(shaded, '#0f9b8e')

      expect(teal.colors.ring).not.toBe('#8b80e8')
      expect(Math.abs(hexToOklch(teal.colors.ring)!.h - hexToOklch('#0f9b8e')!.h)).toBeLessThan(3)
    })

    it('keeps each slot at its own lightness, rather than flattening them', () => {
      const teal = retintTheme(shaded, '#0f9b8e')
      const ring = hexToOklch(teal.colors.ring)!

      expect(ring.l).toBeCloseTo(hexToOklch('#8b80e8')!.l, 1)
      expect(ring.l).not.toBeCloseTo(hexToOklch(teal.colors.primary)!.l, 1)
    })
  })
})
