# prashna

A question-led learning companion. Prashna asks first: before it explains anything, it asks the child what they think, then builds on the answer with a follow-up question, a hint or a small experiment to try at home. The child can tap an idea, type their own, or tap **ask prashna back** to ask a question of their own.

Part of PRAMAAN, a children's learning lab in Bengaluru.

## who it is for

Students aged 11 to 14, using it on their own on a phone, and the parents who hand them the phone.

## hypothesis

If Prashna leads with a question, an 11 to 14 year old keeps going past the third exchange without an adult.

## what is in v0.1

- Three topics: why does the moon change shape; how does a plant drink; fractions in a cricket over.
- A scripted dialogue per topic: seven main exchanges plus one branch each (for example, "earth's shadow" in the moon topic leads to a side question that tests the idea). Tapped options branch; typed answers are acknowledged by keyword matching; "i don't know" gets a hint instead of an answer.
- Nothing is ever graded. No screen says right, wrong or correct. Prashna replies to the child's thinking, not to a score.
- **ask prashna back**: the child types a question. Prashna answers from a small written bank (about ten likely questions per topic plus a few general ones). If nothing matches, it says so plainly and saves the question to the **wonder list** instead of guessing.
- A questions-asked tally (questions the child asks, not answers they give) and a **curiosity streak**: consecutive days with at least one question asked.
- Progress is saved, so a child can leave in the middle and carry on later.
- Phone-first, light and dark themes.

## what is new in v0.3: voice in, voice out

- A **mic** button next to the typed answer box. Tap it, speak, and the words land in the box. The child can fix them before tapping send; nothing is sent by voice alone.
- A **language switch** for the mic and the voice: english, hindi, kannada, tamil, telugu, marathi, bengali, malayalam (en-IN, hi-IN, kn-IN, ta-IN, te-IN, mr-IN, bn-IN, ml-IN).
- **Read aloud**: Prashna's lines are spoken with the browser's speech voice, picking one that matches the chosen language when the device has it. Off by default; the choice is remembered on the device.
- Honest limit: **the dialogue is still in english.** The language switch changes what the mic listens for and which voice reads aloud, not the words Prashna says. A child speaking kannada will get kannada text in the box, which the english keyword matching will mostly not understand; Prashna then replies with its general follow-up line. The page says this next to the switch.
- Where the browser has no speech recognition (Firefox, some in-app browsers), the mic is hidden and one sentence says to type instead. Typing always works. From `file://`, Chrome may block the mic; the page says so and typing still works.
- **Privacy, plainly.** Prashna stores no audio and sends nothing. But browser speech recognition is not always on the device: Chrome, for example, sends the mic audio to Google's servers to turn it into text. A one-line note under the mic says this so a parent knows before the child uses it. Read-aloud uses the voices installed in the browser or operating system.

**The dialogue is scripted. There is no AI.** Every question, hint, reply and answer was written ahead of time in `app.js`. Typed text is matched against keyword lists. Nothing is sent anywhere: the tally, streak, wonder list and progress live only in the browser's localStorage on that device. No analytics, no accounts, no backend.

## how to open it

- Live: https://ananyapradhan02.github.io/prashna/
- Locally: open `index.html` in any browser (`file:///.../prashna/index.html`). No build step, no server.

## test script (15 minutes with one child, aged 11 to 14)

Hand over the phone with one line: "this asks you questions about the moon, plants or cricket. try it." Then step back and do not help. Note whether they find the mic on their own and whether they fix its words before sending. Note the exchange count in the panel header when they stop.

1. **Where did they stop, and why?** Did they get past exchange three on their own? Ask them afterwards: "what made you stop there?"
2. **Did they ask back?** Did they tap "ask prashna back" without being told? Ask: "was there anything you wanted to ask it?" If they had a question and did not ask it, find out what got in the way.
3. **How did the replies feel?** Ask: "when you gave an answer, did it feel like prashna was marking you, or talking with you?" Watch for the moment a reply felt off or generic (usually a typed answer that fell through to the default line).

## what Ananya should decide after testing

- If most children pass exchange three unaided: the hypothesis holds; invest in more topics.
- If children prefer the mic but speak in their home language: the english-only script is the bottleneck. Decide whether topic two is written in hindi or kannada before adding anything else.
- If read-aloud stays off or gets switched off: keep it off by default and drop voice out from the roadmap.
- If they stall at one to three: the questions are too long or too school-like. Shorten Prashna's lines to one sentence each before adding anything.
- If they rarely tap "ask prashna back": the button is either hidden or the invitation is weak. Try making Prashna end every third line with "what would you ask me?"
- Which of the three topics held attention longest decides the format of topic four.

## contact

- book a call: https://calendly.com/ananyapradhan/30min
- write to ananya: ananyapradhan02@gmail.com

## status

v0.3 · 30.09.26 · live prototype, scripted content, now with voice in and voice out, not yet tested with a child. parents can book a call or write to Ananya from the footer.

## files

`index.html`, `app.js` (scripts and logic), `voice.js` (mic, language switch and read-aloud), `app.css` (project rules), `global.css` (the morning build design system, verbatim), `ROADMAP.md`, `CHANGELOG.md`, `LICENSE` (MIT).
