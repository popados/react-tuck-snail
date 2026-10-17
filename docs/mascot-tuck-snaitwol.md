# Tuck the Snail: Character Build

Updated Oct 12, 2026

## Overview

Keep Tuck as the character's name, but pair it with a distinct studio name such as **Shellday Studio** and the handle `tuckshell`. Tuck is a calm snail mascot for gentle habit and mood apps, web games and terminal roguelikes, with a spiral `@` shell that works as art, avatar and a single text character.

The sketches live on the **Tuck the Snail Sketches** design canvas: a model sheet (hero pose, tucked-in rest, avatar, text forms), six expressions, and Tuck in context (terminal and roguelike, habit check-in, social tile). A shell-color tweak on that canvas offers four swatches for exploring only (caramel plus lilac `#c7a3d9`, sky `#8fb8d8` and butter `#e3c46b`); the shipped shell is always caramel, because the shell never changes.

Everything Tuck looks like is now recorded in the **Tuck the Snail** design system: palette (two themes, 47 colors), type, spacing, six components and ten mascot SVGs. New work (pages, posts, decks) should be built from it.

Round 5 added five palette variants on top of the system (bedtime, low stimulation, paper, light terminal, seasonal) and a clickable **Tuck Check-in Prototype** with a bottom nav, a first-run screen and a shelf of cosmetic unlocks.

## Name check

"Tuck" alone is not safe as a product or studio name in wellness; it is safe as a character name inside a distinct brand.

