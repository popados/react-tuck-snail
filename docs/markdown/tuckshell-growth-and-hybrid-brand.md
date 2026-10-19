# tuckshell past tiny games, and a Tuck + human brand

Oct 17, 2026 · @nik

Two questions: how `tuckshell` grows from small games into help with bigger, harder problems, and how Shellday Studio becomes a hybrid brand where Tuck and a real person share the stage. Both answers keep the project rules: same shell, voice and palette everywhere; games stay free and short; data stays on the device.

## Part 1: tuckshell beyond small games

### The idea in one line

Games stay short, so the complexity goes somewhere else: into tools that help with long, hard work, broken into small steps. Tuck's line already says it: "in here, slow is fine. you build one key at a time."

Think of it as a ladder. Each rung reuses what the one below built.

| Rung | What it is | Why it fits |
| --- | --- | --- |
| 1. Tiny games (now) | Garden crossing, `@` roguelike runs, under 5 minutes | Acquisition and the in-joke |
| 2. Ambient companion | Tuck lives in your prompt, tmux bar or editor status bar and reacts to your day | Cheap to build, seen all day, markets itself |
| 3. Work-rhythm tools | Focus timers, break nudges, end-of-day wrap-ups | The Pillar 1 habits (water, sleep, breaks) where devs already are |
| 4. Hard-problem helpers | Structured "i'm stuck" flows, rubber-duck sessions, long-task check-ins | "Complex problems" without becoming a big game |
| 5. Platform | Plugins, map packs, face packs, seasonal puzzle events | Feeds the 50+ user-made Tuck pieces goal |

### Ideas, by rung

**Ambient companion (rung 2)**

- `tuckshell prompt`: a tiny `@_oo` in the shell prompt that turns `@_--` after midnight and `(@)` on a logged shell day. One line of setup, visible hundreds of times a day.
- Status bar Tuck for VS Code, tmux and Zellij. Same faces, `term-tuck` color, nothing else.
- Failed command reaction: `@_o0 ?  that didn't work. want to try again?` Never sarcastic about the user.

**Work-rhythm tools (rung 3)**

- `tuckshell focus 25`: a timer with `...@_^^` crawling across the bar. When it ends, Tuck asks "water break?", not "time's up!".
- `tuckshell wrap`: at end of day it reads the local `git log`, asks one mood question, and writes a three-line note. Nothing leaves the machine.
- `tuckshell week`: a Sunday look-back in the terminal (the still-water "let's look back. no grades." idea from Check-in).
- Gentle long-session notice: after three hours of activity, `@_-- you've been here a while. so have i. stretch?` Off by default, like all reminders.

**Hard-problem helpers (rung 4)**

This is the answer to "more complex problems". Tuck doesn't solve the problem; he makes it smaller and keeps you company, which matches "help you notice, not fix".

- `tuckshell stuck`: a guided unsticking flow. Tuck asks one question at a time ("what did you expect to happen?", "what's the smallest thing you could check?") and saves the answers to a local note. It's rubber-duck debugging with a snail.
- `tuckshell quest "migrate auth to v2"`: breaks a big task into small trail stones you tick off over days or weeks. No due dates and no overdue state; a quest you leave for a month just says `(@) → @_oo  you're back. here's where we were.`
- `tuckshell sort`: dump a messy list of worries or to-dos, then sort them one at a time into now, later or let go. Useful for overwhelm without making health claims.
- Optional local AI helper (later): if a user brings their own local model, Tuck can summarize a stuck note or suggest a next step. Only local models, opt-in, and Tuck still asks rather than tells. Keep it out of the mood features entirely.

**Platform (rung 5)**

- Plugin hooks: `~/.tuck/plugins/*.sh` and a documented local JSON log, so people can script their own habits and faces. This is the cheapest path to user-made content.
- Map and face packs: community roguelike maps in the `#`, `.`, `~`, `@` set, shared as text files. Shell never changes; only stalks and mouth, per the emotion kit.
- Seasonal "slow puzzles": a December event with one small terminal puzzle a day, each 5 to 10 minutes, that together build a bigger picture (a garden map that fills in). Each day is short and free; the whole thing is a bigger problem. Missing days doesn't lock anything; you can do them in any order.
- Game-jam entries (7DRL, js13kGames) as Tuck-branded puzzles, as the strategy already plans.

### Order to build

Given one maker and one product per quarter, I'd go 2 → 3 → 4 and leave 5 to grow out of the plugin hooks:

1. **With the CLI launch (Q4 2026):** `prompt`, `focus` and `wrap`. Small, demo-able, and they make the three planned terminal clips.
2. **Q1 2027:** `stuck` and `quest`. These are the "bigger problem" story and the best Show HN and r/programming material.
3. **Q2 2027, alongside the first roguelike:** plugin hooks and the first map pack, plus cosmetic unlocks shared with Check-in.
4. **December 2027:** the first slow-puzzle season.

Each tool gets a UTM-tagged "want this on your phone? try Tuck Check-in" line in `--help` and on first run only, so it feeds the 20% signups-from-games-and-CLI target without nagging.

### What not to do

- Don't make a long game. Complexity goes into tools and multi-day puzzle chains, never into a 40-hour run.
- No streaks, overdue states or red text in quests and timers.
- No telemetry beyond the anonymous install count. `stuck` notes and `wrap` notes are the most private things in the product.

## Part 2: a hybrid character + person brand

### Where you already are

The docs already set this up: posts are signed "— tuck & sam", and Sam is "Tuck's human" who speaks in build-in-public updates. What's missing is a clear split of who says what, how the human looks next to Tuck, and a few repeatable formats.

**Decided (Oct 18):** the founder voice uses nik's real name, not the "Sam" pen name. Posts are signed "— tuck & nik" and build-in-public updates open "nik here, tuck's human." The mascot doc and design system still say Sam and need the same swap.

### Who says what

The rule of thumb: Tuck speaks for the product, the human speaks for the company.

| Situation | Who speaks | Why |
| --- | --- | --- |
| In-app and terminal text | Tuck only | The product is his home |
| Comics, social tiles, game posts | Tuck, signed "— tuck & nik" | Character carries shareability |
| Build-in-public, decisions, roadmaps | The human, Tuck reacts with one ASCII face | People trust people for "why" |
| Privacy promises and the privacy page | The human, first person | A promise needs a person who can be held to it |
| Mistakes, outages, data-loss bugs | The human only | A mascot apologizing reads as dodging |
| Crisis and 988 messaging | Neither as a character; plain, calm product text | Tuck never gives clinical advice |
| Changelogs and release notes | The human writes, Tuck adds the last line | Easy duet format |

### Making the human visible without competing with Tuck

- **Draw the human as hands only.** In comics, the human appears as a hand on a keyboard, a mug, or a lamp switch next to Tuck. It keeps Tuck the face of the brand and keeps a real person present. Use `ink` and `sand` from the palette; no new colors.
- **Give the human a text form too.** Tuck is `@`; the human could be the cursor `_`, which the origin comic already uses ("a blinking `_`"). So `@_` reads as Tuck and his human side by side. Use sparingly so it doesn't clash with shy `@_`.
- **The human's shell days are real.** When the founder takes a day off, post it: "nik here. taking a shell day. tuck's minding the garden. (@)". That shows Pillar 1 in practice, which no competitor can copy.

### Repeatable duet formats

1. **"why we built it"** posts: the human explains a decision in three short lines, Tuck's face reacts on the last line. Example: "removed the streak counter today. people said it made them quit after one bad day. — nik" then `@_^^  no streak died.`
2. **Dev log with margin notes:** a weekly newsletter section where the human writes the update and Tuck's ASCII comments appear in the margin.
3. **Live build streams:** the human builds a game or tool live; a `tuckshell` window in the corner reacts to commits and test runs. Clips become short-form video.
4. **Ask the human, ask Tuck:** two-part Q&A posts where product and privacy questions go to the human and "how are you" questions go to Tuck.
5. **Origin comic sequel:** "why nik codes", told in the same four-panel format as "why Tuck codes", so the human's story lives inside Tuck's world.

### Voice rules for the human

Close to Tuck so the brand feels like one place, but clearly a person:

- First person, lowercase on social to match Tuck; normal case on the website, privacy page and press.
- Talk about real numbers and real decisions, including ones that didn't work (the launch postmortem is already planned).
- Same no-claims rule: "notice patterns", never "reduces anxiety".
- No hype, no exclamation pileups, no emoji. The human may say things Tuck can't, like "i was wrong about this."

### Accounts

- `@tuckthesnail` stays the mascot account: comics, game posts, Tuck lines.
- The founder posts from a personal account in build-in-public places (Bluesky, X, Indie Hackers, r/roguelikedev), with "making tuck the snail" in the bio.
- The studio site has one "who makes this" section with the human's name, a hand-drawn portrait in the Tuck style, and the privacy promise in their voice.

### How to tell it's working

- Founder posts link to Tuck content and the reverse, and signup source tracking shows both accounts feeding Check-in.
- User-made content starts including the human too (fan comics with the hand or mug), which counts toward the 50+ goal.
- Survey answers to "why did you try this?" mention trusting the maker, not only the snail.
