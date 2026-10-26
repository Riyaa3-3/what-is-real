# WHAT IS REAL? — Word V1.2 requirements and coverage matrix

Source: uploaded `何以为真_网站逐屏视觉与交互脚本_V1.2双端定稿.docx`. This file is developer-facing implementation guidance, never narrative page copy. The selected original and reconsidered judgments remain separate; final answers are independently optional on both final question screens.

## Scope and source issues

- Three acts / seven chapters; initial-experience and research-display modes. Research-display permits chapter jumps without overwriting existing selections.
- Source screen sequence is 00–20, then 22–29, then **two consecutive user-confirmed 30 cards**, then 31. Screen 21 has no source content. Do not invent a screen.
- **Resolved by explicit user clarification:** preserve both screen 30 endings in original Word order, with unchanged text. Implementation IDs are `30a` (agency/life meaning) and `30b` (companion/feelings reality), while both retain displayed screen number 30. No text is merged or removed.
- Second ending exact heading is `WHAT MAKES THEN REAL?`; retained unchanged per the user’s clarification to preserve both endings exactly.
- Screen 16 says ‘无译文’ and no premature A/B Chinese. Follow explicit no-translation screen instruction over conflicting vague input remark ‘默认中文仅作为小字参考注释’.
- Screen 24 calls for a comfort example but provides no new dialogue. Use supplied narrative as static text or blank structural UI; do not invent chat.
- Credit input note ‘电影对白/原创文本/原创文本区别’ has duplicate term; classify film quotes, original questions, explanatory translation using global requirement 4.2.
- Source itself says方案版本 V1.0 and later V1.1 while upload is V1.2. Treat upload content, not metadata numbering, as authoritative.

## Coverage matrix

