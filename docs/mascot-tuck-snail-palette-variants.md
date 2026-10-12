# Tuck the Snail palette variants

Five palettes built on `tuck-design-system.md` and `mascot-tuck-snail-mood-palettes.md` (2026-10-12): bedtime, low stimulation, paper, light terminal and seasonal. Each has a light and a dark mode.

## Rules every variant keeps

- **Same token names.** A variant swaps values, never names, so components switch palettes with no code changes.
- **Tuck never changes.** `caramel` #d69a6a, `moss` #9dbb94, `blush` #e8a9a0, `on-caramel` #1f2a24 and the SVG art are identical in every variant. Art always sits on that variant's `art-ground`, which keeps the fixed #1f2a24 outlines at 4.5:1 or better.
- **Mood colors are fixed.** `mood-good` #e3c46b, `mood-okay` #9dbb94, `mood-tired` #7a9fbf, `mood-low` #56738c and `mood-shell` #d69a6a stay the same, outlined in the variant's `line` and labelled with their faces.
- **No red.** Notices use done, look and info washes with `ink` text; the terminal's red slot is blush (or a dark blush on light terminals).
- **Contrast, checked by script.** Text (`ink`, `ink-muted`, `link`, terminal text) is at least 4.5:1 on every ground it uses; outlines (`line`) are at least 3:1 on `canvas` and `surface`; `ink-muted` stays a visible step below `ink` (at least 1.4:1 apart). Every pair passed.
- **State never by color alone.** The selected chip keeps its 4px border and 600 weight; links stay underlined.

## At a glance

| Palette | Mode | Lowest text contrast | Lowest outline contrast |
| --- | --- | --- | --- |
| Bedtime | light | 5.2:1 | 13.46:1 |
| Bedtime | dark | 6.78:1 | 5.05:1 |
| Low stimulation | light | 4.73:1 | 3.29:1 |
| Low stimulation | dark | 5.64:1 | 3.32:1 |
| Paper | light | 6.39:1 | 12.9:1 |
| Paper | dark | 5.53:1 | 11.37:1 |
| Light terminal | light | 5.04:1 | 12.92:1 |
| Light terminal | dark | 5.29:1 | 12.51:1 |
| Seasonal: Spring, moss | light | 5.45:1 | 12.92:1 |
| Seasonal: Spring, moss | dark | 6.64:1 | 12.51:1 |
| Seasonal: Summer, butter | light | 5.54:1 | 12.92:1 |
| Seasonal: Summer, butter | dark | 6.64:1 | 12.51:1 |
| Seasonal: Autumn, caramel | light | 5.34:1 | 12.92:1 |
| Seasonal: Autumn, caramel | dark | 6.64:1 | 12.51:1 |
| Seasonal: Winter, tear | light | 6.42:1 | 12.92:1 |
| Seasonal: Winter, tear | dark | 6.64:1 | 12.51:1 |

## 1. Bedtime

Warm dark for evening check-ins and sleep prompts. Blue is pulled out of every neutral, so screens glow amber instead of white.

**Use for:** After 9pm, sleep and wind-down prompts, the 1:40am copy. Pairs with sleepy `@_--` and tucked-in `(@)`.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `canvas` | `#f4ebe0` | `#1a1512` | Page background |
| `surface` | `#fbf5ee` | `#241d18` | Cards, chips, sheets |
| `ink` | `#2b2018` | `#efe1cf` | Headings, body, UI outlines |
| `ink-muted` | `#5e4c3e` | `#b8a28a` | Captions, secondary text |
| `link` | `#8a5530` | `#f0b98a` | Underlined links |
| `line` | `#2b2018` | `#a08a74` | `stroke-ui` outlines on cards and chips |
| `selected` | `#efd2b8` | `#4a3424` | Selected mood chip (with 4px border, 600 weight) |
| `art-ground` | `#fbf5ee` | `#d8cbb8` | Plate behind Tuck's art |
| `done-wash` | `#ebeed9` | `#2a2a1c` | Notice: done or saved |
| `look-wash` | `#f8e8c4` | `#3a2e18` | Notice: needs a look |
| `info-wash` | `#efe6dc` | `#2e2620` | Notice: information |
| `term-bg` | `#2b2018` | `#14100d` | tuckshell body |
| `term-bar` | `#3a2c22` | `#241d18` | tuckshell title bar |
| `term-text` | `#f0e2d0` | `#efe1cf` | Commands and output |
| `term-dim` | `#c4ae96` | `#b8a28a` | Path, hints |
| `term-tuck` | `#f0c49e` | `#f0c49e` | Tuck's face in output |

