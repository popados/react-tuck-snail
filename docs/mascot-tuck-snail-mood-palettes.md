# Tuck the Snail mood palettes

Derived from `mascot-tuck-snail-design-system.md` on 2026-10-12. Every token below is in the design system, including the palette changes applied the same day: the dark-mode `link` and `ink-muted`, the dimmer dark `art-ground`, the deeper `caramel-wash`, the mood scale, the notice washes and the terminal colors.

## Contents

- The mood set
- Mood colors
- Check-in chips
- Insights charts
- Gentle notices
- Terminal moods
- Art per mood
- Rules

## The mood set

Every check-in answer is one of five moods. Each has a word, an ASCII face, a `TuckFace` mood id, artwork, and a color. The order below is the order on screen.

| Answer | Face | `TuckFace` mood | Artwork | Color token |
| --- | --- | --- | --- | --- |
| good | `@_^^` | `happy` | `tuck-happy.svg` | `mood-good` |
| okay | `@_oo` | `awake` | none (text form only) | `mood-okay` |
| tired | `@_--` | `sleepy` | `tuck-sleepy.svg` | `mood-tired` |
| low | `@_;;` | `sad` | `tuck-sad.svg` | `mood-low` |
| shell day | `(@)` | `resting` | `tuck-tucked.svg` | `mood-shell` |

Two more expressions exist for moments rather than answers: surprised `@_OO` (`tuck-surprised.svg`) for something new, and stressed `@_><` (`tuck-stressed.svg`) for busy days and errors that aren't the person's fault. Shy `@_` (`tuck-shy.svg`) is for first run and privacy notes. None of these three gets a mood color.

Words are lowercase and kind. Never "bad", "failed" or a score.

## Mood colors

Built from Tuck's own palette (`butter`, `moss`, `tear`, `caramel`) plus one calm slate for low. The same values in both themes, so the palette is identical in the app, web games and the terminal.

| Token | Value | Built from | Lightness (L*) | Mood |
| --- | --- | --- | --- | --- |
| `mood-good` | `#e3c46b` | `butter` | 80 | good `@_^^` |
| `mood-okay` | `#9dbb94` | `moss` | 73 | okay `@_oo` |
| `mood-shell` | `#d69a6a` | `caramel` | 68 | shell day `(@)` |
| `mood-tired` | `#7a9fbf` | `tear`, deepened | 64 | tired `@_--` |
| `mood-low` | `#56738c` | slate | 48 | low `@_;;` |

- Good, okay, tired and low step down in lightness, so the scale still reads in grayscale and for color-blind viewers.
- Low is a calm slate blue. No mood is ever red.
- Tired and shell day are close in lightness (64 and 68). They stay apart by hue (blue against orange) and by their faces.
- These are fills. They are never text: on light `surface` they range from 1.7:1 to 5.0:1.

## Check-in chips

The `MoodChip` keeps its outline and `surface` fill for every answer. Mood colors do not tint chips; the face and word carry the mood.

| State | Light | Dark | Notes |
| --- | --- | --- | --- |
| Resting chip | `surface` `#ffffff`, `ink` outline | `surface` `#1f2a24`, `ink` outline | 2px `stroke-ui` |
| Selected chip | `caramel-wash` `#efd2b8` | `caramel-wash` `#5a4330` | 4px border and 600 weight, so the state never rests on fill alone; `ink` on it: 10.3:1 light, 7.8:1 dark |

Layout stays as the design system sets it: chips 52px tall, two columns `space-10` apart, good and okay on the first row, tired and low on the second, a full-width shell day below, and a `TrustNote` at the foot.

## Insights charts

Use the mood colors for any chart of check-ins (a week of bars, a month grid, a share-of-days ring).

- Outline every mark in `ink` with `stroke-ui` (2px). The outline separates pastel fills from the ground in both themes, which matches the brand's "borders, not shadows" rule.
- Label every series with its face and word ("`@_--` tired"), never color alone.
- Count showing up, not gaps. A day with no check-in is empty space, not a grey "missed" mark.
- Chart text uses `ink` and `ink-muted`.

| Ground | Light | Dark |
| --- | --- | --- |
| Chart card | `surface` `#ffffff` | `surface` `#1f2a24` |
| Mark outline | `ink` `#1f2a24` | `ink` `#e6eee3` |
| Axis and labels | `ink-muted` `#4a5750` | `ink-muted` `#9fb39a` |

## Gentle notices

Messages after a check-in or about data use soft washes with `ink` text. There is no red notice.

| Token | Light | Dark | Use | `ink` contrast |
| --- | --- | --- | --- | --- |
| `moss-wash` | `#e8f0e4` | `#2c3a2a` | Done or saved: "saved. small check-ins count." | 12.7:1 / 10.1:1 |
| `butter-wash` | `#f8efcf` | `#3d3720` | Needs a look: "no backup in 30 days." | 12.9:1 / 10.0:1 |
| `tear-wash` | `#e3eef6` | `#23323d` | Information: "data stays on this device." | 12.6:1 / 11.1:1 |

## Terminal moods

The `tuckshell` terminal looks the same in both themes: `term-bg` `#1f2a24`, `term-bar` `#2a3830`, `term-text` `#e6eee3`, `term-dim` `#b9ccb2`. Tuck's face in output is `term-tuck` `#f0c49e` (9.3:1).

```
$ tuckshell log walk
@_^^  walk logged. that's 3 this week.
$ tuckshell checkin tired
@_--  noted. rest counts too.
$ tuckshell checkin shell
(@)   shell day. see you when you're back.
```

The ANSI mapping (`ansi-*` tokens), so any tool that prints in terminal colors still looks like Tuck. The red slot becomes `blush`.

| Slot | Normal | Bright |
| --- | --- | --- |
| black | `#1f2a24` | `#8a9b90` (`term-faint`, 5.1:1 on `term-bg`) |
| red | `#e8a9a0` (`blush`) | `#f0c4bd` |
| green | `#9dbb94` (`moss`) | `#b9ccb2` |
| yellow | `#e3c46b` (`butter`) | `#f0d898` |
| blue | `#8fb8d8` (`tear`) | `#b5d0e6` |
| magenta | `#d69a6a` (`caramel`) | `#f0c49e` |
| cyan | `#8fc4b8` | `#b5dcd2` |
| white | `#e6eee3` | `#ffffff` |

## Art per mood

Tuck's SVGs have fixed colors (`ink` outlines, `caramel` shell, `moss` body, `blush` cheeks, `tear` drop). Mood colors never recolor the art.

- Show mood art on `art-ground`: `#ffffff` light, `#d9dfd4` dark (dimmed so it doesn't glare at night).
- The shell never changes. Emotion lives in the eye stalks and mouth only.
- Give each image an `alt` naming the expression, e.g. "Tuck sleepy, stalks loose, eyes closed".

## Rules

- No red, no failure state, no streaks and no "you missed" on any mood surface.
- Never show a mood by color alone. Pair it with the face and the word.
- Read faces aloud as words ("tuck, tired") through `TuckFace`. Never leave a raw `@_--` for a screen reader.
- Keep the same mood colors on every surface: app, web games and terminal.
- Every check-in surface shows the `TrustNote`: "Stored on this device only. Need to talk to someone? Call or text 988."