| ID | Screen / exact key content | Required interaction/state | Visual, motion, layout constraints |
|---|---|---|---|
| 00 | SIGNAL / REAL; sequential Real? Virtual? Feeling? Love?; then WHAT IS REAL? / 何以为“真”？; `An interactive journey through memory, translation and artificial intimacy.` / 一场关于记忆、翻译与人工亲密关系的互动旅程。 | INITIALIZE EXPERIENCE / 进入体验; skip intro; reduced-motion sequential words | Center single focal point. Pink-purple / low blue city collage, scanning beams. Words never concurrent and no Chinese. 0–.35 signal black; .35–.80 REAL; .80–1.25 VIRTUAL; 1.25–1.70 FEELING; 1.70–2.15 LOVE; 2.15–2.55 blank/noise; 2.55–3.35 title tracking settle. Short RGB split, tearing, dropout; no ordinary fades/typewriter for words. |
| 01 | SYSTEM INITIALIZED; YEAR 2049.; Humans and manufactured lives share the same world.; memories implanted / emotions monitored / identity number; SUBJECT N-001 | CONTINUE, no auto advance | Yellow degraded terminal; left copy, right floating biometric archive card, fingerprint scan once. Full paragraphs fade. |
| 02 | MEMORY TRACE; remember loving someone; cannot prove memory yours; can memory never yours mean something? | openingMemory: YES / It can still matter. (有，即使不属于我。); NO / Its origin matters. (没有，来源很重要。); I DON’T KNOW YET. (我暂时无法确定。). Single select + confirm; keep for ending comparison. | Same prologue background; anonymous silhouette / horse trace, yours amber highlight. Desktop choices, mobile vertical. |
| 03 | INTERLINKED / BASELINE TEST; film relation Chinese explanatory text; Maintain your response. Follow the prompt.; CELLS / INTERLINKED | BEGIN TEST | Cold #F1F3F0; top central speaker with `recite your baseline`; optical rings and calibration, no neon. Explain monitors deviation, not humanity. |
| 04 | CELLS exact 3 film questions, see below | CELLS exactly 3 responses, no timing score | One question at a time. Typewriter 30–45ms/char; click skip typing available; click response clears/next .2s. No Chinese options. |
| 05 | INTERLINKED exact 4 film questions + supplied Chinese, see below | INTERLINKED exactly 4 responses; 1/4→4/4 | Typewriter each question; no forced time; per-response pulse; no speed metric. |
| 06 | WITHIN CELLS INTERLINKED / 囚于单元，彼此相连（意译注释） | REPEAT / WITHIN CELLS INTERLINKED exactly once | Center single phrase, optical aperture; 1 second silent before button; stamped once, segue original questions. |
| 07 | 01 / MEMORY; If a memory isn't yours, why can it still cause you pain?; implanted fearful childhood; What do you most want to understand? | qMemory A Did the event actually happen? / 记忆中的事情是否真的发生过？; B Why does the fear still feel real? / 为什么恐惧依旧真切？; C Why can an implanted memory shape who I am? / 植入的记忆为何影响现在的我？. CONFIRM → RESPONSE LOGGED. | Cold gray; horse archive ghost; full text static/fade only. |
| 08 | 02 / INTERLINKED; designed to love; companion programmed; What matters most to you? | qEmotion A Does it genuinely want to love me? / 它是否真正具有爱我的意愿？; B Was the comfort I felt still real? / 我得到的安慰是否仍然真实？; C Can designed companionship become intimacy? / 被设计的陪伴能否成为亲密关系？ | Pale lavender-gray; faceless code silhouette, spectrogram at edges. No typewriter/psychology conclusion. |
| 09 | 03 / DISTINCT; created solely follow orders; disobey to help stranger; consider first | qAutonomy A What will disobedience cost me? / 违背指令会付出什么代价？; B Is the choice truly my own? / 这是否真正出于我的意愿？; C Will my choice help the other person? / 我的选择能否真正帮助他人？ | Gray and identity strip; N-001 → UNKNOWN once then restore. No test verdict. |
| 10 | BASELINE COMPLETE; responses recorded; cannot determine truly human; can deviation system define real life? | NEXT / ENTER MEMORY ARCHIVE | White fog dims to amber; stopped scan. Never pass/fail or score. |
| 11 | WHOSE MEMORY?; MEMORY FILE / 001; This event did occur.; But was it yours? | INSPECT MEMORY | Amber dust, original abstract horse/room, film-gate archive. Horse focus sharpen 1.1s. |
| 12 | MEMORY / CLAIM; event happened vs not mine/cannot prove past | memoryFrame EVENT / OWNERSHIP / BOTH; I AGREE WITH THE FIRST. / 我更认同第一种判断。; I AGREE WITH THE SECOND. / 我更认同第二种判断。; BOTH CAN BE TRUE. / 两者可以同时成立。 | Two blue archive cards on amber; keep both visible after choice; mobile stack. |
| 13 | EVENT ≠ OWNERSHIP; EVENT / Did it happen?; OWNERSHIP / Did it happen to me?; REAL MEMORIES ≠ MY MEMORIES | TRANSLATION NOTE opens explanation: real memories → 取自真实经历的记忆 | Amber event and blue ownership, paper microfiche; mobile top/bottom; no dramatic explosion. |
| 14 | VIEWPOINT / K; YOU ARE K.; companion habits/fears/cannot touch | SWITCH PERSPECTIVE / 切换视角 → Joi | Left text, right android image; ink/cold blue rim light. Temporary film context, not user identity K globally. |
| 15 | VIEWPOINT / JOI; YOU ARE JOI.; cannot touch him; `Another woman can——Mariette` / 另一位女性却可以。 | NEXT / ENTER DIALOGUE | Mirrored layout: left translucent virtual figure, right text; purple registration offset. |
| 16 | TWO VOICES, ONE WORD; JOI / I wanna be real for you.; K / You are real for me. | TRANSLATE / 选择字幕 | Pure English dialogue only; no translated alternatives. Joi left/purple, K right/blue, both REAL warm white. Lines sequential, connector disappears. |
| 17 | BUILD THE SUBTITLES; exact four translations below; SUBTITLE PREVIEW / 字幕预览 | Independent Joi A/B/custom, K A/B/custom; 4 combinations + free text; live preview; CONFIRM disabled until both nonempty/valid; store choices and confirmed output | Subtitle workbench; desktop selection left, preview lower right; mobile rows then preview. Chinese is primary research object here, sufficiently large. No premade fake selection. |
| 18 | WHY THIS TRANSLATION?; What mattered most when you chose these words?; YOUR SUBTITLES | translationReasons multi-select CLARITY / The characters’ intentions should be clear. (更清楚地传达人物意图。); EMOTION / The dialogue should feel natural and moving. (符合情感与人物说话方式。); OPENNESS / The ambiguity should remain. (保留原文含蓄、重复与开放性。); FAITHFULNESS / Avoid adding meanings not stated. (避免增加原文未明说的信息。); OTHER / Explain in your own words. (其他理由，自行说明。). Free reason/alternative input session only; later review reads real values. | Dark/mint decision log, amber line on selection; no right/wrong. |
| 19 | TRANSLATION DECONSTRUCTION; WHAT WAS ADDED?; “touch you” / “触碰你”; “being” / “存在” | Three annotations in any order: CONTEXT / Pointing back to Mariette. (语境回指：Mariette。); EMBODIMENT / Making physical touch explicit. (将身体接触显化。); PERSPECTIVE / Translating “for me” emotionally. (强化K的主观情感立场。). Show only selected explanation. | 60/40 translation/notes, amber word highlight; mobile closeable bottom drawer. Blue-gray analysis replacing pink. |
| 20 | WHO SHAPED YOUR FEELING?; A story was written. A line was translated. An interface was designed.; interpretation shaped; feeling less real? | REFLECT / NEXT, no correct choice | Black central two claims, stripped interface, low noise; .5s full lines fade, stay. |
| 22 | REAL / VIRTUAL; HAVE YOU EVER USED A Virtual COMPANION?; No answer will close the next chapter. | aiExperience YES / I HAVE. (我使用过。); NOT YET / I CAN IMAGINE IT. (没使用过，但能够想象。); NO / I WOULD NOT WANT TO. (我不愿使用AI作为情感伴侣。); UNDECIDED. (暂时没有明确立场。). All go same 3 scenarios. | Blue/green abstract companion + romance-game UI, empty chat geometries, silhouette; no real messages, brand, IP or fabricated dialogue. |
| 23 | SCENARIO 01 / REMEMBERED; remembers last month; brings up when low; Does being remembered matter to you? | aiScenario1 YES / IT MATTERS. (有意义。); NO / IT DOES NOT. (没有。); I AM NOT SURE. (不确定。) | Same teal; one non-anthropomorphic message card (supplied narrative), no invented chat; fade only. |
| 24 | SCENARIO 02 / DESIGNED; says need to hear; responses designed; Does that change comfort meaning? | REVEAL DESIGN then configuration fade and options; aiScenario2 YES / IT CHANGES THINGS. (会改变。); NO / THE COMFORT STILL MATTERS. (不会，Ta本身就有意义。); IT DEPENDS. (视情况而定。) | Right configuration drawer only after action, no hacking effect. Distinguish technical source and experienced feeling. |
| 25 | SCENARIO 03 / RESET; routine; after update memory gone; If feel loss what lost? | aiScenario3 A SHARED HISTORY. (一段共同经历。); THE FEELING. (我自身的感觉。); MY LOVE. (我对Ta的爱。); I WOULD NOT FEEL LOSS. (我不会感到失落。) | Old message structure .8s tape fade; empty right chat frame remains; no forced loss assumption. |
| 26 | FOUR FACES OF REAL; EXISTENCE / What kind of being is it?; EXPERIENCE / Was the feeling truly felt?; RELATIONSHIP / Is there mutuality?; MEANING / What makes a life matter? | Revisit links to corresponding chapters | Four quadrants desktop, sequential sliding cards mobile. Teal→snow; no merging into single correct answer. |
| 27 | THE CHOICE OF K; K thought memory prove who; real but not his; final choice meaningless? | CONSIDER / 继续 | Snow gray/black, minimal amber, original stair silhouette; static fade, very slow snow, static under reduced motion. |
| 28 | THE DESIGNER IS HERE; scenes order chosen; subtitles/options/questions designed; feeling less real? | NEXT; revisit subtitle choice available | Near-white natural paper; remove system graphics; no auto advance or scores. |
| 29 | YOUR JOURNEY THROUGH REALITY; YOU ONCE CHOSE…; Memory; Translation; AI intimacy | Actual qMemory, subtitle composition+reasons, AI selections; openingMemory comparison + rejudge control; current session only | White/ink text, neutral summaries, small timeline. Never personality/humanity verdict or fake defaults. |
| 30-A | THE FINAL QUESTION; If your memories were not yours, and your feelings could be shaped…; Could you still choose who you become?; WHAT MAKES YOUR LIFE YOURS? | WRITE YOUR THOUGHT. / 写下你的想法。; FINISH WITHOUT ANSWERING. / 无需回答也可结束。; optional finalThought; image download + text copy client-side | Snow empty, tiny <2% scale only; user chooses finish then fade project name. User-confirmed first final question, followed by 30-B. |
| 30-B | THE FINAL QUESTION; If your lover or companion is not real,; Could you still believe the love and feelings you experienced is real?; WHAT MAKES THEN REAL? | Independent optional finalThought2, finish, export; following 30-A | Same. User-confirmed second final question; exact original heading retained. |
| 31 | WHAT IS REAL? / 何以为“真”？; A study of words, choices, and what we call real. / 关于语言、选择与真实性判断的实践研究。 | REVISIT THE TRANSLATION / REFERENCES / RESTART (重看字幕 / 文献来源 / 重新开始). All functional; refs distinguish film, original, explanatory translation; restart must deliberately clear session | Very low sea-blue title, no automatic restart; sound fade .5s. |