Key contrast pairs (light / dark):

- ink on canvas: 13.46 / 14.09
- ink-muted on canvas: 6.9 / 7.39
- link on surface: 5.67 / 9.5
- line on surface: 14.67 / 5.05
- art outlines on art-ground: 13.71 / 9.3
- term-text on term-bg: 12.47 / 14.73
- term-tuck on term-bg: 9.9 / 11.8

## 2. Low stimulation

Quiet, desaturated and evenly lit, for sensory-sensitive days. Text still passes AA, but nothing jumps out: softer outlines, greyed accents, no pure white or black.

**Use for:** A user setting for sensory-sensitive or overwhelmed days, and the default after a "low" check-in if the person opts in.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `canvas` | `#e9ebe7` | `#1c1f1d` | Page background |
| `surface` | `#f2f3f0` | `#232725` | Cards, chips, sheets |
| `ink` | `#343b37` | `#cdd2ce` | Headings, body, UI outlines |
| `ink-muted` | `#59615c` | `#98a09a` | Captions, secondary text |
| `link` | `#6b5340` | `#d2b293` | Underlined links |
| `line` | `#7a827d` | `#6f7872` | `stroke-ui` outlines on cards and chips |
| `selected` | `#e2dbd2` | `#3a332c` | Selected mood chip (with 4px border, 600 weight) |
| `art-ground` | `#f2f3f0` | `#c9cec8` | Plate behind Tuck's art |
| `done-wash` | `#e3e8e0` | `#262e28` | Notice: done or saved |
| `look-wash` | `#ece8d8` | `#302d22` | Notice: needs a look |
| `info-wash` | `#e1e6e8` | `#24292c` | Notice: information |
| `term-bg` | `#2e3431` | `#181b19` | tuckshell body |
| `term-bar` | `#3a413d` | `#232725` | tuckshell title bar |
| `term-text` | `#d9ddd9` | `#cdd2ce` | Commands and output |
| `term-dim` | `#a9b0ab` | `#98a09a` | Path, hints |
| `term-tuck` | `#d9b89a` | `#d2b293` | Tuck's face in output |

Key contrast pairs (light / dark):

- ink on canvas: 9.58 / 10.85
- ink-muted on canvas: 5.32 / 6.2
- link on surface: 6.42 / 7.58
- line on surface: 3.55 / 3.32
- art outlines on art-ground: 13.33 / 9.29
- term-text on term-bg: 9.26 / 11.33
- term-tuck on term-bg: 6.83 / 8.7

## 3. Paper

Printed-zine feel: off-white paper, warm black ink, the brand's moss green as the link. Dark mode is kraft paper under a lamp.

**Use for:** Printables, zines, the build-in-public blog, press kit and anything that should feel made by hand.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `canvas` | `#f3ede1` | `#26221c` | Page background |
| `surface` | `#fbf8f1` | `#2f2a23` | Cards, chips, sheets |
| `ink` | `#2a2620` | `#ede5d6` | Headings, body, UI outlines |
| `ink-muted` | `#5c5448` | `#aca08c` | Captions, secondary text |
| `link` | `#2f5d46` | `#e9c08f` | Underlined links |
| `line` | `#2a2620` | `#ede5d6` | `stroke-ui` outlines on cards and chips |
| `selected` | `#efd9b8` | `#4d3c2a` | Selected mood chip (with 4px border, 600 weight) |
| `art-ground` | `#fbf8f1` | `#ddd3c2` | Plate behind Tuck's art |
| `done-wash` | `#e7eddc` | `#2f3326` | Notice: done or saved |
| `look-wash` | `#f6e9c3` | `#3d3420` | Notice: needs a look |
| `info-wash` | `#e8e6df` | `#33302a` | Notice: information |
| `term-bg` | `#2a2620` | `#1e1b16` | tuckshell body |
| `term-bar` | `#3a352d` | `#2f2a23` | tuckshell title bar |
| `term-text` | `#f3ede1` | `#ede5d6` | Commands and output |
| `term-dim` | `#c9bfae` | `#b5a994` | Path, hints |
| `term-tuck` | `#f0c49e` | `#f0c49e` | Tuck's face in output |

Key contrast pairs (light / dark):

