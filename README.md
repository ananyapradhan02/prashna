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

**The dialogue is scripted. There is no AI.** Every question, hint, reply and answer was written ahead of time in `app.js`. Typed text is matched against keyword lists. Nothing is sent anywhere: the tally, streak, wonder list and progress live only in the browser's localStorage on that device. No analytics, no accounts, no backend.

## how to open it

- Live: https://ananyapradhan02.github.io/prashna/
- Locally: open `index.html` in any browser (`file:///.../prashna/index.html`). No build step, no server.

## test script (15 minutes with one child, aged 11 to 14)

Hand over the phone with one line: "this asks you questions about the moon, plants or cricket. try it." Then step back and do not help. Note the exchange count in the panel header when they stop.

1. **Where did they stop, and why?** Did they get past exchange three on their own? Ask them afterwards: "what made you stop there?"
2. **Did they ask back?** Did they tap "ask prashna back" without being told? Ask: "was there anything you wanted to ask it?" If they had a question and did not ask it, find out what got in the way.
3. **How did the replies feel?** Ask: "when you gave an answer, did it feel like prashna was marking you, or talking with you?" Watch for the moment a reply felt off or generic (usually a typed answer that fell through to the default line).

## what Ananya should decide after testing

- If most children pass exchange three unaided: the hypothesis holds; invest in more topics and in voice (the next roadmap item).
- If they stall at one to three: the questions are too long or too school-like. Shorten Prashna's lines to one sentence each before adding anything.
- If they rarely tap "ask prashna back": the button is either hidden or the invitation is weak. Try making Prashna end every third line with "what would you ask me?"
- Which of the three topics held attention longest decides the format of topic four.

## status

v0.1 · 29.09.26 · live prototype, scripted content, not yet tested with a child.

## files

`index.html`, `app.js` (scripts and logic), `app.css` (project rules), `global.css` (the morning build design system, verbatim), `ROADMAP.md`, `CHANGELOG.md`, `LICENSE` (MIT).