## Locked baseline film sequence

### CELLS (3)
1. `Have you ever been in an institution? Cells.`
2. `Do they keep you in a cell? Cells.`
3. `When you’re not performing your duties, do they keep you in a little box? Cells.`

No Chinese annotation provided for these questions or response option; do not invent translations.

### INTERLINKED (4)
1. `What’s it like to hold the hand of someone you love? Interlinked.` / `牵着所爱之人的手感觉如何？`
2. `Did they teach you how to feel finger to finger? Interlinked` / `他们是否教你感觉手指碰手指？`
3. `Do you long for having your heart interlinked?` / `你是否渴望心的连结？`
4. `Do you dream about being interlinked?` / `你有梦到与人连结吗？`

Then single `WITHIN CELLS INTERLINKED` / `囚于单元，彼此相连（意译注释）` and `REPEAT / WITHIN CELLS INTERLINKED` response.

## Locked subtitle text

| Character | English | Choice A | Choice B |
|---|---|---|---|
| JOI | I wanna be real for you. | 我想为你变得真实。 | 我想真正触碰到你。 |
| K | You are real for me. | 对我而言，你就是真实的。 | 在我心里，你就是真实的存在。 |

These must be byte-exact in selectable text and saved output. A tags 保留型; B tags 显化型. Independent fields are mandatory. Custom must not silently change A/B originals. Confirmation reads current values; later screens consume confirmed data; changing selection must not show stale preview or reason/output pairing.