| Conflict | Why it matters |
| --- | --- |
| [Tuck.com, LLC trademarks](https://trademarks.justia.com/owners/tuck-com-llc-3602428) | TUCK marks cover pillows, bedding, and a website on sleep resources and wellness, right next to mental health |
| [Tuck.com](https://parse.gl/brands/tuck-com) | Publishes sleep product reviews and sleep science content |
| [tuck (UK)](https://www.cbinsights.com/compare/sleep-doctor-vs-tuck) | A London cashback rewards app founded in 2020 |
| [Can't Tuck Snail](https://turbo.fandom.com/wiki/Can%27t_Tuck_Snail) | Minor gag snail in DreamWorks' *Turbo*; fans may mention it, but it is not a brand |
| [Snail'sPace](https://yitonghu.itch.io/snailspace) and [A Snail's Pace](https://aie.edu.au/video/a-snails-pace-aie-student-game/) | Existing snail games, so "Snailpace" is crowded as a studio name |

Recommended names and handles to check:

| Option | Use |
| --- | --- |
| `tuckshell` / `tuck.shell` | Handle and CLI name; a snail shell and a command shell in one word |
| Shellday Studio | Studio name, from "some days are shell days" |
| Slowlight Games | Broader studio umbrella, less snail-specific |
| `@tuckthesnail` | Social handle for the mascot itself |

Before committing, check domains and handles and run a USPTO search in Class 9 (software) and Class 41 (games). This is not legal advice; a short consult is worth it before filing a trademark.

## Personality traits

Tuck is unhurried, gently encouraging and rest-positive, and every trait has a line it never crosses.

| Trait | How it shows up | Never becomes |
| --- | --- | --- |
| Unhurried | Celebrates any pace; progress bars move at snail speed on purpose | Lazy or dismissive of goals |
| Gently encouraging | Notices small wins out loud | Cheerleading or hype |
| Rest-positive | Tucks into its shell without apology | Avoidant; it always comes back out |
| Quietly curious | Peeks around corners in games, asks questions in prompts | Nosy about your data |
| Private | Carries its home with it; your data stays on your device | Secretive or cold |
| Dry, soft humor | Self-aware snail jokes ("I got here eventually") | Sarcastic about the user |
| Roguelike nerd | Knows it's the `@`, enjoys the in-joke | Gatekeeping toward non-gamers |

Voice rules:

- Lowercase in terminal and in-app text; headings on sheets and screens use sentence case ("How are you today?")
- Short sentences
- Questions instead of commands ("water break?")
- Never counts streaks or points out failures ("you missed"); streaks come up only to say they're gone ("no streak died")
- No exclamation-point pileups
- No emoji; Tuck's ASCII faces do that job

## Voice examples for posts

Each example below is ready to adapt; posts are signed by Tuck, with Sam (Tuck's human) speaking in build-in-public updates.

**Habits (Instagram / Threads)**

> drank one glass of water today.  
> that's it. that's the post.  
> one glass counts.

**Missed days**

> you didn't check in for a week.  
> nothing broke. no streak died.  
> i was just here, being a snail.  
> welcome back.

**Mental health (gentle, no claims)**

> some days are shell days.  
> you can tuck in and still be making progress.  
> — tuck & sam

**Build in public (Bluesky / X)**

> sam here, tuck's human. removed the streak counter today.  
> people told us it made them quit after one bad day.  
> replacing it with "days you showed up this month." no zero, no reset.

**Terminal / dev audience**

```
$ tuckshell log walk
@_^^  walk logged. that's 3 this week.
```

> built a habit tracker that lives in your terminal. it never shames you. it's a snail.

**Roguelike (r/roguelikedev, #screenshotsaturday)**

> in most roguelikes, you are the `@`.  
> in ours, the `@` is a snail. combat is optional. resting is a mechanic.  
> `(@)` = tucked in, recovering.

**Web game launch**

> new tiny game: help tuck cross a garden before the rain stops.  
> takes 3 minutes. plays in your browser. tuck is very slow. that's the challenge.

**Late night (sleep habit)**

> `@_--` it's 1:40am. the code will still be here tomorrow. so will i.

## Design notes

The shell never changes; only the eye stalks and mouth carry emotion, so Tuck reads the same everywhere.

- **Fixed spiral `@` shell** in every drawing, so Tuck works as art, as a 32px avatar, and as one character on a roguelike map.
- **Emotion in the stalks and mouth** (up, drooping, wobbly, pulled in), matching the ASCII set: `@_oo` awake or okay, `@_^^` happy, `@_--` sleepy, `@_;;` sad, `@_OO` surprised, `@_><` stressed, `@_` shy, `(@)` resting, and `...@_^^` for progress. On a map Tuck is a plain `@`. These text forms are the logo in text: pure ASCII, used exactly.
- **Palette:** caramel shell (`#d69a6a`), moss-green body (`#9dbb94`), soft pink blush (`#e8a9a0`), dark green-black ink (`#1f2a24`) on a sage canvas (`#eef0ea`). Warm and calm, without the pastel-purple look common in wellness apps.
- **Trust built in:** the check-in screen says "stored on this device only" and lists the 988 line, so privacy and safety are part of the design from day one.

## Colors and how the design system works with the app

The **Tuck the Snail** design system is the single source for every color, font, size and component in Tuck Check-in, tuckshell and the marketing pages. The app should never type a hex value; it asks the design system for a named color, so one change in the system reaches every screen.

### The colors

Two themes, Light and Dark, with 47 colors in total. Values marked "same" do not change between themes.

**Core (pages and text)**

| Color | Light | Dark | Job |
| --- | --- | --- | --- |
| `canvas` | `#eef0ea` | `#161e1a` | Page background |
| `surface` | `#ffffff` | `#1f2a24` | Cards, chips, phone screen; always outlined in `ink` |
| `ink` | `#1f2a24` | `#e6eee3` | Headings, body text, every outline, focus rings |
| `ink-muted` | `#4a5750` | `#9fb39a` | Captions, eyebrows, the device-only footer |
| `caramel-text` | `#8a5530` | `#f0c49e` | Tuck's shell as a readable text color |
| `link` | follows `caramel-text` | follows `caramel-text` | Links, always underlined |

**Tuck's art (fills, never text)**

| Color | Light | Dark | Job |
| --- | --- | --- | --- |
| `caramel` | `#d69a6a` | same | The shell; social-tile background |
| `on-caramel` | `#1f2a24` | same | Text and outlines on caramel |
| `caramel-deep` | `#bb895f` | same | Ground shadow on a caramel tile |
| `caramel-wash` | `#efd2b8` | `#5a4330` | Selected mood chip (with a 4px `ink` border and bold text) |
| `moss` | `#9dbb94` | same | Tuck's body, the avatar disc |
| `blush` | `#e8a9a0` | same | Cheeks; first terminal window dot |
| `butter` | `#e3c46b` | same | Middle terminal window dot |
| `tear` | `#8fb8d8` | same | The tear in the Sad expression |
| `ground-shadow` | `#e4e5e4` | `#121915` | The only shadow: under a resting shell |
| `art-ground` | `#ffffff` | `#d9dfd4` | Plate behind Tuck's art, so the dark outlines stay visible in dark mode |

**Mood scale (insights charts, same in both themes)**

| Color | Value | Mood |
| --- | --- | --- |
| `mood-good` | `#e3c46b` | `@_^^` good |
| `mood-okay` | `#9dbb94` | `@_oo` okay |
| `mood-tired` | `#7a9fbf` | `@_--` tired |
| `mood-low` | `#56738c` | `@_;;` low |
| `mood-shell` | `#d69a6a` | `(@)` shell day |

The first four step down in lightness, so they still read in grayscale and for color-blind users. None is red. They are pale fills, so every bar is outlined in `ink` and labelled with its face.

**Notices (never red)**

| Color | Light | Dark | Used for |
| --- | --- | --- | --- |
| `moss-wash` | `#e8f0e4` | `#2c3a2a` | Done or saved |
| `butter-wash` | `#f8efcf` | `#3d3720` | Needs a look (e.g. couldn't save, no backup) |
| `tear-wash` | `#e3eef6` | `#23323d` | Information |

**Terminal (tuckshell, same in both themes)**

| Color | Value | Job |
| --- | --- | --- |
| `term-bg` / `term-bar` | `#1f2a24` / `#2a3830` | Terminal body and title bar |
| `term-edge` | `#1f2a24` light, `#3a4a41` dark | Outline that separates the terminal from a dark page |
| `term-text` | `#e6eee3` | Commands and output |
| `term-dim` | `#b9ccb2` | Path and key hints |
| `term-tuck` | `#f0c49e` | Tuck's face in output |
| `term-faint` | `#8a9b90` | Comments and hints |
| `ansi-*` (16 slots) | mapped to Tuck's colors | Red prints as `blush`, green as `moss`, yellow as `butter`, blue as `tear`, magenta as `caramel` |

Every text pairing meets WCAG 2.1 AA (4.5:1) in both themes.

### How the design system plugs into the app

1. **Colors become CSS variables.** The system compiles its colors into `tokens.css`: Light values on `:root` and `[data-theme="light"]`, Dark values on `[data-theme="dark"]`. The app writes `var(--surface)` or `var(--mood-low)`, never a hex code.
2. **Theme switching is one attribute.** The app sets `data-theme` on the page's root element: it follows the phone or computer's light or dark setting by default, and a manual choice is saved on the device like everything else. Every component re-colors at once; Tuck's art colors stay the same.
3. **Components come from the system's bundle.** Tuck Check-in loads the bundle (React 18) and uses its six components instead of rebuilding them. Each already carries the accessibility rules, so the app gets them for free.

| Component | Where it appears in Tuck Check-in |
| --- | --- |
| `MoodChip` | The five check-in answers; selected = `caramel-wash` + 4px border + bold |
| `TuckFace` | Tuck's ASCII face in replies and labels, read aloud as words ("tuck, happy") |
| `ExpressionCard` | Tuck's art, on the `art-ground` plate |
| `TrustNote` | "Stored on this device only… 988" footer on every mood screen |
| `Terminal` | tuckshell previews and the developer pages |
| `SocialTile` | Share cards from the app and marketing posts |

4. **One mood drives face, art and color.** When someone picks a mood, the app looks up everything else from it:

| Check-in answer | Face | `TuckFace` mood | Art file | Insights color |
| --- | --- | --- | --- | --- |
| good | `@_^^` | `happy` | `tuck-happy.svg` | `mood-good` |
| okay | `@_oo` | `awake` | none yet (use the face) | `mood-okay` |
| tired | `@_--` | `sleepy` | `tuck-sleepy.svg` | `mood-tired` |
| low | `@_;;` | `sad` | `tuck-sad.svg` | `mood-low` |
| shell day | `(@)` | `resting` | `tuck-tucked.svg` | `mood-shell` |

Three expressions are for moments, not answers, and get no mood color: surprised `@_OO` for something new, stressed `@_><` for busy days and errors that aren't the person's fault, and shy `@_` for first run and privacy notes. Words stay lowercase and kind; never "bad", "failed" or a score.

5. **States map to notices.** Saved shows on `moss-wash`, a storage problem on `butter-wash` with surprised Tuck (`tuck-surprised.svg`), and tips on `tear-wash`. Nothing in the app is ever red.
6. **Art comes from the mascot assets.** The app uses the ten SVGs exactly as stored. It never redraws or recolors Tuck, and never places art straight on a dark surface.
7. **Design canvases keep a copy.** The landing page and home page canvases each hold a copy of the system's colors. When the system changes, recopy it onto each canvas; the home pages needed exactly that after the Round 3 palette update.
8. **tuckshell uses the same names.** Its 16 terminal colors are the `ansi-*` tokens, so the terminal and the app share one palette.

Tuck Check-in isn't built yet; this describes how it should use the system once it is.

## Round 2: emotion, wants and versions

Tuck needed two things: more emotional range for a wellness app, and a want of his own so he can carry stories, not just react.

### Emotion kit

Every expression mixes four parts. The shell and body never change.

| Part | Options |
| --- | --- |
| Stalks | up · tall · lean · droop · wobble · pulled in |
| Eyes | dot · wide · arc · closed · half-lid · squeeze · uneven |
| Mouth | smile · soft · flat · frown · o · wobble |
| Extras | blush · tear · sweat · zZ · ? · spark · heart |
| Never | shell · body shape · emoji |

Eight new expressions built from the kit:

| Expression | ASCII | When it appears |
| --- | --- | --- |
| Proud | `@_^^ *` | A habit logged after a hard week |
| Curious | `@_o?` | First open, or something new |
| Focused | `@_==` | A tuckshell timer is running |
| Calm | `@_uu` | After a breath, or a reflect session |
| Grateful | `@_^^ <3` | A gratitude entry is saved |
| Confused | `@_o0 ?` | An unknown command, gently |
| Anxious | `@_oo;` | Check-in answer: anxious |
| Lonely | `@_..` | Check-in answer: lonely; Tuck suggests a call |

### What Tuck wants

Tuck wants a place where slow is fine.

- **Tuck Check-in:** to help you notice, not fix.
- **Web games:** to see the whole garden, one leaf at a time.
- **Terminal:** a warm, quiet place to wait with you.

### Why Tuck codes (origin comic)

1. the garden is fast. the rain is fast. tuck is not.
2. one night: something warm on the porch. a blinking `_`.
3. on the screen, the hero was an `@`. it looked just like him.
4. in here, slow is fine. you build one key at a time. — tuck & sam

The roguelike in-joke becomes his origin story.

**Naming note:** this round calls the wellness tracker *Reflect & Realign*. The strategy, campaign, landing page, home pages and Today brief all call it **Tuck Check-in**, so Tuck Check-in is the product name. Still-water Tuck and "let's look back. no grades." fit a weekly look-back inside Check-in; whether that feature is called Reflect & Realign is still to decide.

### Three versions, one shell

| Product | Version | Prop and look | Line |
| --- | --- | --- | --- |
| Tuck Check-in (wellness tracker; working name Reflect & Realign) | Still-water Tuck | Sits at still water, eyes closed; his reflection shows how the week felt; "realign" is the ripples settling | `@_uu  let's look back. no grades.` |
| Web games | Trail Tuck | Pink scarf, forward lean, speed lines; 16×12 pixel sprite for in-game use | `...@_^^  i got here eventually.` |
| Terminal games | Lamp Tuck | Small headlamp lighting the `>_` prompt; two-line ASCII form | `@_==  compiling. i'll wait with you.` |

Two-line terminal form:

```
    o o
 @__| |   hi. i'm the @.
```

The art for all of this is on the **Tuck the Snail Sketches** canvas (boards: Emotion kit, Three Tucks, Comic: why Tuck codes), now styled with the Tuck design system.

**Design-system conflict:** the design system's README says never to redraw Tuck. The new versions are new drawings, so once approved, add the final art to the design system's mascot assets.

## Round 3: design system and launch kit

Tuck now has a working design system, an accessibility pass, a dark theme, a content cluster and a landing page.

### The design system

The **Tuck the Snail** design system was built from the model sheet, expressions sheet, context sheet and this file. Values come from the sketches canvas source, not estimates.

| Area | What it holds |
| --- | --- |
| Type | Bricolage Grotesque (headings 800, labels 600, body 400) and JetBrains Mono (ASCII faces, terminal, chips), from Google Fonts |
| Shape | Radii 14 (chips), 16 (terminal), 20 (cards, tiles), 28 (phone); 2px ink outlines; borders, not shadows |
| Space | 6 to 64px steps; cards pad 24, chips 52px tall and 10 apart |
| Components | TuckFace (ASCII face, read aloud as words), MoodChip, ExpressionCard, Terminal, SocialTile, TrustNote (988 as tap-to-call) |
| Mascot assets | 10 SVGs taken exactly from the sketches canvas: hero, six expressions, tucked in (caramel and white shell), avatar |

The mascot files, and the job each one does. They are drawn in 3px `ink` outlines (2.5px on spirals and small details) with fixed colors, so CSS can't tint them.

| File | Use |
| --- | --- |
| `tuck-hero.svg` | Hero pose with speed lines: headers, splash, landing pages |
| `tuck-happy.svg` | `@_^^`: a logged habit, a "good" check-in |
| `tuck-sleepy.svg` | `@_--`: late-night and sleep prompts, "tired" |
| `tuck-sad.svg` | `@_;;`: a "low" check-in; kind, never guilt |
| `tuck-surprised.svg` | `@_OO`: something new, an unexpected find, a storage problem |
| `tuck-stressed.svg` | `@_><`: busy days, errors that aren't the person's fault |
| `tuck-shy.svg` | `@_`: first run, asking permission, privacy notes |
| `tuck-tucked.svg` | `(@)` with `zZ`: rest, shell days, empty states on light grounds |
| `tuck-tucked-white.svg` | Tucked in with a white shell, only on a `caramel` ground (social tiles) |
| `tuck-avatar.svg` | Round avatar on a `moss` disc: profile pictures and app icons, reads at 32px |

The design system lives as an artifact (the source of truth) and is also exported as Markdown: `design-system/tuck-design-system.md` in the project files, plus copies in the `docs` folder of the react-tuck-snail repo.

### Color

Two themes, Light and Dark, 47 colors. Dark mode is built from Tuck's own terminal colors: the ink green becomes the dark surface, and the terminal's pale sage becomes dark-mode text. Tuck's art colors never change between themes.

| Group | Colors |
| --- | --- |
| Core | `canvas`, `surface`, `ink`, `ink-muted`, `link` (follows `caramel-text`) |
| Tuck's art | `caramel`, `on-caramel`, `caramel-deep`, `caramel-wash`, `moss`, `blush`, `butter`, `tear`, `ground-shadow`, `art-ground` |
| Text accent | `caramel-text` (`#8a5530` light, `#f0c49e` dark) |
| Mood scale (insights charts) | `mood-good`, `mood-okay`, `mood-tired`, `mood-low`, `mood-shell`; step down in lightness, no red, always outlined in ink and labelled with the face |
| Notices | `moss-wash` (done), `butter-wash` (needs a look), `tear-wash` (info); never a red error state |
| Terminal | `term-bar`, `term-bg`, `term-edge`, `term-text`, `term-dim`, `term-tuck`, `term-faint`, and 16 `ansi-*` slots where "error red" prints as blush |

Two dark-mode rules: Tuck's art always sits on the `art-ground` plate (the SVG outlines are fixed dark lines), and anything on caramel uses `on-caramel`. Every value is listed in "Colors and how the design system works with the app".

From the palette review, four existing colors changed: links now use the shell color, dark-mode muted text is darker, the selected-chip wash is deeper, and the dark-mode art plate is dimmer.

### Accessibility

The system targets WCAG 2.1 AA in both themes. An audit found and fixed five problems:

- The selected mood chip was shown by fill alone (1.3:1); it now also gets a 4px border and bold text.
- The terminal pushed phone screens sideways; long lines now scroll inside a focusable region.
- Expression cards had a 220px minimum width; they now reflow to 320px.
- Screen readers spelled out ASCII faces ("at underscore caret caret"); they now read as words ("tuck, happy").
- Artwork gained descriptive alt text, and 988 became a tap-to-call link.

### Theme ideas for later

Themes that fit the palette, most useful first: high contrast, bedtime (a warmer, dimmer dark), low-stimulation, paper/print, light terminal, personal shell colors, and seasonal accents. High contrast and bedtime are the recommended next two. Round 5 built five of these (bedtime, low stimulation, paper, light terminal, seasonal); high contrast and personal shell colors are still open. A "pick your snail" shell color clashes with the rule that the shell never changes, so it fits only as a personal app setting.

## Round 4: home pages and the Today screen brief

### Five home page layouts

The **Shellday Home Pages** design canvas has five home pages for Shellday Studio, each built from the Tuck design system's components (TuckFace, MoodChip, Terminal, SocialTile, TrustNote, ExpressionCard) and Tuck's real SVGs. Every page is fluid from 1440px desktop down to a 390px phone. A sixth board shows all five side by side at 390px.

| Layout | Who it leads with | What's on it |
| --- | --- | --- |
| 1 · Classic split | Everyone | Copy left and hero Tuck right, the three pillars, "Three ways to meet Tuck" (check-in, tuckshell, games), a "welcome back" band with the social tile, newsletter |
| 2 · Terminal first | Developers | Dark terminal hero with a live tuckshell session, three command cards, the roguelike map with a legend, a link to the web app |
| 3 · Check-in first | Gentle self-trackers | The hero is a working check-in: picking a mood changes Tuck's reply and art (interactive in Play); then how it works, privacy, more from Shellday |
| 4 · Editorial story | Readers who want the why | Centered long read: three numbered chapters (Rest counts, Your data stays home, One snail everywhere), all six expression cards, a build-in-public note from Sam |
| 5 · Bento grid | Skimmers | Everything as tiles on one screen: hero, art, check-in, social tile, privacy, terminal, roguelike map, "gone a week?", newsletter |

How the mobile versions work: each page responds to its own width rather than the browser window, so at narrow widths the nav links collapse to a menu button, grids stack into one column, and wide tiles drop to single width.

Placeholders and assumptions on the canvas:

- The tuckshell install command is `[YOUR INSTALL COMMAND]`.
- `tuckshell rest` (log a shell day) is a made-up command; confirm or rename it.
- Games are labelled "coming 2027", from the strategy roadmap.
- Newsletter forms don't submit anywhere yet.

**Design system copy, now current:** the canvas first copied the system at 4:20am, before the Round 3 palette and accessibility changes were saved at 6:25am. At 7:19am the canvas was recopied from the current system, so the home pages now match Round 3. What changed in that update:

| Before (first copy) | Now (current design system) |
| --- | --- |
| `link` green `#2f5d46` (dark `#a9c9a0`) | `link` follows `caramel-text`: `#8a5530` light, `#f0c49e` dark |
| `caramel-wash` `#f3e2d3` (dark `#4a3a2c`) | `#efd2b8` (dark `#5a4330`), plus a 4px `ink` border and 600 weight when selected |
| Dark `ink-muted` `#b9ccb2` | `#9fb39a` |
| Dark `art-ground` `#eef0ea` | `#d9dfd4` |
| 21 colors | 47 colors (adds `caramel-text`, the mood scale, notice washes, `term-faint`, 16 `ansi-*`) |
| Older components: fill-only selected chip, terminal not focusable, 220px card minimum, 988 as plain text | Current components with all five Round 3 fixes |

No page layouts changed; only the colors and components underneath them.

### Product statement (as given)

Tuck the snail will win a small, loyal audience with a wellness and mood tracking tool that shows users their progress and insights, keeps data on their device, and has one character. Tuck joins apps, web games and the terminal, so each product markets the others. Gamified apps use pets or RPGs and mood trackers are plain utilities; nothing checked combines a mascot with this.

**On "gamify everything":** reward showing up, never punish being away. Use cosmetic unlocks that carry into the games and a count of days shown up that never drops. No points to lose, no leaderboards, no resets. Unlocks can't recolor the shell, since the shell never changes.

### Design brief: the Today screen (Tuck Check-in)

**Product:** Tuck Check-in by Shellday Studio, a habit and mood tracker that runs in the browser and stores everything on the device. For adults 20–40 who have quit two or more habit apps, often after one missed day reset their progress; many live with anxiety, low mood, chronic illness or irregular schedules. Secondary: terminal users and cozy or roguelike players.

**User goal:** check in for today in under 10 seconds, then see one kind sign of progress.

**Platform:** both, mobile first. Mobile 390×844; desktop 1440×900 with the check-in left and progress and insight right.

**Content:**

- Header: "Saturday · check-in", Tuck's avatar, "How are you today?"
- Mood chips: `@_^^ good`, `@_oo okay`, `@_-- tired`, `@_;; low`, and a full-width `(@) shell day`
- Quick habits (one tap each): water, walk, sleep, break, with counts such as "water · 9 this week"
- Progress: "you showed up 14 days in october", shell days counted the same; never "x of 31" or skipped days
- One insight, gentle and making no claims: "you've picked tired most on mondays. worth a slower start?" or "walks show up more on days you log good."
- Unlock card: "10 days this month. unlocked: a fern for tuck's garden map", linking to the web game, with a smaller tuckshell link
- Reply after check-in: "`@_^^` glad. small wins count."
- Footer: "Stored on this device only. Need to talk to someone? Call or text 988."
- Art: the six expression SVGs matched to the mood, and `tuck-tucked.svg` for shell days

**States:**

| State | What the user sees |
| --- | --- |
| Default | Chips with nothing selected, today's habits, month progress (charted with the mood scale, each bar labelled with its face), one insight, current unlock. After 3+ days away: "`(@) → @_oo` you're back. no catching up." and nothing else changes |
| Empty (first day) | Shy Tuck: "`@_` nothing here yet. that's fine." Progress reads "your first day"; insights "show up after a week or so" |
| Loading | Local data, so nearly instant; if needed, a `...@_^^` line and quiet placeholder blocks, no spinner or bounce |
| Error (storage blocked, full, or private mode) | A `butter-wash` notice with surprised Tuck: "`@_OO` couldn't save on this device. your answer is still here." Buttons: try again, export a copy. Entry kept in memory. Never red |
| Success | Chosen chip fills `caramel-wash` with a 4px `ink` border and 600 weight; Tuck's reply and art appear on a `moss-wash` notice; a milestone slides in the unlock card slowly. Shell day: "`(@)` shell day logged. that counts too." |

**Constraints:**

- Colors: `canvas` #eef0ea, `surface` #fff, `ink` #1f2a24; links and text accents in `caramel-text` #8a5530; `caramel` #d69a6a and `moss` #9dbb94 as fills only, never text; selected `caramel-wash` #efd2b8 with a 4px `ink` border; notices on `moss-wash`, `butter-wash` or `tear-wash`, never red; insights charts in the mood scale; dark mode from the system's dark tokens, art always on `art-ground`
- Fonts: Bricolage Grotesque (800 headings, 600 labels, 400 body) and JetBrains Mono for anything Tuck types
- Shape: 2px `ink` outlines, no drop shadows; radii 14 chips, 20 cards, 28 phone frame
- Accessibility, WCAG 2.1 AA (the design system's target): text 4.5:1; touch targets 44px+ (chips 52px); 2px `ink` focus outline; ASCII faces read as words ("tuck, happy"); mood never shown by color alone; respects reduced motion
- Voice: lowercase in the app, short sentences, questions not commands, no streak counts and never "missed" or "failed", no emoji or exclamation points, no treatment claims ("notice patterns", not "reduce anxiety")
- Privacy: no account, no analytics on mood entries; device-only note and 988 (tap to call) always visible on mood screens

## Round 5: palette variants and the check-in prototype

### Five palette variants

Five palettes extend the design system, each with a light and a dark mode. They are written up in `design-system/mascot-tuck-snail-palette-variants.md` (values also in a matching `.json` file) and previewed on the **Tuck Palette Variants** page, which shows a check-in card and a terminal for each.

Rules every variant keeps:

- **Same token names.** A variant swaps values, never names, so components change palette with no code changes. To ship one, add it to the design system as a theme (`bedtime-light`, `bedtime-dark` and so on).
- **Tuck never changes.** `caramel`, `moss`, `blush`, `on-caramel` and the SVG art are identical everywhere, and the art always sits on that variant's `art-ground`.
- **Mood colors are fixed.** The five mood fills stay the same, outlined in the variant's `line` color and labelled with their faces.
- **No red.** Notices use done, look and info washes; the terminal's red slot is blush (a dark blush on light terminals).
- **Contrast checked by script.** Text is 4.5:1 or better on every ground it uses, outlines 3:1 or better on `canvas` and `surface`, and `ink-muted` stays a visible step below `ink`. Every pair passed.
- **State never by color alone.** The selected chip keeps its 4px border and 600 weight; links stay underlined.

| Palette | What it is | Use for | Lowest text contrast (light / dark) |
| --- | --- | --- | --- |
| Bedtime | Warm amber darks with the blue taken out of every neutral | After 9pm, sleep and wind-down prompts, the 1:40am copy; pairs with `@_--` and `(@)` | 5.2:1 / 6.78:1 |
| Low stimulation | Desaturated and evenly lit, no pure white or black, softer outlines; sits closest to the limits on purpose | A setting for sensory-sensitive or overwhelmed days, and an opt-in default after a "low" check-in | 4.73:1 / 5.64:1 |
| Paper | Off-white paper, warm black ink, moss-green link (`#2f5d46`); dark mode is kraft paper under a lamp | Printables, zines, the build-in-public blog, press kit | 6.39:1 / 5.53:1 |
| Light terminal | Core page colors; tuckshell flips to a paper-light ground with darker, text-safe ANSI colors (red is dark blush `#8f463d`) | Light editor themes, docs screenshots, printed command references | 5.04:1 / 5.29:1 |
| Seasonal | Four accents on the core palette; only `link` and the selected-chip wash change | Seasonal campaigns and in-game events | 5.34:1 or better |

The four seasons each borrow one of Tuck's colors: spring moss (link `#3d6b35`), summer butter (`#7a5a12`), autumn caramel (`#8a5530`) and winter tear (`#2c5a7a`). Autumn matches the core system exactly, so it is the default season.

### Mood palette rules

The mood palettes doc (`design-system/mascot-tuck-snail-mood-palettes.md`) adds a few rules on top of the color tables above:

- Mood colors never tint chips. Every `MoodChip` keeps its `surface` fill and outline; the face and word carry the mood.
- Mood colors are fills, never text (1.7:1 to 5.0:1 on white). By lightness: good 80, okay 73, shell day 68, tired 64, low 48. Tired and shell day stay apart by hue and face.
- In charts, a day with no check-in is empty space, never a grey "missed" mark. Axis and labels use `ink-muted`.
- Notice copy: "saved. small check-ins count." (`moss-wash`), "no backup in 30 days." (`butter-wash`), "data stays on this device." (`tear-wash`).
- Art gets alt text naming the expression, e.g. "Tuck sleepy, stalks loose, eyes closed".

Terminal check-ins use the same moods:

```
$ tuckshell checkin tired
@_--  noted. rest counts too.
$ tuckshell checkin shell
(@)   shell day. see you when you're back.
```

### Tuck Check-in Prototype (v0.1)

A clickable phone prototype built from the design system and the palette variants. Everything tapped stays in that browser, and the month of check-ins is example data.

**Navigation:** a bottom tab bar with four tabs, each an ASCII glyph over a lowercase word, since the system has no icon set: `@` today, `@_oo` check in, `~~@` insights, `(@)` shelf. Tabs are 56px tall; the current one gets the selected wash, an outline and 600 weight. Settings and data sit behind a round "you" button in the top bar, next to the avatar and "Tuck Check-in".

| Screen | What's on it |
| --- | --- |
| First run | Shy Tuck, "Hi. I'm Tuck.", the landing page promise ("no streaks, no account. everything stays on this phone."), a start button; no nav |
| Today (home) | A time-of-day greeting; hero Tuck with "`@_oo` hi. no rush today." and one "check in" button ("takes about five seconds"), which turns into Tuck's matching art and line after checking in; "Days you showed up this month" as a count and a `~~~~@` trail; three one-tap habits; the TrustNote |
| Check in | "How are you today?", the five mood chips, an optional note ("anything on your mind?"), save or "not now" |
| Saved | Matching art and line on `moss-wash`; a "low" answer also gets a `tear-wash` note about 988 |
| Insights | A month calendar filled in mood colors with faces (blank days stay blank), a "How the days felt" bar chart, and one pattern line: "tired days often follow late nights. that's a pattern, not a grade." |
| Shelf | Cosmetic unlocks, "nothing here is earned by a streak, and nothing goes away": Core, Bedtime (after an evening check-in), Paper (7th check-in), Spring moss (found in the web game), a trail in the web game, and a tuckshell theme (`tuckshell unlock`) |
| You | Palette picker, a "switch to bedtime after 9pm" toggle, your data (check-in count, no account, sync or analytics, a "no backup in 30 days" notice, export, erase with a second tap), a 988 card, and "replay first run" |

Tuck's line for each answer: good "noted. glad today's a good one.", okay "okay is a fine place to be.", tired "noted. rest counts too.", low "thanks for telling me. low days count too.", shell day "shell day. see you when you're back."

Habit lines: "`@_^^` water logged. small sips count.", "`@_^^` walk logged. snail pace is a pace.", "`@_--` noted. the code will still be here tomorrow." Unlogging a habit says "`(@)` unlogged. no harm done."; erasing everything says "`(@)` everything is erased. tuck is still here."

Decisions it made:

- Low stimulation is a comfort setting, so it is always in settings and never a shelf unlock.
- Palettes change the screen only; Tuck and the mood colors stay the same.
- Okay has no art yet, so the prototype uses `tuck-hero.svg` for it.
- Settings say "Tuck is a check-in buddy, not a therapist, and gives no medical advice."

Where it differs from the Today brief: the habits are water, a short walk and "screens off by 11" (the brief has water, walk, sleep and break, with weekly counts), and the unlock card and insight live on their own tabs instead of on Today. The prototype notes say no landing page exists yet; the landing page design canvas does exist, but the live waitlist page (due Oct 30) and app landing page (due Nov 13) are not built, so first run carries the landing page's promise in the meantime.

## Planning docs

Besides the Tuck the Snail Sketches canvas, five Claude Docs, two design canvases and three preview pages build on this character:

| Doc or canvas | What it covers |
| --- | --- |
| Content Brief: Habit Tracker Without Streaks | A 1,800–2,200 word SEO pillar guide for "habit tracker without streaks": titles, meta description, outline, FAQ, keywords, links, schema and competitive notes |
| Topic Cluster: Habits Without Streaks | Nine supporting articles around the pillar (missed a day, streak anxiety, terminal habit tracker, private mood tracker, restart after a bad week, ADHD, Streaks alternatives, printable, how long habits take), with a cluster diagram, publishing order from Nov 2 and internal links |
| Content Brief: What Happens If You Miss a Day of a Habit? | The first cluster article, 1,200–1,500 words, due Nov 2; answer first, then the study's own numbers, then what to do the next day |
| Product Strategy: Shellday Studio | Vision, the big bet, three pillars (Rest counts, Your data stays home, One snail everywhere), risks, roadmap horizons, metrics and assumptions |
| Campaign Plan: Shell Days Launch | An 8-week, $300 launch of Tuck Check-in (Oct 26 – Dec 20, 2026; launch Tue Nov 17), goal 1,000 first check-ins; now includes the cluster articles in the calendar, all assets built from the design system, and links to every related doc |
| Tuck Check-in Landing Page (design canvas) | Hero with the check-in screen, "0 day streak" vs "12 days you showed up", three benefit cards, a tuckshell terminal section, newsletter sign-up and a 988 footer, built with the design system and Tuck's real SVGs; updated to the current palette |
| [Tuck Palette Proposal](https://claude.ai/artifact/1RgdTsEMhXVRthyrUzDcyE) (page) | The six contrast-checked palette changes, with before and after views; now applied to the design system (values in `design-palettes/proposed-tokens.json`) |
| [Tuck Palette Variants](https://claude.ai/artifact/7hdPhpW9b1FCZoGCY3htyt) (page) | The five Round 5 palettes, light and dark, each shown as a check-in card and a terminal |
| [Tuck Check-in Prototype](https://claude.ai/artifact/HNXv9FujCUsQJMJNEziD7F) (page) | The clickable v0.1 phone prototype: first run, today, check in, insights, shelf and settings |
| Shellday Home Pages (design canvas) | Five responsive home page layouts (classic split, terminal first, check-in first, editorial story, bento grid) plus all five at 390px, built from the current design system's components and Tuck's real SVGs |

Key facts behind them:

- A UCL study found an average of 66 days to habit automaticity, and missing one opportunity did not significantly affect habit formation. The study recruited 96 people, 82 finished, and individuals ranged from 18 to a predicted 254 days. Very inconsistent people did not form habits.
- "Never miss twice" comes from James Clear's "Avoid the Second Mistake."
- Search results for "what happens if you miss a day of a habit" are mostly short personal posts plus one long guide from a competing app (Habit Doom), so it is the easiest first article.
- The FTC's 2024 Health Breach Notification Rule update covers health apps outside HIPAA and treats unauthorized sharing as a breach.
- The strategy has no user interviews yet; most assumptions are marked unproven.

## Next steps

- [ ] Claim the handles and domain for the chosen names
- [ ] Run a USPTO search in Classes 9 and 41
- [ ] Turn Trail Tuck into the 16×12 pixel sprite set for the first web game (Round 2 size)
- [ ] Approve or revise the eight new expressions and the three Tuck versions, then add the final art to the design system's mascot assets
- [ ] Decide whether the weekly look-back inside Tuck Check-in is called Reflect & Realign
- [ ] Send the comic ideas list (the last request ended at "Comics:")
- [ ] Share what's new for the strategy update (research, audience, pillars, timing, metrics)
- [ ] Run 10–15 user interviews before the Nov 17 launch
- [ ] Write "What happens if you miss a day of a habit?" from its brief, for Nov 2
- [x] Recopy the current design system onto the home pages canvas
- [x] Update the landing page to the current palette (shell-color links, deeper selected chip)
- [ ] Wire the landing page buttons ("Try it free", "Join the waitlist")
- [ ] Link `@tuckthesnail` on the landing page and home pages once the handle is claimed
- [ ] Share the landing page and home pages canvases before sending them to anyone
- [ ] Pick one of the five home page layouts (or a mix) to take forward
- [ ] Fill in the tuckshell install command and confirm or rename `tuckshell rest`
- [ ] Design the Today screen from its brief: each state at 390×844, the default also at 1440×900
- [ ] Decide which of the five palette variants to add to the design system as themes, and whether to build high contrast
- [ ] Re-export the editorial story screenshot, which still shows the old dark-mode colors
- [ ] Reconcile the prototype with the Today brief (habit list, where the unlock card and insight live)
- [ ] Draw art for okay `@_oo`, which the prototype covers with the hero pose
- [ ] Confirm the shelf unlocks and the `tuckshell unlock` command

## Sources

- [Tuck.com, LLC trademarks (Justia)](https://trademarks.justia.com/owners/tuck-com-llc-3602428)
- [Tuck.com brand profile (Parse)](https://parse.gl/brands/tuck-com)
- [Sleep Doctor vs tuck (CB Insights)](https://www.cbinsights.com/compare/sleep-doctor-vs-tuck)
- [Can't Tuck Snail (Turbo wiki)](https://turbo.fandom.com/wiki/Can%27t_Tuck_Snail)
- [Snail'sPace (itch.io)](https://yitonghu.itch.io/snailspace)
- [A Snail's Pace (AIE)](https://aie.edu.au/video/a-snails-pace-aie-student-game/)
- [How long does it take to form a habit? (UCL News)](https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit)
- [FTC issues final rule to expand scope of the Health Breach Notification Rule (Inside Privacy)](https://www.insideprivacy.com/health-privacy/ftc-issues-final-rule-to-expand-scope-of-the-health-breach-notification-rule/)
- [Streak Anxiety: Habit Trackers That Forgive (Habit Doom)](https://habitdoom.com/blog/streak-anxiety-habit-trackers)
- [How to form a habit (BPS Research Digest, on Lally et al. 2010)](https://bps.org.uk/research-digest/how-form-habit)
- [Avoid the Second Mistake (James Clear)](https://jamesclear.com/second-mistake)
- [What to Do When You Break a Habit Streak (Habit Doom)](https://habitdoom.com/blog/what-to-do-when-break-habit-streak)
- [When you miss a day (Andrew Nemr)](https://notes.andrewnemr.com/p/when-you-miss-a-day)
- [Show HN: DopaLoop, habit tracker for ADHD brains, local-first, no streaks](https://hn.svelte.dev/item/47314769)
- [dijo, a terminal habit tracker (readme)](https://git.peppe.rs/cli/dijo/tree/readme.md?h=v0.1.5)
