# Tuck the Snail design system

Exported from the Tuck the Snail design system artifact (https://claude.ai/artifact/MkZKmZ7xEGY743DYbqEYwF) on 2026-10-12. The artifact is the source of truth; this file is a snapshot.

## Contents

- Brand book
- Color tokens
- Type
- Spacing, radius and stroke
- Components
- Mascot assets

## Brand book

Tuck is a calm snail mascot for gentle habit and mood apps, web games and terminal roguelikes. His shell is a spiral `@`, so he works as art, as a 32px avatar and as a single character on a map. Slow progress is still progress.

### Naming

- **Tuck** is the character's name only. Never use "Tuck" alone as a product or studio name; pair it with the studio name (working choice: *Shellday Studio*).
- Handle and CLI name: `tuckshell`. Mascot social handle: `@tuckthesnail`.
- Posts are signed "— tuck & sam". Sam is Tuck's human and speaks in build-in-public updates ("sam here, tuck's human.").

### Content fundamentals

Tuck is unhurried, gently encouraging, rest-positive, quietly curious, private, dry and soft, and a roguelike nerd. Each trait has a line it never crosses:

| Trait | How it shows up | Never becomes |
| --- | --- | --- |
| Unhurried | Celebrates any pace; progress moves at snail speed on purpose | Lazy or dismissive of goals |
| Gently encouraging | Notices small wins out loud | Cheerleading or hype |
| Rest-positive | Tucks into its shell without apology | Avoidant; it always comes back out |
| Quietly curious | Peeks around corners, asks questions | Nosy about your data |
| Private | Carries its home with it; data stays on the device | Secretive or cold |
| Dry, soft humor | "i got here eventually" | Sarcastic about the user |
| Roguelike nerd | Knows it's the `@` | Gatekeeping toward non-gamers |

Rules:

- Write in lowercase in terminal and in-app text. Headings on sheets and screens use sentence case ("How are you today?").
- Keep sentences short. Ask instead of command: "water break?", not "Drink water!".
- Never mention streaks, failures or "you missed". Count showing up ("days you showed up this month"), with no zero and no reset.
- No exclamation-point pileups. No emoji; Tuck's ASCII faces do that job.
- Mental-health copy is gentle and makes no claims. Any check-in surface says where data lives and lists the 988 line.

Real copy:

> `@_^^  water logged. small sips count.`
>
> `(@) → @_oo  you're back. no catching up.`
>
> some days are shell days. you can tuck in and still be making progress. — tuck & sam
>
> you didn't check in for a week. nothing broke. no streak died. i was just here, being a snail. welcome back.
>
> `@_--` it's 1:40am. the code will still be here tomorrow. so will i.

### The text forms

Tuck's ASCII forms are the logo in text. Use them exactly; pure ASCII, same shell on every surface.

| Form | Meaning |
| --- | --- |
| `@` | Tuck on a map |
| `@_oo` | awake / okay |
| `@_^^` | happy / good |
| `@_--` | sleepy / tired |
| `@_;;` | sad / low |
| `@_OO` | surprised |
| `@_><` | stressed |
| `@_` | shy |
| `(@)` | resting, tucked in, a shell day |
| `...@_^^` | progress |

Render them with the `TuckFace` component (`mono` family). Inside the terminal color them `term-tuck`; elsewhere they follow `ink`.

### Visual foundations

**Color.** Warm and calm, never the pastel-purple of most wellness apps. `canvas` is the page; `surface` cards sit on it with a `stroke-ui` outline in `ink`. Tuck's palette is `caramel` (shell), `moss` (body), `blush` (cheeks) and the dark ink green of every line. `caramel` and `moss` are fills only, never text. Text is `ink` or `ink-muted`; on `caramel` it is `on-caramel`. The terminal and text-forms panel use `term-bg` with `term-text`, `term-dim` and `term-tuck` on top.

**Dark mode.** Every color token has a light and a dark value; use the tokens and both themes work. Dark mode is built from the brand's own dark surfaces: `surface` becomes the ink green (`#1f2a24`), `canvas` goes one step deeper, and `ink` becomes the terminal's pale sage text. Tuck's colors (`caramel`, `moss`, `blush`, `butter`, `tear`) and the terminal stay the same in both themes. Two rules keep it working:

- Put Tuck's artwork on `art-ground`, never straight on a dark surface. The SVGs have fixed dark outlines that vanish on dark grounds; in dark mode the plate is a dimmed sage so it doesn't glow. `ExpressionCard` already does this.
- Use `on-caramel` for anything drawn on `caramel` (text, outlines, focus rings). `ink` turns light in dark mode and fails on caramel.

**Mood scale.** Insights charts use `mood-good`, `mood-okay`, `mood-tired`, `mood-low` and `mood-shell`, the same in both themes. The first four step down in lightness from good to low, so they read in grayscale and for color-blind readers; none is red. They are pale fills: always outline each bar or swatch in `ink` and label it with its face (`@_^^`, `@_oo`, `@_--`, `@_;;`, `(@)`). `mood-tired` and `mood-shell` are close in lightness and stay apart by hue and face.

**Notices.** Gentle messages sit on a wash with `ink` text, never red: `moss-wash` for done or saved, `butter-wash` for needs a look, `tear-wash` for information. Pair each with words that say what happened; the wash alone never carries the meaning. `caramel-text` is Tuck's shell as a text color, for accents that must be read.

**Terminal colors.** `tuckshell` maps the 16 ANSI slots to `ansi-*` tokens, so any tool's "error red" prints in `blush`. Comments and hints use `term-faint`.

**Type.** `sans` (Bricolage Grotesque) for everything spoken; `mono` (JetBrains Mono) for anything Tuck "types": ASCII faces, commands, chip answers, maps. Headings are heavy (`display`, `title`, `heading` at 800); names and labels are 600 (`label`, `panel-label`); running text is 400 (`body`, `note`). The only uppercase is `eyebrow`. Links are `link`, which follows `caramel-text` (Tuck's shell color), always underlined, turning `ink` on hover.

**Shape.** Rounded rectangles with solid `stroke-ui` outlines: chips `radius-sm`, the terminal `radius-md`, cards, panels and social tiles `radius-lg`, phone frames `radius-xl`, swatches and the avatar `radius-full`. Borders, not shadows: the only shadow is the flat `ground-shadow` ellipse under a resting shell (`caramel-deep` on a caramel tile).

**Space.** Cards pad at `space-24` and sit `space-24` apart (expression cards: `space-16` × `space-20`, `space-20` apart). Chips are 52px tall and sit `space-10` apart in a two-column grid, with a full-width shell day chip below. Sheets pad `space-48` × `space-64`.

**Motion.** Slow on purpose. Progress moves at snail speed; nothing bounces, shakes or celebrates loudly.

**Focus.** Keyboard focus is a solid 2px `ink` outline offset 2px (light 12.9:1, dark 14.3:1 on `canvas`); on `caramel` it is `on-caramel` (6.1:1).

### Accessibility

Target WCAG 2.1 AA in both themes. The components already do the following; anything new should too.

- Text contrast: at least 4.5:1, using the grounds each color token's note names. `caramel`, `moss` and `blush` are never text.
- State never by color alone: the selected `MoodChip` adds a 4px border and 600 weight; links are underlined.
- Focus: every interactive element shows a 2px `ink` outline (`on-caramel` on caramel; `term-text` inside the terminal).
- Touch targets: at least 44px; chips are 52px.
- ASCII faces are read as words ("tuck, happy") through `TuckFace`, or hidden where a word already says it. Never leave a raw `@_^^` for a screen reader to spell out.
- Artwork gets an `alt` describing the expression; decorative art gets `alt=""`.
- Reflow: nothing scrolls sideways at 320px wide; long terminal lines scroll inside a focusable region.
- Motion stays slow and optional. Anything that moves must stop under `prefers-reduced-motion`.
- Check-in surfaces always show the `TrustNote`, with 988 as a tap-to-call link.

### Mascot and imagery

- Use the SVG files in the Mascot assets; never redraw or trace Tuck. Pick the file by job: `tuck-hero.svg` for headers and splash screens, the six expression files for mood moments, `tuck-tucked.svg` for rest and empty states on light grounds, `tuck-tucked-white.svg` on `caramel`, `tuck-avatar.svg` for profile pictures (reads down to 32px).
- The shell never changes. It is always the spiral `@`, in every pose and at every size.
- Emotion lives in the eye stalks and mouth only (up, drooping, wobbly, pulled in). The body never changes shape.
- Match art to text: happy `@_^^`, sleepy `@_--`, sad `@_;;`, surprised `@_OO`, stressed `@_><`, shy `@_`, tucked in `(@)`.
- Show the art on `art-ground` (or light `surface`/`canvas`), or on `caramel` (white-shell file only). Never recolor it, add outlines, or place it on a dark ground.
- No icon set exists. Use words and the ASCII faces; do not add emoji or a generic icon library.

### Surfaces

- **Terminal** (`tuckshell`): the `Terminal` window, `term-bg` body, three dots (`blush`, `butter`, `moss`). Output starts with Tuck's face in `term-tuck`.
- **Habit check-in**: a `heading` question, `MoodChip` answers (good, okay, tired, low, then a full-width shell day), and a `TrustNote` at the foot.
- **Social**: the `SocialTile`, a `caramel` square with an `on-caramel` headline and a quiet second line.
- **Roguelike**: Tuck is `@`; tucked in is `(@)`. Resting is a mechanic, combat is optional.

## Color tokens

Two themes. Dark mode is built from the brand's own dark surfaces (the terminal and text-forms panel): the light theme's ink green becomes the dark surface, and the terminal's text colors become the dark theme's ink. Tuck's art colors (caramel, moss, blush) never change.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `canvas` | `#eef0ea` | `#161e1a` | Page background behind every card, sheet and screen. Light: a pale sage-grey, never pure white. Dark: a deep green-black, one step below `surface`. |
| `surface` | `#ffffff` | `#1f2a24` | Cards, chips, the phone screen, outlined in `ink`. In dark mode it takes the brand's ink green. |
| `ink` | `#1f2a24` | `#e6eee3` | Headings, body copy and UI outlines. Light: on `canvas` (12.9:1), `surface`, `caramel-wash`, `moss`, `blush`. Dark: on `canvas` (14.3:1), `surface` (12.5:1) and `caramel-wash` (7.8:1). Never as text on `caramel`; use `on-caramel`. |
| `ink-muted` | `#4a5750` | `#9fb39a` | Secondary text: captions, eyebrows, subtitles, the device-only footer. Light: on `canvas` (6.6:1), `surface` (7.6:1). Dark: on `canvas` (7.6:1), `surface` (6.6:1), a clear step below `ink`. |
| `link` | `{caramel-text}` | `{caramel-text}` | Inline links, always underlined; follows `caramel-text` in both themes, so links are Tuck's shell color and never blend with `ink-muted`. On `canvas` (light 5.3:1, dark 10.6:1) and `surface` (6.1:1, 9.3:1); hover turns `ink`. |
| `caramel-text` | `#8a5530` | `#f0c49e` | Tuck's shell as a readable text color: links (through `link`), accents, highlighted words. Light on `canvas` 5.3:1, `surface` 6.1:1; dark on `canvas` 10.6:1, `surface` 9.3:1. |
| `caramel` | `#d69a6a` | `#d69a6a` | Tuck's shell, and the ground of social tiles, the same in both themes. A fill: never text (2.1:1 on light canvas). Text on it is `on-caramel` (6.1:1). |
| `on-caramel` | `#1f2a24` | `#1f2a24` | Text, outlines and focus rings on `caramel` (6.1:1), the same in both themes. Social-tile headlines and signatures. |
| `caramel-deep` | `#bb895f` | `#bb895f` | Ground shadow under the shell on a `caramel` tile. Decorative only. Same in both themes. |
| `caramel-wash` | `#efd2b8` | `#5a4330` | Selected state of a mood chip, always with the 4px `ink` border and 600 weight (the fill alone is too close to `surface`). `ink` text on it: light 10.3:1, dark 7.8:1. |
| `moss` | `#9dbb94` | `#9dbb94` | Tuck's body and the speed lines in the hero pose; the avatar disc. A fill, outlined in `ink`; never text on light grounds. Same in both themes. |
| `blush` | `#e8a9a0` | `#e8a9a0` | Tuck's cheek blush (happy, shy) and the terminal's first window dot. Small accents only. Same in both themes. |
| `butter` | `#e3c46b` | `#e3c46b` | Terminal's middle window dot. Not used elsewhere. Same in both themes. |
| `tear` | `#8fb8d8` | `#8fb8d8` | The single tear in the Sad expression. Art only, never UI. Same in both themes. |
| `mood-good` | `#e3c46b` | `#e3c46b` | Insights: days logged good (`@_^^`). Fill only, always outlined in `ink` and labelled with its face; same in both themes. Lightest step of the scale. |
| `mood-okay` | `#9dbb94` | `#9dbb94` | Insights: days logged okay (`@_oo`). Fill only, outlined in `ink`, labelled with its face; same in both themes. |
| `mood-tired` | `#7a9fbf` | `#7a9fbf` | Insights: days logged tired (`@_--`). Fill only, outlined in `ink`, labelled with its face; same in both themes. Close in lightness to `mood-shell`: they differ by hue and by face. |
| `mood-low` | `#56738c` | `#56738c` | Insights: days logged low (`@_;;`). A calm slate blue, never red. Fill only, outlined in `ink`, labelled with its face; same in both themes. Darkest step of the scale. |
| `mood-shell` | `#d69a6a` | `#d69a6a` | Insights: shell days (`(@)`), Tuck's caramel. Fill only, outlined in `ink`, labelled with its face; same in both themes. |
| `moss-wash` | `#e8f0e4` | `#2c3a2a` | Notice ground for done or saved ("saved. small check-ins count."). `ink` text on it: light 12.7:1, dark 10.1:1. |
| `butter-wash` | `#f8efcf` | `#3d3720` | Notice ground for needs a look ("no backup in 30 days"). Never an error red. `ink` text on it: light 12.9:1, dark 10.0:1. |
| `tear-wash` | `#e3eef6` | `#23323d` | Notice ground for information. `ink` text on it: light 12.6:1, dark 11.1:1. |
| `ground-shadow` | `#e4e5e4` | `#121915` | Flat ellipse under the tucked-in shell. The only shadow in the system. |
| `art-ground` | `#ffffff` | `#d9dfd4` | Plate behind Tuck's artwork. The SVGs have fixed dark outlines, so in dark mode the art sits on this muted light plate (10.9:1 against the outlines), dimmer than `canvas` so it doesn't glow inside dark cards. In light mode it matches `surface`. |
| `term-bar` | `#2a3830` | `#2a3830` | Terminal title bar, on top of `term-bg`. Same in both themes. |
| `term-bg` | `#1f2a24` | `#1f2a24` | Terminal body and the text-forms panel, the same in both themes. |
| `term-edge` | `#1f2a24` | `#3a4a41` | Terminal outline. Invisible in light mode; in dark mode it separates the terminal from `canvas` (term-bg is only 1.2:1 against it). |
| `term-text` | `#e6eee3` | `#e6eee3` | Commands, output and ASCII text forms on `term-bg` (12.5:1). Same in both themes. |
| `term-dim` | `#b9ccb2` | `#b9ccb2` | Window path, key hints and panel labels on `term-bg` (8.7:1) and `term-bar` (7.2:1). Same in both themes. |
| `term-tuck` | `#f0c49e` | `#f0c49e` | Tuck's ASCII face (`@_^^`, `(@)`) inside terminal output, on `term-bg` (9.3:1). Same in both themes. |
| `term-faint` | `#8a9b90` | `#8a9b90` | Comments and hints in terminal output (`# tuckshell export`), on `term-bg` (5.1:1). Same in both themes. |
| `ansi-black` | `{term-bg}` | `{term-bg}` | ANSI 0 in tuckshell's terminal theme. |
| `ansi-red` | `{blush}` | `{blush}` | ANSI 1. Error output prints in Tuck's blush, not red (7.5:1 on `term-bg`). |
| `ansi-green` | `{moss}` | `{moss}` | ANSI 2 (done, logged). |
| `ansi-yellow` | `{butter}` | `{butter}` | ANSI 3 (needs a look). |
| `ansi-blue` | `{tear}` | `{tear}` | ANSI 4 (commands and links in output, 7.1:1 on `term-bg`). |
| `ansi-magenta` | `{caramel}` | `{caramel}` | ANSI 5. |
| `ansi-cyan` | `#8fc4b8` | `#8fc4b8` | ANSI 6, a sage cyan (7.6:1 on `term-bg`). |
| `ansi-white` | `{term-text}` | `{term-text}` | ANSI 7. |
| `ansi-bright-black` | `{term-faint}` | `{term-faint}` | ANSI 8. |
| `ansi-bright-red` | `#f0c4bd` | `#f0c4bd` | ANSI 9 (9.4:1 on `term-bg`). |
| `ansi-bright-green` | `{term-dim}` | `{term-dim}` | ANSI 10. |
| `ansi-bright-yellow` | `#f0d898` | `#f0d898` | ANSI 11 (10.6:1 on `term-bg`). |
| `ansi-bright-blue` | `#b5d0e6` | `#b5d0e6` | ANSI 12 (9.3:1 on `term-bg`). |
| `ansi-bright-magenta` | `{term-tuck}` | `{term-tuck}` | ANSI 13. |
| `ansi-bright-cyan` | `#b5dcd2` | `#b5dcd2` | ANSI 14 (10.0:1 on `term-bg`). |
| `ansi-bright-white` | `#ffffff` | `#ffffff` | ANSI 15. |

## Type

Bricolage Grotesque and JetBrains Mono, as used on the Tuck sketches canvas. Both load from Google Fonts at 400, 600 and 800 (mono 400 and 600).

- `sans`: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif
- `mono`: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace

### Sans (`sans`)

| Style | Size | Line height | Weight | Sample | Usage |
| --- | --- | --- | --- | --- | --- |
| `display` | 56px | 1 | 800 | Tuck the Snail | One per page: sheet or screen title. |
| `title` | 40px | 1.1 | 800 | Expressions | Section titles. |
| `heading` | 26px | 1.15 | 800 | How are you today? | Screen questions and social-tile headlines. |
| `lead` | 18px | 1.4 | 400 | Slow progress is still progress. | Tagline under a display title, in `ink-muted`. |
| `label` | 18px | 1.3 | 600 | Happy | Expression-card names and small headings. |
| `body` | 16px | 1.5 | 400 | Emotion lives in the eye stalks. | Running text; section subtitles in `ink-muted`. |
| `note` | 15px | 1.45 | 400 | Shell days count too. | Card descriptions, in `ink-muted`. |
| `panel-label` | 14px | 1.3 | 600 | 1 · Hero pose | Numbered panel labels, in `ink-muted` (or `term-dim` on ink). |
| `caption` | 13px | 1.5 | 400 | Stored on this device only. | Footers and fine print, in `ink-muted`. |
| `eyebrow` | 14px | 1.3 | 400, tracking 0.12em | MODEL SHEET · SKETCH V0.1 | Uppercase kicker above a title, in `ink-muted`. The only uppercase text. |

### Mono (`mono`)

| Style | Size | Line height | Weight | Sample | Usage |
| --- | --- | --- | --- | --- | --- |
| `mono-lg` | 26px | 1.5 | 400 | @_^^      happy | ASCII text forms shown as specimens. |
| `mono-chip` | 16px | 1.4 | 400 | @_^^ good | Mood chips and the ASCII code on expression cards. |
| `mono` | 15px | 1.6 | 400 | $ tuck log water | Terminal output and roguelike maps. |
| `mono-sm` | 13px | 1.4 | 400 | ~/tuck | Terminal window path. |

## Spacing, radius and stroke

### Spacing

| Token | Value | Usage |
| --- | --- | --- |
| `space-6` | 6px | Gap between a title and its eyebrow or tagline; inside expression cards. |
| `space-8` | 8px | Gap between window dots; tight stacks. |
| `space-10` | 10px | Gap between mood chips. |
| `space-12` | 12px | Gap inside panels and social tiles. |
| `space-16` | 16px | Gap inside the check-in screen; terminal bar padding (inline). |
| `space-20` | 20px | Terminal body padding; social-tile padding; expression-card padding (inline) and grid gap. |
| `space-24` | 24px | Card and phone padding; gap between cards and sections. |
| `space-32` | 32px | Gap between a sheet's header and its grid. |
| `space-48` | 48px | Sheet padding (block). |
| `space-64` | 64px | Sheet padding (inline). |

### Radius

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | 14px | Mood chips. |
| `radius-md` | 16px | Terminal window. |
| `radius-lg` | 20px | Cards, the text-forms panel, social tiles. |
| `radius-xl` | 28px | Phone screen frame. |
| `radius-full` | 9999px | Swatches, the avatar disc, window dots. |

### Stroke

| Token | Value | Usage |
| --- | --- | --- |
| `stroke-ui` | 2px | Outline on cards, chips, swatches and the phone frame, in `ink`. |
| `stroke-art` | 3px | Outline weight for Tuck's artwork, in `ink` (2.5px for spirals and small details). |

## Components

React components, exposed as `window.Tuck` by the design system's bundle.

### TuckFace

Tuck's ASCII text form for a mood, the logo in text.

**Provide:** `mood` (one of `map`, `awake`, `happy`, `sleepy`, `sad`, `surprised`, `stressed`, `shy`, `resting`, `progress`); optional `size` (`sm` 13px, `md` 15px, `lg` 22px, `xl` 40px), `onDark` inside the terminal (colors it `term-tuck`); otherwise it follows `ink` in both themes, and `label` to override the accessible name.

- Use it wherever Tuck "speaks" in text: terminal output, chips, captions, roguelike maps.
- Do not edit the forms or add characters; the shell `@` never changes.
- Do not pair it with emoji.

### MoodChip

A check-in answer: Tuck's face plus one lowercase word, in an outlined chip.

**Provide:** `mood`, the word as `children`, `selected` for the chosen answer (fills `caramel-wash`), `wide` for the full-width row, and `onClick`. The container lays chips out in a two-column grid, gap `space-10`.

- The standard set, in order: good (`happy`), okay (`awake`), tired (`sleepy`), low (`sad`), then a wide shell day (`resting`).
- Words are lowercase and kind. Never "bad", "failed" or a score.
- Every check-in screen ends with a `TrustNote`.
- Wrap the chips in an element with `role="group"` and an `aria-label` (or `aria-labelledby`) naming the question, so screen readers announce "how are you today?" before the answers.
- Each chip is a toggle button (`aria-pressed`). The selected chip also gets a 4px border and 600 weight, so the choice never depends on color alone (the fill alone is only 1.3:1).
- The ASCII face is hidden from screen readers; the word carries the meaning.

### ExpressionCard

A card naming one of Tuck's expressions, with its artwork above and its ASCII code in the corner.

**Provide:** `mood`, `name` (sentence case, e.g. "Sleepy") and `art`: an `<img>` of the matching file from the Mascot assets (`tuck-happy.svg`, `tuck-sleepy.svg`, `tuck-sad.svg`, `tuck-surprised.svg`, `tuck-stressed.svg`, `tuck-shy.svg`). With no `art`, the card shows the text form large. The art sits on an `art-ground` plate, so it stays legible in dark mode.

- Use it on model sheets, sticker pickers and settings where a person chooses how Tuck looks.
- Lay cards in a grid `space-20` apart; three across on wide screens.
- Only the eye stalks and mouth change between expressions; never pass art that changes the shell or body.
- Give the `<img>` a descriptive `alt` that names the expression and what changes, e.g. "Tuck sleepy, stalks loose, eyes closed". The ASCII code is hidden from screen readers, since it would be spelled out.
- Cards have no minimum width; let the grid decide (`repeat(auto-fill, minmax(200px, 1fr))`).

### Terminal

The `tuckshell` window: a `term-bg` body under a `term-bar`, outlined in `term-edge`; it looks the same in both themes with three dots and the path.

**Provide:** `path` (default `~/tuck`) and `lines`, each `{type, face, text}`: `cmd` prints `$ ` + text, a plain line may lead with Tuck's `face` (in `term-tuck`), `dim` for key hints, `gap` for a blank line. Raw content (a roguelike map) can go in `children`.

- Output is lowercase, one short sentence, starting with Tuck's face.
- Use `tuckshell` as the command name in public material.
- Maps use `#` walls, `.` floor, `~` Tuck's trail, `@` Tuck and `(@)` resting.
- The body is a focusable, labelled region (`label` prop, default "terminal, ~/tuck") so keyboard users can scroll long lines. It never widens the page; long lines scroll inside it.
- Tuck's faces in output are announced as words ("tuck, happy"); pass `faceLabel` on a line for a custom reading. The window dots are hidden from screen readers.

### SocialTile

A square `caramel` post tile for Instagram and Bluesky with an `on-caramel` headline and a quiet second line.

**Provide:** `headline` (sentence case, one or two short lines), `sub` (one line, or `null` to drop it), `signature` (usually "— tuck & sam") and optional `art`: an `<img>` of `tuck-tucked-white.svg` (the white shell reads on caramel; the caramel shell would vanish).

- One idea per tile. No hashtags or exclamation marks on the tile.
- Keep text and the outline `on-caramel` in both themes; `caramel` is never used as text.

### TrustNote

The privacy and safety line at the foot of every check-in screen.

**Provide:** nothing for the standard text ("Stored on this device only. Need to talk to someone? Call or text 988."), or `children` for a localized version that keeps both halves.

- Always show it on mood and check-in surfaces; never hide it behind a link.
- Keep the wording plain; make no clinical claims.
- The default text links "988" as `tel:988`, so it is one tap on a phone.

### Types

```ts
import type * as React from 'react';

/** Tuck's moods; each maps to one ASCII text form. */
export type Mood = 'map' | 'awake' | 'happy' | 'sleepy' | 'sad' | 'surprised' | 'stressed' | 'shy' | 'resting' | 'progress';

export interface TuckFaceProps { mood?: Mood; size?: 'sm' | 'md' | 'lg' | 'xl'; onDark?: boolean; label?: string; className?: string }
export declare function TuckFace(props: TuckFaceProps): React.ReactElement;

export interface MoodChipProps { mood: Mood; children: React.ReactNode; selected?: boolean; wide?: boolean; disabled?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; className?: string }
export declare function MoodChip(props: MoodChipProps): React.ReactElement;

export interface ExpressionCardProps { mood?: Mood; name?: string; art?: React.ReactNode; className?: string }
export declare function ExpressionCard(props: ExpressionCardProps): React.ReactElement;

export interface TerminalLine { type?: 'cmd' | 'out' | 'dim' | 'gap'; face?: Mood | string; faceLabel?: string; text?: string }
export interface TerminalProps { path?: string; label?: string; lines?: TerminalLine[]; children?: React.ReactNode; className?: string }
export declare function Terminal(props: TerminalProps): React.ReactElement;

export interface SocialTileProps { headline?: string; sub?: string | null; signature?: string; art?: React.ReactNode; className?: string }
export declare function SocialTile(props: SocialTileProps): React.ReactElement;

export interface TrustNoteProps { children?: React.ReactNode; className?: string }
export declare function TrustNote(props: TrustNoteProps): React.ReactElement;

declare global { interface Window { Tuck: { TuckFace: typeof TuckFace; MoodChip: typeof MoodChip; ExpressionCard: typeof ExpressionCard; Terminal: typeof Terminal; SocialTile: typeof SocialTile; TrustNote: typeof TrustNote; FACES: Record<Mood, string> } } }
```

## Mascot assets

Tuck's artwork as SVG, drawn in `ink` outlines (`#1f2a24`, 3px; 2.5px on spirals and small details) with `caramel` shell, `moss` body, `blush` cheeks and a `tear` drop. The files have fixed colors: `<img>` cannot recolor them, so never try to tint them in CSS.

| File | Use |
| --- | --- |
| `tuck-hero.svg` | Hero pose, moving, with speed lines. Headers, splash, landing pages. |
| `tuck-happy.svg` | Happy (`@_^^`): a logged habit, a "good" check-in. |
| `tuck-sleepy.svg` | Sleepy (`@_--`): late-night and sleep prompts, "tired". |
| `tuck-sad.svg` | Sad (`@_;;`): a "low" check-in. Kind, never guilt. |
| `tuck-surprised.svg` | Surprised (`@_OO`): something new, an unexpected find. |
| `tuck-stressed.svg` | Stressed (`@_><`): busy days, errors that aren't the person's fault. |
| `tuck-shy.svg` | Shy (`@_`): first-run, asking permission, privacy notes. |
| `tuck-tucked.svg` | Tucked in (`(@)`), caramel shell with `zZ`. Rest, shell days, empty states on light grounds. |
| `tuck-tucked-white.svg` | Tucked in, white shell. Only on a `caramel` ground (social tiles). |
| `tuck-avatar.svg` | Round avatar on a `moss` disc. Profile pictures and app icons; reads at 32px. |

The sketches also explored three alternate shell colors (lilac `#c7a3d9`, sky `#8fb8d8`, butter `#e3c46b`). Caramel is the chosen shell; the alternates are not part of the system.

The SVG files themselves live in the design system artifact's asset store.