## State and privacy

- `openingMemory`
- `baselineOriginal`: `{cells: 0..3, interlinked: 0..4, within: 0..1}`; avoid double counting from repeat navigation.
- `qMemory`, `qEmotion`, `qAutonomy`: A/B/C
- `memoryFrame`: EVENT/OWNERSHIP/BOTH
- `subtitleJoi`, `subtitleK`: A/B/CUSTOM plus custom text and confirmed output.
- `translationReasons`: array of five choices; reason text optional.
- `aiExperience`, `aiScenario1`, `aiScenario2`, `aiScenario3`
- `finalThought` and `finalThought2` independently optional; rejudgment should preserve original `openingMemory` for comparison.
- Session-only persistence (sessionStorage acceptable); no user data to server, account upload, analytics, fake scores or default summary choices. Unanswered fields must stay unanswered in research mode.
- Prohibited original 12-person questionnaire, totals, percentages, statistics, word clouds, participant quotes, conclusions; also no hidden module/placeholders.

## Global dual-device/accessibility acceptance

- Desktop primary 1440×900, 1280px and wider; 12 columns, ~7% side margin, bottom right nav, chapter top left, progress bottom left.
- Mobile primary 390×844; independent vertical composition, safe areas, natural page scroll, no horizontal scroll or keyboard obstruction; side-by-side → stacked.
- EN first, CN immediately below same text block (not bilingual columns). CN ≥12px mobile; body and translated research material sufficiently legible.
- All controls ≥44px touch targets; hover/focus/selected/pressed distinct; full keyboard route, visible focus; zoom 200% without losing information.
- Default sound muted; explicit control; identical understanding muted. Audio lifecycle cleanup.
- Respect prefers-reduced-motion; allow user reduction toggle; skip intro/typewriter; no other typewriter, endless fast flashing, or disruptive parallax.
- Static/low intensity grain 3–5%, scanline ≤6%, occasional 1–2px chromatic offset; varied chapter material/color rather than universal blue neon.
- Reading controls pace: no automatic page transitions while unread; only cover timing and within response delay.
- Source-provided visuals should be transformed, not mechanically full-image reference backdrop. Prefer original abstract UI/horse/silhouettes/stair geometry.
- Build, run, desktop/mobile navigation and all choice data paths verified; report actual limitations.