- ink on canvas: 12.9 / 12.64
- ink-muted on canvas: 6.39 / 6.15
- link on surface: 7.13 / 8.4
- line on surface: 14.18 / 11.37
- art outlines on art-ground: 13.99 / 10.02
- term-text on term-bg: 12.9 / 13.71
- term-tuck on term-bg: 9.38 / 10.7

## 4. Light terminal

tuckshell on a light ground for daytime and printed docs. The page tokens match the core system; the terminal flips to paper-light, with darker text-safe versions of Tuck's colors.

**Use for:** Light editor and terminal themes, docs screenshots and printed command references for `tuckshell`.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `canvas` | `#eef0ea` | `#161e1a` | Page background |
| `surface` | `#ffffff` | `#1f2a24` | Cards, chips, sheets |
| `ink` | `#1f2a24` | `#e6eee3` | Headings, body, UI outlines |
| `ink-muted` | `#4a5750` | `#9fb39a` | Captions, secondary text |
| `link` | `#8a5530` | `#f0c49e` | Underlined links |
| `line` | `#1f2a24` | `#e6eee3` | `stroke-ui` outlines on cards and chips |
| `selected` | `#efd2b8` | `#5a4330` | Selected mood chip (with 4px border, 600 weight) |
| `art-ground` | `#ffffff` | `#d9dfd4` | Plate behind Tuck's art |
| `done-wash` | `#e8f0e4` | `#2c3a2a` | Notice: done or saved |
| `look-wash` | `#f8efcf` | `#3d3720` | Notice: needs a look |
| `info-wash` | `#e3eef6` | `#23323d` | Notice: information |
| `term-bg` | `#f7f6ef` | `#dde2d7` | tuckshell body |
| `term-bar` | `#e4e7df` | `#cbd2c6` | tuckshell title bar |
| `term-text` | `#1f2a24` | `#1f2a24` | Commands and output |
| `term-dim` | `#56635b` | `#46524a` | Path, hints |
| `term-tuck` | `#8a5530` | `#7a4a28` | Tuck's face in output |

Key contrast pairs (light / dark):

- ink on canvas: 12.92 / 14.34
- ink-muted on canvas: 6.6 / 7.6
- link on surface: 6.14 / 9.25
- line on surface: 14.84 / 12.51
- art outlines on art-ground: 14.84 / 10.92
- term-text on term-bg: 13.7 / 11.26
- term-tuck on term-bg: 5.66 / 5.62

Light-terminal ANSI colors. Tuck's pastels fail on a light ground, so the six color slots use darker, text-safe versions. All pass 4.5:1 on both terminal grounds.

| Slot | Value | On light `term-bg` | On dark-mode `term-bg` |
| --- | --- | --- | --- |
| red | `#8f463d` | 6.23 | 5.12 |
| green | `#3f6b3a` | 5.74 | 4.72 |
| yellow | `#7a5a12` | 5.88 | 4.83 |
| blue | `#2c5a7a` | 6.8 | 5.59 |
| magenta | `#8a5530` | 5.66 | 4.66 |
| cyan | `#2f6b60` | 5.71 | 4.7 |

Black is `term-text` #1f2a24 and bright black is `term-dim`. The red slot is a dark blush, never an alarm red.

## 5. Seasonal

Four accents on the core palette. Only `link` (text accent) and `selected` (chip wash) change; every other token stays the core system's. Each season borrows one of Tuck's own colors.

**Use for:** Seasonal campaigns and in-game events. Only the accent changes; the base stays the core system, so Tuck reads the same all year.

| Season | `link` light | `link` dark | `selected` light | `selected` dark | link contrast (surface, light / dark) |
| --- | --- | --- | --- | --- | --- |
| Spring, moss | `#3d6b35` | `#b5d6a8` | `#dfecd8` | `#2f4229` | 6.26 / 9.29 |
| Summer, butter | `#7a5a12` | `#f0d898` | `#f8ecc6` | `#4a3f1c` | 6.37 / 10.59 |
| Autumn, caramel | `#8a5530` | `#f0c49e` | `#efd2b8` | `#5a4330` | 6.14 / 9.25 |
| Winter, tear | `#2c5a7a` | `#b5d0e6` | `#dde9f3` | `#283a4a` | 7.37 / 9.28 |

Autumn matches the core system exactly, so it is the default season.

## Applying a variant

Each variant is a full set of the tokens above, also saved as `mascot-tuck-snail-palette-variants.json`. To ship one, add it as a theme in the design system (`bedtime-light`, `bedtime-dark` and so on) with the same token names; components pick it up without changes.
