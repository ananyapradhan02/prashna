/* prashna v0.1
   A scripted, question-led dialogue. There is no AI here: every line below was
   written ahead of time, and typed replies are read by keyword matching.
   Prashna never judges an answer; it replies with a follow-up, a hint or an experiment.
   Text inside {braces} is shown in mono (scoreboard figures, fractions). */
(function () {
  "use strict";

  /* ---------- the scripts ---------- */

  var TOPICS = {
    moon: {
      title: "why does the moon change shape?",
      name: "the moon",
      blurb: "a lamp, an orange and your own head are all you need.",
      start: "m1",
      end: "you just worked out something people puzzled over for thousands of years, using a lamp and an orange. now it's your turn. what do you still wonder about the moon? tap 'ask prashna back' and ask me anything.",
      nodes: {
        m1: {
          q: "before i tell you anything, a question for you. think of the last time you noticed the moon. was it a full circle, a thin slice, or something in between?",
          hint: "no need to remember exactly. picture any moon you've seen, maybe on the way home or from a balcony. what shape comes to mind?",
          opts: [
            { t: "a full circle", r: "a full moon. those rise around sunset, often big and orange near the horizon. keep that in your pocket, it's a clue." },
            { t: "a thin slice", r: "a crescent. you usually see those close to where the sun is, just after sunset or just before sunrise. keep that in your pocket, it's a clue." },
            { t: "something in between", r: "a half or a bulging moon. the bulging one has a proper name, gibbous, which sounds like a creature from a storybook. keep that picture in your head." }
          ],
          kw: [
            { k: ["half"], r: "half is a lovely one to spot. strangely, astronomers call it a quarter moon, because the moon is a quarter of the way round its trip. we'll get to that trip." },
            { k: ["full", "round", "circle", "complete"], opt: 0 },
            { k: ["thin", "slice", "crescent", "banana", "smile", "nail", "curve"], opt: 1 },
            { k: ["gibbous", "bulg", "between", "almost"], opt: 2 }
          ],
          def: "i'm keeping that picture in mind. every moon you've ever seen is a clue.",
          next: "m2"
        },
        m2: {
          q: "here's something odd. the moon makes no light of its own. so where does the light we see on it come from?",
          hint: "think about what lights up everything during the day. the moon sits in that same sky.",
          opts: [
            { t: "from the sun", r: "the sun it is. sunlight travels out, hits the moon's grey dust and bounces down to your eyes. so at any moment, half the moon is lit and half is dark, like a ball in a spotlight." },
            { t: "from the earth", r: "partly, and that's a sharp thought. earth does bounce a little light onto the moon: on a thin crescent night you can sometimes see the dark part glowing faintly. that's called earthshine. but the main lamp is far bigger: the sun. half the moon is always in sunlight, like a ball in a spotlight." },
            { t: "it glows by itself", r: "lots of people think that. but if it glowed like a bulb, it would glow all over, all the time, and never look like a slice. the light comes from the sun, bouncing off the moon's grey dust. half the moon is always lit, like a ball in a spotlight." }
          ],
          kw: [
            { k: ["star"], r: "stars do shine by themselves, and our sun is a star. that's the one lighting the moon: sunlight bounces off the moon's grey dust and down to you. half the moon is always lit, like a ball in a spotlight." },
            { k: ["sun", "sunlight"], opt: 0 },
            { k: ["earth", "reflect"], opt: 1 },
            { k: ["glow", "itself", "own", "fire", "bulb"], opt: 2 }
          ],
          def: "here's the idea to test: the light comes from the sun, bouncing off the moon's grey dust. so half the moon is always lit, like a ball in a spotlight.",
          next: "m3"
        },
        m3: {
          q: "so the sun always lights half of the moon. then why don't we see a full circle every night?",
          hint: "think about where you are standing compared to the lit half. if a friend faces a lamp, can you always see their lit-up face?",
          opts: [
            { t: "earth's shadow covers part of it", r: "that's one of the most common ideas, and a good one to test instead of just believing me.", go: "m3s" },
            { t: "clouds block part of it", r: "clouds do hide the moon, but in messy blobs that drift about. phases have a neat curved edge that changes a little each night, even when the sky is clear. so something else is going on. let's find it with your hands." },
            { t: "we see it from a different angle each night", r: "that's a big idea. let's test it with your own hands." }
          ],
          kw: [
            { k: ["shadow"], opt: 0 },
            { k: ["cloud"], opt: 1 },
            { k: ["angle", "side", "position", "move", "moving", "orbit", "around", "round", "rotat", "spin", "turn", "view"], opt: 2 }
          ],
          def: "hold on to that idea. let's test it with your own hands.",
          next: "m4"
        },
        m3s: {
          q: "at full moon, the sun, earth and moon are roughly in a line, with earth in the middle. if earth's shadow made the phases, would a full moon be bright or dark?",
          hint: "the shadow points away from the sun. at full moon, which side of earth is the moon on?",
          opts: [
            { t: "dark, the shadow would fall on it", r: "and yet the full moon is the brightest night of the month. so the shadow idea runs into trouble. usually the line-up is a little tilted and the shadow misses. when it lines up exactly, the shadow does land on the moon: that's a lunar eclipse, a chandra grahan, and it happens only a few times a year." },
            { t: "bright", r: "bright, the brightest night of the month. so the shadow can't be what makes the phases every month. when the line-up is exact, the shadow does land on it: that's a lunar eclipse, a chandra grahan, only a few times a year." },
            { t: "i'm not sure", r: "here's the surprise: the full moon is the brightest night of the month, so the shadow can't be making the phases. when the line-up is exact, the shadow does land on it: that's a lunar eclipse, a chandra grahan, only a few times a year." }
          ],
          kw: [
            { k: ["dark", "black", "shadow"], opt: 0 },
            { k: ["bright", "light", "full"], opt: 1 }
          ],
          def: "here's the surprise: the full moon is the brightest night of the month, so the shadow can't be making the phases. when the line-up is exact, the shadow does land on it: that's a lunar eclipse, a chandra grahan.",
          next: "m4"
        },
        m4: {
          q: "try this, now or tonight. you need a lamp or a phone torch on a table, a ball or an orange, and a dark room. face the lamp and hold the ball at arm's length, right in front of the light. how much of the ball's lit side can you see?",
          hint: "the lamp lights the side of the ball that faces the lamp. which side of the ball is facing you?",
          opts: [
            { t: "none, it looks dark", r: "that's a new moon. the lit half faces the sun, away from you. in this experiment you are the earth, the lamp is the sun and the ball is the moon." },
            { t: "just a thin edge", r: "a thin edge is a crescent, a day or two past new moon. in this experiment you are the earth, the lamp is the sun and the ball is the moon." },
            { t: "i can't try it right now", r: "no problem, picture it instead. the lit half faces the lamp, away from you, so the ball looks dark. that's a new moon. you are the earth, the lamp is the sun. try it for real tonight." }
          ],
          kw: [
            { k: ["cant", "later", "tonight", "no lamp", "no torch", "dont have"], opt: 2 },
            { k: ["none", "dark", "nothing", "black", "no light"], opt: 0 },
            { k: ["edge", "thin", "little", "bit", "sliver", "crescent"], opt: 1 }
          ],
          def: "whatever you saw, remember it. in this experiment you are the earth, the lamp is the sun and the ball is the moon.",
          next: "m5"
        },
        m5: {
          q: "now turn slowly to your left, keeping the ball at arm's length, until the lamp is behind you. hold the ball a little high so your head doesn't block the light. what happens to the lit part as you turn?",
          hint: "watch the line between light and dark on the ball. does it stay put, or does it slide?",
          opts: [
            { t: "it grows", r: "it grows: a crescent, then half, then almost a full circle when the lamp is behind you. astronomers call the growing part waxing. keep turning and it shrinks again, which is waning." },
            { t: "it shrinks", r: "if it shrank, you may have turned right instead of left, and that's fine. keep going all the way round and you'll see both: growing, called waxing, and shrinking, called waning." },
            { t: "it stays the same", r: "watch the edge between light and dark while you turn really slowly. it slides across the ball. that slide is the whole secret." }
          ],
          kw: [
            { k: ["full", "round", "circle"], r: "a full circle when the lamp is behind you: that's a full moon. on the way there it grew: crescent, half, almost round. astronomers call that waxing." },
            { k: ["grow", "bigger", "more", "increas", "wax"], opt: 0 },
            { k: ["shrink", "smaller", "less", "decreas", "wane", "waning"], opt: 1 },
            { k: ["same", "nothing", "doesnt change", "no change"], opt: 2 }
          ],
          def: "hold on to what you saw. as you turn, the lit part and the dark part trade places.",
          next: "m6"
        },
        m6: {
          q: "so what is actually moving in the sky to make the moon change shape?",
          hint: "in your experiment, what did you move: the lamp, or the ball around your head?",
          opts: [
            { t: "the moon, going round the earth", r: "the moon travels once round earth in about a month, and each night we see a little more or a little less of its sunlit half. the word month even comes from moon." },
            { t: "earth's shadow", r: "remember the full moon puzzle: the brightest night of the month comes when earth is between the sun and moon. in your experiment you moved the ball round your head. that's the moon going round earth, about once a month." },
            { t: "the sun", r: "the sun seems to cross the sky each day, but that's earth spinning. in your experiment the lamp stayed still and the ball went round your head. that's the moon going round earth, about once a month." }
          ],
          kw: [
            { k: ["shadow"], opt: 1 },
            { k: ["moon", "orbit", "round", "around", "ball"], opt: 0 },
            { k: ["sun", "lamp"], opt: 2 }
          ],
          def: "in your experiment the lamp stayed still and the ball went round your head. that's the moon going round earth, about once a month. each night we see a different slice of its sunlit half.",
          next: "m7"
        },
        m7: {
          q: "last one, and it's a thinker. a thin crescent sits close to the sun in the sky. so when would you look for one: in the middle of the night, or just after sunset or before sunrise?",
          hint: "if the moon is close to the sun in the sky, it rises and sets close to when the sun does.",
          opts: [
            { t: "just after sunset or before sunrise", r: "that's where to look: low in the sky, near where the sun has just gone down or is about to come up. go and check this week." },
            { t: "in the middle of the night", r: "here's a clue to test: a crescent sits close to the sun, so it sets not long after the sun does. by midnight it has usually gone. the moon high up at midnight is closer to full. go and check this week." },
            { t: "any time", r: "it depends how close to the sun it is. a thin crescent sets soon after the sun, so look low in the west just after sunset. go and check this week." }
          ],
          kw: [
            { k: ["sunset", "evening", "dusk", "sunrise", "morning", "dawn", "early"], opt: 0 },
            { k: ["midnight", "night", "late"], opt: 1 },
            { k: ["any"], opt: 2 }
          ],
          def: "look low in the sky just after sunset or just before sunrise, near the sun. go and check this week.",
          next: "end"
        }
      },
      bank: [
        { k: ["orange", "red", "yellow", "horizon", "colour", "color"], a: "near the horizon, moonlight passes through much more air to reach you. air scatters away blue light and lets orange and red through, the same reason sunsets look orange. higher up, the moon looks white again. what colour is it tonight?" },
        { k: ["daytime", "day time", "in the day", "during the day", "morning", "afternoon"], a: "yes, you can see the moon in the daytime on many days of the month, pale and white in the afternoon sky. it's easiest to spot when it's about half lit. look for it on your way home from school this week." },
        { k: ["how far", "distance", "far away", "kilometre", "km"], a: "about three lakh eighty-four thousand kilometres, on average. light covers that in just over one second. driving there at highway speed would take around five months, with no chai stops." },
        { k: ["follow"], a: "it's so far away that when you move a few kilometres in a car, your angle to it barely changes. nearby trees whizz past, but the moon seems to stay put, so it looks like it's following you. try it with a far-off hill next time." },
        { k: ["dark side", "same side", "same face", "other side", "back side", "far side"], a: "we always see the same face of the moon, because it spins exactly once each time it goes round earth. the far side isn't dark, though. it gets sunlight too, during our new moon. we just never see it from here." },
        { k: ["eclipse", "grahan"], a: "a lunar eclipse, or chandra grahan, happens when the sun, earth and moon line up exactly and earth's shadow falls on the moon. it can turn a coppery red. it only happens at full moon, and only a few times a year, because the moon's path is slightly tilted." },
        { k: ["chandrayaan", "isro", "land", "astronaut", "walk on", "visit", "go to the moon"], a: "people first walked on the moon in nineteen sixty-nine. in august twenty twenty-three, isro's chandrayaan-3 landed near the moon's south pole, the first mission to land in that region. what would you look for if you went?" },
        { k: ["crater", "spot", "patch", "rabbit", "hare", "face", "grey", "gray", "mark"], a: "the dark patches are huge plains of old, cooled lava. the round dents are craters, made by rocks crashing into it, and with no wind or rain they last for billions of years. many people in india see a rabbit in the patches, which is why one name for the moon is shashank. what do you see?" },
        { k: ["bigger", "big", "size", "supermoon", "small", "huge"], a: "the moon's path is a slightly squashed circle, so sometimes it's closer and looks a little bigger: a supermoon. but the giant moon near the horizon is mostly a trick of your brain. hold a coin at arm's length next to it, then again when it's high. same size. try it." },
        { k: ["tide", "sea", "ocean", "beach"], a: "the moon's gravity tugs on earth's oceans and pulls the water into a slight bulge. that's why the sea at a beach like juhu or marina rises and falls about twice a day. the sun helps a little too." }
      ],
      samples: ["why does the moon look orange sometimes?", "can you see the moon in the day?", "what are the dark patches on the moon?"]
    },

    plant: {
      title: "how does a plant drink?",
      name: "plants",
      blurb: "a glass of water, a drop of ink and a stick of celery.",
      start: "p1",
      end: "you just traced water from the soil to the sky, through a plant with no mouth, no heart and no pump. your turn. what do you still wonder about plants? tap 'ask prashna back' and ask me anything.",
      nodes: {
        p1: {
          q: "you drink with your mouth. a plant doesn't have one. so where do you think water gets into a plant?",
          hint: "think about what happens when someone waters a pot of tulsi. where does the water go?",
          opts: [
            { t: "through the roots", r: "the roots, mostly. each root is covered in tiny hairs, thinner than the hair on your head, and together they soak up water from the soil." },
            { t: "through the leaves", r: "a good idea to test instead of just believing me.", go: "p1s" },
            { t: "through the stem", r: "the stem is where water travels, like a pipe, but it gets in lower down, through the roots. each root is covered in tiny hairs that soak up water from the soil." }
          ],
          kw: [
            { k: ["root", "soil", "ground", "mud", "bottom"], opt: 0 },
            { k: ["leaf", "leaves"], opt: 1 },
            { k: ["stem", "trunk", "pipe", "stalk"], opt: 2 }
          ],
          def: "here's the usual answer, so you can test it: mostly through the roots, which are covered in tiny hairs that soak up water from the soil.",
          next: "p2"
        },
        p1s: {
          q: "leaves can take in a tiny bit of water, like dew. here's a way to test how much. if you watered only the leaves of a potted plant for a week and kept the soil dry, what do you think would happen?",
          hint: "picture a plant on a hot balcony with dry soil but wet leaves. would it look happy?",
          opts: [
            { t: "it would stay fresh", r: "try it with a plant nobody minds about and see. most people who test it find the plant droops, because very little water gets in through leaves. the roots do the real drinking, with tiny hairs that soak up water from the soil." },
            { t: "it would droop", r: "that's what most people who test it see, because very little water gets in through leaves. the roots do the real drinking, with tiny hairs that soak up water from the soil." }
          ],
          kw: [
            { k: ["fresh", "fine", "ok", "healthy", "alive", "happy", "grow"], opt: 0 },
            { k: ["droop", "wilt", "die", "dry", "sad", "dead"], opt: 1 }
          ],
          def: "most people who test it find the plant droops, because very little water gets in through leaves. the roots do the real drinking.",
          next: "p2"
        },
        p2: {
          q: "so water comes in at the roots. but a coconut tree can be taller than a five-storey building. how does water get all the way to the top, with no heart to pump it?",
          hint: "have you ever drunk through a straw? where does the pulling happen, at the top or at the bottom?",
          opts: [
            { t: "something pulls it up from the top", r: "that's the big one. water escapes from the leaves at the top, and that pulls the rest up behind it, a bit like sipping through a very long straw. we'll test it in a minute." },
            { t: "the roots push it up", r: "roots do push a little, which is why a freshly cut stump can ooze water. but that push can't reach the top of a tall tree. most of the work is a pull from the top, like sipping through a very long straw." },
            { t: "i'm not sure", r: "here's a clue: think of a straw. the pull happens at the top. in a plant, water escapes from the leaves, and that pulls the rest up behind it." }
          ],
          kw: [
            { k: ["pull", "suck", "top", "leaves", "straw", "sun", "evaporat"], opt: 0 },
            { k: ["push", "root", "pressure", "pump"], opt: 1 }
          ],
          def: "hold that idea. most scientists describe it as a pull from the top: water escapes from the leaves and pulls the rest up behind it, like sipping through a very long straw.",
          next: "p3"
        },
        p3: {
          q: "here's an experiment for tonight. put a stick of celery, or a white flower like a rose or a chrysanthemum, in a glass of water with a few drops of food colour or ink. what do you think you'll see tomorrow morning?",
          hint: "if the water is moving up the stem, where would the colour end up?",
          opts: [
            { t: "the colour climbs into it", r: "that's the prediction to test. if the water is climbing, the colour rides along, and you'll see coloured lines in the stalk or tinted petals. cut the celery across and look for coloured dots: those are the pipes." },
            { t: "nothing will change", r: "that's a real prediction, and the experiment will settle it. if water is climbing, you'll see coloured lines or tinted petals. tell a grown-up your prediction before you check." },
            { t: "the water level will drop", r: "sharp. mark the water level with a pen before bed and check in the morning. the missing water went up the stem, and much of it escaped from the leaves into the air." }
          ],
          kw: [
            { k: ["level", "less water", "drop", "lower", "gone"], opt: 2 },
            { k: ["colour", "color", "ink", "blue", "red", "pink", "petal", "line", "stain"], opt: 0 },
            { k: ["nothing", "same", "no change"], opt: 1 }
          ],
          def: "write your prediction on a piece of paper before bed. a prediction you've written down is much more fun to check.",
          next: "p4"
        },
        p4: {
          q: "leaves have tiny holes on their underside, too small to see, called stomata. water escapes through them as vapour. on a hot, dry afternoon in may, what do you think a plant does?",
          hint: "if you were losing water fast on a hot day, what would you want to do with your windows?",
          opts: [
            { t: "it loses loads of water", r: "it can, which is why plants droop on hot afternoons. a big tree can let out buckets and buckets of water in a single day. so many plants partly close their holes to save water." },
            { t: "it closes its holes", r: "many do. each hole has two little guard cells that can close it, like a pair of lips. closing saves water, but it also slows the pull that brings water up." },
            { t: "it drinks more", r: "it tries to. the faster water escapes from the leaves, the harder it pulls from the roots. if the soil runs dry, the plant can't keep up and it droops. many plants partly close their holes to save water." }
          ],
          kw: [
            { k: ["droop", "wilt"], r: "a droop is the plant's way of showing it's losing water faster than it can pull it up. many plants partly close their holes on hot afternoons to save water." },
            { k: ["close", "shut"], opt: 1 },
            { k: ["lose", "loses", "escape", "evaporat", "sweat", "dry"], opt: 0 },
            { k: ["drink", "more water", "pull", "thirst"], opt: 2 }
          ],
          def: "here's what happens: water escapes faster on a hot day, so the plant pulls harder, and if it can't keep up, it droops. many plants partly close their holes to save water.",
          next: "p5"
        },
        p5: {
          q: "picture the water inside a stem as a long line of tiny beads, all holding hands. when one bead escapes from a leaf, what happens to the one behind it?",
          hint: "if the first person in a line holding hands takes a step forward, what happens to the next person?",
          opts: [
            { t: "it gets pulled up", r: "it gets pulled up, and the one behind that, all the way down to the roots. water sticks to itself surprisingly well. that stickiness is also why a drop of water holds its round shape on a leaf." },
            { t: "nothing happens", r: "if nothing happened, the water would stay put and the leaves would dry out. water sticks to itself surprisingly well, so when one bead leaves, it tugs the next one up, all the way down to the roots." },
            { t: "it falls down", r: "gravity does pull it down, that's the tug of war. but water sticks to itself surprisingly well, so when one bead leaves, it tugs the next one up. in most plants, the tug from the top wins." }
          ],
          kw: [
            { k: ["pull", "up", "follow", "move", "next", "takes its place", "replace"], opt: 0 },
            { k: ["fall", "down", "drop", "gravity"], opt: 2 },
            { k: ["nothing", "stay", "same"], opt: 1 }
          ],
          def: "water sticks to itself surprisingly well, so when one bead leaves a leaf, it tugs the next one up, all the way down to the roots.",
          next: "p6"
        },
        p6: {
          q: "so a plant sips a bit like you sip through a straw. what do you think happens if you cut a flower and leave it out of water for an hour before putting it in a vase?",
          hint: "what happens to a straw if air gets into it?",
          opts: [
            { t: "it drinks normally", r: "often it struggles. air gets into the cut end and breaks the line of beads, like a bubble in a straw. that's why flower sellers cut stems again, sometimes under water, before putting them in a vase. try it with two flowers and compare." },
            { t: "air gets in and it struggles", r: "air gets into the cut end and breaks the line of beads, like a bubble in a straw. that's why flower sellers cut stems again, sometimes under water, before putting them in a vase. try it with two flowers and compare." },
            { t: "it dies straight away", r: "not straight away, but it may droop sooner. air gets into the cut end and breaks the line of beads, like a bubble in a straw. flower sellers cut stems again, sometimes under water, to fix it. try it with two flowers and compare." }
          ],
          kw: [
            { k: ["air", "bubble", "struggle", "block"], opt: 1 },
            { k: ["die", "dead", "droop", "wilt"], opt: 2 },
            { k: ["normal", "fine", "ok", "same"], opt: 0 }
          ],
          def: "here's what usually happens: air gets into the cut end and breaks the line of beads, like a bubble in a straw. try it with two flowers and compare.",
          next: "p7"
        },
        p7: {
          q: "last one. in the monsoon the air is heavy and wet. do you think plants pull water up faster or slower on a humid monsoon day than on a hot, dry day?",
          hint: "wet clothes dry quickly on a hot, dry day. how fast do they dry in the monsoon?",
          opts: [
            { t: "faster", r: "think of washing on the line. in the monsoon it takes forever to dry, because the air is already full of water. leaves are the same: less water escapes, so the pull is gentler and slower." },
            { t: "slower", r: "slower. the air is already full of water, so less escapes from the leaves, just like washing that won't dry in the monsoon. less escaping means a gentler pull." },
            { t: "about the same", r: "think of washing on the line. in the monsoon it takes forever to dry, because the air is already full of water. leaves are the same: less water escapes, so the pull is gentler." }
          ],
          kw: [
            { k: ["slow", "less"], opt: 1 },
            { k: ["fast", "quick", "more"], opt: 0 },
            { k: ["same"], opt: 2 }
          ],
          def: "think of washing on the line in the monsoon. the air is already full of water, so less escapes from the leaves, and the pull is gentler.",
          next: "end"
        }
      },
      bank: [
        { k: ["green", "chlorophyll", "colour", "color"], a: "leaves are green because of chlorophyll, a pigment that catches sunlight to make food. it soaks up red and blue light and bounces green back to your eyes." },
        { k: ["night", "sleep", "dark"], a: "most plants close most of their leaf holes at night, because there's no sunlight to make food with, so they pull much less water. roots keep soaking a little, which is why you sometimes see drops on the tips of grass at dawn." },
        { k: ["too much", "overwater", "drown", "lots of water", "too little"], a: "yes, a plant can get too much. roots need air as well as water. in soggy soil the air spaces fill up, the roots can't breathe, and they start to rot. that's why pots have a hole at the bottom." },
        { k: ["cactus", "desert"], a: "a cactus stores water in its thick stem, has spines instead of wide leaves so less water escapes, and many open their holes mainly at night, when it's cooler. it's built to waste nothing." },
        { k: ["salt", "sea water", "seawater", "ocean"], a: "most plants can't drink sea water; the salt pulls water out of the roots instead of in. but mangroves, like the ones in the sundarbans, manage it. some filter salt out at the roots, and some push it out through their leaves." },
        { k: ["eat", "food", "hungry", "photosynthesis"], a: "plants make their own food from air, water and sunlight. they take in carbon dioxide through the same tiny leaf holes and use sunlight to turn it and water into sugar. the oxygen you breathe is left over from that." },
        { k: ["how much", "litre", "liter", "amount"], a: "it depends hugely on the plant and the weather. a tulsi pot on a sunny balcony might need a glass or so a day in summer, and a big tree moves buckets and buckets. almost all of it escapes from the leaves; only a tiny bit stays inside the plant." },
        { k: ["feel", "pain", "alive", "hurt"], a: "plants are alive and they sense things: light, touch, gravity, even a lack of water, and they respond. but they have no brain or nerves, so as far as scientists can tell, they don't feel pain the way you do." },
        { k: ["fall", "autumn", "yellow", "bare"], a: "many trees drop their leaves to save water in the dry season: no leaves means no leaf holes losing water. then new leaves burst out when water is easier to find." },
        { k: ["light", "bend", "lean", "towards", "upward"], a: "stems grow towards light, and roots grow downwards, following gravity and water. put a potted plant near a window for a week and watch it lean. then turn the pot round and watch it lean back." }
      ],
      samples: ["can a plant drink too much water?", "do plants drink at night?", "why are leaves green?"]
    },

    cricket: {
      title: "fractions in a cricket over",
      name: "cricket",
      blurb: "six balls, one scoreboard and a sneaky decimal point.",
      start: "c1",
      end: "you just found out a cricket scoreboard is secretly a fractions machine. your turn. what do you wonder about cricket, or the numbers in it? tap 'ask prashna back' and ask me anything.",
      nodes: {
        c1: {
          q: "an over has six balls. kavya has bowled two balls of her over. what fraction of the over is done?",
          hint: "a fraction is a part over a whole. what's the part here, and what's the whole?",
          opts: [
            { t: "two sixths", r: "two out of six. here's the fun bit: two sixths is the same amount as one third. split six balls into three equal groups and each group is two balls." },
            { t: "one third", r: "one third. how did you get there? if you split six balls into three equal groups, each group is two balls, so two balls is one of those three groups. two sixths and one third are the same amount." },
            { t: "two", r: "two balls is the count. to turn it into a fraction, put it over the whole over: two out of six. that's the same amount as one third, because six balls split into three groups gives groups of two." }
          ],
          kw: [
            { k: ["2/6", "two six", "two-six", "2 out of 6", "two out of six"], opt: 0 },
            { k: ["1/3", "third"], opt: 1 },
            { k: ["two", "2"], opt: 2 }
          ],
          def: "here's one way to think about it: two balls out of six is two sixths, which is the same amount as one third.",
          next: "c2"
        },
        c2: {
          q: "on tv the scoreboard says {12.4} overs. what do you think the {.4} means?",
          hint: "remember, an over only has six balls. could the number after the dot ever reach nine?",
          opts: [
            { t: "four balls into the next over", r: "four balls into the thirteenth over. so it isn't really a decimal at all. it's a count of balls, dressed up as a decimal. sneaky." },
            { t: "four tenths of an over", r: "that's exactly how a normal decimal works, so it's the obvious guess. let's test it.", go: "c2s" },
            { t: "i'm not sure", r: "it's a count of balls. {12.4} means twelve full overs, plus four balls of the next one. it's written like a decimal, but it isn't one." }
          ],
          kw: [
            { k: ["tenth", "decimal", "point", "0.4"], opt: 1 },
            { k: ["ball", "four", "4"], opt: 0 }
          ],
          def: "here's the trick: {12.4} means twelve full overs and four balls of the next one. it looks like a decimal, but it's a count of balls.",
          next: "c3"
        },
        c2s: {
          q: "if {.4} meant four tenths, then after {12.4} you'd see {12.5}, {12.6}, all the way up to {12.9}. have you ever seen a scoreboard say {12.9}?",
          hint: "count up ball by ball from {12.4}. after {12.5}, what does the scoreboard show next?",
          opts: [
            { t: "no, it goes 12.5, then 13", r: "it goes {12.5}, then {13}. so after five balls, the next ball finishes the over. that means the {.4} is a count of balls, not tenths: four balls out of six." },
            { t: "i'm not sure", r: "next time a match is on, watch it tick. it goes {12.5}, then straight to {13}. so the {.4} is a count of balls, not tenths: four balls out of six." },
            { t: "yes", r: "watch closely next time. it goes {12.5}, then jumps straight to {13}, because an over has six balls. so the {.4} is a count of balls: four out of six." }
          ],
          kw: [
            { k: ["no", "never", "13", "thirteen"], opt: 0 },
            { k: ["yes", "yeah", "maybe"], opt: 2 }
          ],
          def: "it goes {12.5}, then straight to {13}. so the {.4} is a count of balls, not tenths: four balls out of six.",
          next: "c3"
        },
        c3: {
          q: "so {12.4} overs is really twelve and four sixths overs. how would you write four sixths more simply?",
          hint: "can you split four balls and six balls into the same number of equal groups?",
          opts: [
            { t: "two thirds", r: "two thirds. four and six can both be halved, into two and three. so {12.4} overs is twelve and two thirds overs." },
            { t: "it's already simple", r: "try halving both: four becomes two, six becomes three. two thirds is the same amount as four sixths, written with smaller numbers. so {12.4} overs is twelve and two thirds overs." },
            { t: "zero point four", r: "that's the trap the scoreboard sets. four sixths isn't {0.4}; as a decimal it's about {0.67}. halve both numbers and you get two thirds. so {12.4} overs is twelve and two thirds overs." }
          ],
          kw: [
            { k: ["2/3", "two third", "two-third"], opt: 0 },
            { k: ["0.4", ".4", "point four", "zero point"], opt: 2 },
            { k: ["simple", "already", "cant"], opt: 1 }
          ],
          def: "halve both numbers: four sixths becomes two thirds. so {12.4} overs is twelve and two thirds overs.",
          next: "c4"
        },
        c4: {
          q: "meera hits {18} runs off one full over. how many runs is that per ball, on average?",
          hint: "share eighteen runs equally across six balls.",
          opts: [
            { t: "3", r: "three runs a ball on average: eighteen shared equally across six balls. in real life she might have hit two sixes, a four, a two and two dots. but on average, it's three." },
            { t: "18", r: "eighteen is the total for the over. per ball, share it across six balls: three runs a ball on average. she might have hit two sixes, a four, a two and two dots, but on average it's three." },
            { t: "6", r: "six runs off every ball would add up to thirty-six. share eighteen across six balls and it's three a ball, on average." }
          ],
          kw: [
            { k: ["18", "eighteen"], opt: 1 },
            { k: ["3", "three"], opt: 0 },
            { k: ["6", "six"], opt: 2 }
          ],
          def: "share eighteen runs across six balls: three runs a ball, on average.",
          next: "c5"
        },
        c5: {
          q: "a team has {96} runs after {12} overs. commentators call runs per over the run rate. what's their run rate?",
          hint: "how many runs, shared across how many overs?",
          opts: [
            { t: "8", r: "eight runs an over: ninety-six shared across twelve overs. keep that up for twenty overs and they'd make one hundred and sixty." },
            { t: "12", r: "twelve is the number of overs. share ninety-six runs across twelve overs and you get eight runs an over. keep that up for twenty overs and they'd make one hundred and sixty." },
            { t: "96", r: "ninety-six is the total so far. run rate shares it out: ninety-six across twelve overs is eight runs an over. keep that up for twenty overs and they'd make one hundred and sixty." }
          ],
          kw: [
            { k: ["96", "ninety"], opt: 2 },
            { k: ["12", "twelve"], opt: 1 },
            { k: ["8", "eight"], opt: 0 }
          ],
          def: "ninety-six runs shared across twelve overs is eight runs an over. keep that up for twenty overs and they'd make one hundred and sixty.",
          next: "c6"
        },
        c6: {
          q: "now the tricky one. after {7.3} overs, how many balls has the team faced?",
          hint: "seven full overs of six balls each, plus how many more?",
          opts: [
            { t: "45", r: "forty-five: seven full overs is forty-two balls, plus three. you just beat the scoreboard's decimal trap." },
            { t: "73", r: "that's what you'd get if {7.3} were a normal decimal. count it out: seven full overs is forty-two balls, plus three more, so forty-five." },
            { t: "43", r: "close. seven overs of six is forty-two, then three more balls. count them on your fingers: forty-three, forty-four, forty-five." }
          ],
          kw: [
            { k: ["45", "forty-five", "forty five"], opt: 0 },
            { k: ["73", "seventy"], opt: 1 },
            { k: ["43", "forty-three", "forty three"], opt: 2 },
            { k: ["42", "forty-two", "forty two"], r: "forty-two is the seven full overs. add the three balls of the next one and you get forty-five." }
          ],
          def: "seven full overs is forty-two balls, plus three more: forty-five.",
          next: "c7"
        },
        c7: {
          q: "try this at home. next time a match is on, pick one over and write each ball as a fraction as it happens: {1/6}, {2/6}, {3/6} and so on. which of those can be written more simply?",
          hint: "which of them have a top and bottom you can both halve, or both split into thirds?",
          opts: [
            { t: "2/6, 3/6, 4/6 and 6/6", r: "two sixths is one third, three sixths is one half, four sixths is two thirds, and six sixths is one whole over. one sixth and five sixths stay as they are. that's a whole fractions lesson hiding in one over." },
            { t: "all of them", r: "most of them can. two sixths is one third, three sixths is one half, four sixths is two thirds, and six sixths is one whole over. one sixth and five sixths can't get any simpler." },
            { t: "none of them", r: "try halving. two sixths is one third, three sixths is one half, four sixths is two thirds, and six sixths is one whole over. only one sixth and five sixths stay as they are." }
          ],
          kw: [
            { k: ["none", "no"], opt: 2 },
            { k: ["all", "every"], opt: 1 },
            { k: ["half", "2/6", "3/6", "4/6", "6/6", "third", "whole"], opt: 0 }
          ],
          def: "two sixths is one third, three sixths is one half, four sixths is two thirds, and six sixths is one whole over. one sixth and five sixths stay as they are.",
          next: "end"
        }
      },
      bank: [
        { k: ["six balls", "why six", "6 balls", "eight ball", "8 ball", "how many balls"], a: "overs haven't always had six balls. over the years they've had four, five, six and even eight. australia used eight-ball overs until the late nineteen seventies, and six became the rule everywhere after that." },
        { k: ["maiden"], a: "a maiden over is one where the batting side scores no runs off the bat. six balls, zero runs. bowlers love them." },
        { k: ["decimal", "dot", "point"], a: "the dot is just a separator: overs on the left, balls on the right. it's like a clock showing {2.45}, which doesn't mean two point four five hours either." },
        { k: ["strike rate"], a: "a batter's strike rate is runs per hundred balls. forty runs off thirty-two balls is a strike rate of one hundred and twenty-five. can you see how?" },
        { k: ["economy"], a: "a bowler's economy is the runs they give away per over. twenty-four runs in four overs is an economy of six." },
        { k: ["rain", "duckworth", "dls", "target"], a: "when rain shortens a match, a method called dls, named after three people, resets the target, based on how many overs and wickets each side has left. it's fractions and percentages all the way down: the monsoon's gift to maths." },
        { k: ["wide", "no ball", "no-ball", "noball", "extra"], a: "a wide or a no-ball gives the batting side a run and doesn't count as one of the six balls, so the bowler has to bowl it again. that's how an over can end up with seven, eight or more deliveries." },
        { k: ["what is a fraction", "fraction"], a: "a fraction is a part out of a whole. in cricket the whole is usually an over, six balls. three balls is three sixths of an over, which is the same as one half." },
        { k: ["average"], a: "a batting average is total runs divided by the number of times the batter got out. it's a share: runs shared across dismissals." },
        { k: ["pitch", "22 yards", "how long", "length"], a: "a cricket pitch is twenty-two yards long, a little over twenty metres. that old unit is called a chain." },
        { k: ["run rate"], a: "run rate is runs divided by overs. but careful with the scoreboard: {10.3} overs is ten and a half overs, not ten point three." }
      ],
      samples: ["why does an over have six balls?", "what is a strike rate?", "what happens with a wide?"]
    }
  };

  var ORDER = ["moon", "plant", "cricket"];

  var GENERAL = [
    { k: ["who are you", "are you a robot", "are you ai", "are you an ai", "are you real", "are you human", "chatgpt", "are you a computer", "are you a person"], a: "i'm prashna, a set of questions and answers written ahead of time by a person. i don't look things up and i don't learn from you. when i don't have an answer, i save your question as a wonder instead of guessing." },
    { k: ["why do you ask", "so many questions", "just tell me", "why questions"], a: "because your own guess, even a wild one, makes the real answer stick. scientists work the same way: a question first, then a test." },
    { k: ["wonder list", "what is a wonder"], a: "a wonder is a question i couldn't answer. i keep them on the wonder list on the home page, so you can take them to a teacher, a library book or a grown-up. some of the best questions don't have easy answers." },
    { k: ["your name", "prashna mean", "does prashna", "what is prashna"], a: "prashna means question. it comes from sanskrit, and you'll hear it in hindi, kannada, marathi and other indian languages too." }
  ];

  var WONDER_REPLY = "i don't have an answer written down for that one, and i'd rather not guess. so it's going on your wonder list. take it to a teacher, a library book or a grown-up, or find a way to test it yourself. questions like this are the best kind.";

  var BACK_LINES = ["now, back to my question: ", "good one. my question is still waiting: ", "back to where we were: "];

  /* ---------- storage ---------- */

  var KEY = "prashna.v1";
  function blank() { return { qDays: {}, total: 0, wonders: [], progress: {}, sessions: {} }; }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var d = JSON.parse(raw);
      var b = blank();
      for (var k in b) if (!(k in d)) d[k] = b[k];
      return d;
    } catch (e) { return blank(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }
  var data = load();

  /* ---------- dates ---------- */

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function shortDate(key) { var p = key.split("-"); return p[2] + "." + p[1] + "." + p[0].slice(2); }
  function prevDay(key) { var p = key.split("-"); var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setDate(d.getDate() - 1); return dayKey(d); }
  function streak() {
    var d = dayKey();
    if (!data.qDays[d]) d = prevDay(d);
    var n = 0;
    while (data.qDays[d]) { n++; d = prevDay(d); }
    return n;
  }

  /* ---------- text helpers ---------- */

  function norm(s) {
    return " " + String(s).toLowerCase().replace(/[‘’']/g, "").replace(/[^a-z0-9\/.\- ]+/g, " ").replace(/\s+/g, " ").trim() + " ";
  }
  // keywords match at the start of a word ("crater" finds "craters");
  // short ones (three characters or fewer) must be the whole word, so "no" never finds "not"
  function has(text, kw) {
    var from = 0, i;
    while ((i = text.indexOf(" " + kw, from)) !== -1) {
      if (kw.length > 3) return true;
      var after = text.charAt(i + 1 + kw.length);
      if (!/[a-z0-9]/.test(after)) return true;
      from = i + 1;
    }
    return false;
  }
  function hasAny(text, list) { for (var i = 0; i < list.length; i++) if (has(text, list[i])) return true; return false; }
  var UNSURE = ["dont know", "i dont know", "idk", "no idea", "not sure", "dunno", "no clue", "pass", "help", "hint", "confused", "i give up"];
  var QWORDS = ["why", "how", "what", "when", "where", "who", "which", "can", "could", "does", "do", "is", "are", "will", "would", "if", "should", "whats", "hows"];
  function looksLikeQuestion(raw) {
    if (raw.indexOf("?") === -1) return false;
    var first = norm(raw).trim().split(" ")[0];
    return QWORDS.indexOf(first) !== -1;
  }
  function lastQuestion(q) {
    // split into sentences without lookbehind (older phone browsers lack it)
    var bits = q.split(/([.?!:]\s+)/), sentences = [];
    for (var j = 0; j < bits.length; j += 2) sentences.push(bits[j] + (bits[j + 1] || "").trim());
    for (var i = sentences.length - 1; i >= 0; i--) if (sentences[i].indexOf("?") !== -1) return sentences[i];
    return q;
  }

  /* ---------- tally ---------- */

  function countQuestion() {
    var d = dayKey();
    data.qDays[d] = (data.qDays[d] || 0) + 1;
    data.total = (data.total || 0) + 1;
    save();
    return data.qDays[d];
  }

  /* ---------- dom: everything is built with textContent, never html strings ---------- */

  function $(id) { return document.getElementById(id); }
  function make(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var el = {
    home: $("home"), chat: $("chat"), topics: $("topics"), wonders: $("wonders"), wCount: $("w-count"),
    today: $("t-today"), total: $("t-total"), streak: $("t-streak"), note: $("t-note"),
    title: $("chat-title"), meta: $("chat-meta"), log: $("log"), opts: $("opts"), form: $("form"),
    say: $("say"), sayLabel: $("say-label"), send: $("send"), ask: $("ask"), askNote: $("ask-note"),
    samples: $("samples"), endRow: $("end-row")
  };

  /* ---------- home ---------- */

  function renderTally() {
    var t = data.qDays[dayKey()] || 0, s = streak();
    el.today.textContent = t;
    el.total.textContent = data.total || 0;
    el.streak.textContent = s + (s === 1 ? " day" : " days");
    if (s > 0 && !t) el.note.textContent = "ask prashna one question today to keep your streak going.";
    else if (!data.total) el.note.textContent = "your streak grows on every day you ask prashna at least one question.";
    else el.note.textContent = "";
  }

  function topicStatus(id) {
    var s = data.sessions[id], p = data.progress[id] || {};
    if (s && !s.done && s.exchange > 0) return "carry on from exchange " + (s.exchange + 1);
    if (p.finished) return "finished " + shortDate(p.finished) + " · try it again";
    return "not started";
  }

  function renderTopics() {
    el.topics.textContent = "";
    ORDER.forEach(function (id) {
      var t = TOPICS[id];
      var b = make("button", "card topic-card");
      b.type = "button";
      b.setAttribute("data-topic", id);
      b.appendChild(make("h3", "", t.title));
      b.appendChild(make("p", "blurb", t.blurb));
      b.appendChild(make("span", "status mono", topicStatus(id)));
      b.addEventListener("click", function () { openTopic(id); });
      el.topics.appendChild(b);
    });
  }

  function renderWonders() {
    var w = data.wonders;
    el.wCount.textContent = w.length;
    $("copy-wonders").hidden = !w.length;
    el.wonders.textContent = "";
    if (!w.length) {
      el.wonders.appendChild(make("p", "empty", "no wonders yet; ask prashna something it can't answer and it will be saved here."));
      return;
    }
    var ul = make("ul", "wonders");
    for (var idx = w.length - 1; idx >= 0; idx--) {
      var x = w[idx];
      var tname = TOPICS[x.topic] ? TOPICS[x.topic].name : "";
      var li = make("li");
      var span = make("span", "w-text", x.text);
      span.appendChild(make("span", "w-meta", shortDate(x.date) + (tname ? " · " + tname : "")));
      var rm = make("button", "w-remove", "×");
      rm.type = "button";
      rm.setAttribute("data-i", idx);
      rm.setAttribute("aria-label", "remove this wonder");
      li.appendChild(span); li.appendChild(rm);
      ul.appendChild(li);
    }
    el.wonders.appendChild(ul);
  }

  function renderHome() { renderTally(); renderTopics(); renderWonders(); }

  el.wonders.addEventListener("click", function (e) {
    var b = e.target.closest(".w-remove");
    if (!b) return;
    data.wonders.splice(+b.getAttribute("data-i"), 1);
    save();
    renderWonders();
  });

  $("copy-wonders").addEventListener("click", function () {
    var text = "my wonder list, from prashna\n\n" + data.wonders.map(function (x) { return "- " + x.text + " (" + shortDate(x.date) + ")"; }).join("\n");
    var btn = this;
    function done() { btn.textContent = "copied"; setTimeout(function () { btn.textContent = "copy the list"; }, 1600); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); done();
    }
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    } catch (e) { fallback(); }
  });

  $("reset").addEventListener("click", function () {
    if (!window.confirm("clear the tally, streak, wonder list and progress on this device?")) return;
    data = blank();
    save();
    renderHome();
  });

  /* ---------- chat ---------- */

  var cur = null; // { id }
  var firstNew = 0; // index of the first log line added by the latest turn

  function session() { return data.sessions[cur.id]; }
  function node() { var s = session(); return TOPICS[cur.id].nodes[s.node]; }
  function push(w, t, m) { session().log.push({ w: w, t: t, m: m || "" }); }

  function openTopic(id, fresh) {
    cur = { id: id };
    var s = data.sessions[id];
    if (fresh || !s || s.done) {
      data.sessions[id] = { node: TOPICS[id].start, exchange: 0, hinted: false, done: false, ask: false, log: [] };
      push("p", TOPICS[id].nodes[TOPICS[id].start].q);
    }
    save();
    el.home.hidden = true;
    el.chat.hidden = false;
    el.title.textContent = TOPICS[id].title;
    renderChat(true);
    window.scrollTo(0, 0);
  }

  function closeChat() {
    cur = null;
    var first = el.home.querySelector(".enter");
    if (first) first.classList.remove("enter"); // one entrance per page, not per visit
    el.chat.hidden = true;
    el.home.hidden = false;
    renderHome();
    window.scrollTo(0, 0);
  }

  // scripted lines may carry {mono} spans; split on them and build text nodes
  function fillText(p, s) {
    var parts = String(s).split(/\{([^}]+)\}/);
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      if (i % 2) p.appendChild(make("span", "mono", parts[i]));
      else p.appendChild(document.createTextNode(parts[i]));
    }
  }

  function renderLog() {
    el.log.textContent = "";
    session().log.forEach(function (x) {
      var li;
      if (x.w === "stamp") {
        li = make("li", "stamp-line");
        li.appendChild(make("span", "stamp", x.t));
      } else {
        li = make("li", x.w);
        li.appendChild(make("span", "who", x.w === "p" ? "prashna" : (x.w === "cq" ? "you asked" : "you")));
        var p = make("p", "text");
        if (x.w === "p") fillText(p, x.t); else p.textContent = x.t;
        li.appendChild(p);
        if (x.m) li.appendChild(make("span", "qmeta mono", x.m));
      }
      el.log.appendChild(li);
    });
  }

  function renderChat(initial) {
    var s = session(), t = TOPICS[cur.id];
    renderLog();
    el.meta.textContent = s.done ? "finished · " + s.exchange + " exchanges" : "exchange " + (s.exchange + 1);
    var asking = s.ask || s.done;
    el.opts.textContent = "";
    el.opts.hidden = asking;
    if (!asking) {
      node().opts.forEach(function (o, i) {
        var b = make("button", "opt", o.t);
        b.type = "button";
        b.addEventListener("click", function () { answer(o.t, i); });
        el.opts.appendChild(b);
      });
    }
    el.sayLabel.textContent = asking ? "your question for prashna" : "or type your own thinking";
    el.say.placeholder = asking ? "ask anything about " + t.name : "type what you think";
    el.send.textContent = asking ? "ask" : "say it";
    el.ask.hidden = s.done;
    el.ask.setAttribute("aria-pressed", s.ask ? "true" : "false");
    el.ask.textContent = s.ask ? "back to prashna's question" : "ask prashna back";
    el.askNote.hidden = s.done;
    el.askNote.textContent = s.ask ? "type your question, or tap one to start from." : "every question you ask counts.";
    el.endRow.hidden = !s.done;
    el.samples.textContent = "";
    el.samples.hidden = !asking;
    if (asking) {
      el.samples.appendChild(make("span", "caption", "not sure what to ask? start from one of these:"));
      t.samples.forEach(function (q) {
        var b = make("button", "pill", q);
        b.type = "button";
        b.addEventListener("click", function () { el.say.value = q; el.say.focus(); });
        el.samples.appendChild(b);
      });
    }
    if (!initial) {
      var items = el.log.querySelectorAll("li");
      var target = items[Math.min(firstNew, items.length - 1)];
      if (target && target.scrollIntoView) target.scrollIntoView({ block: "start" });
    }
  }

  function matchKw(n, text) {
    for (var i = 0; i < (n.kw || []).length; i++) if (hasAny(text, n.kw[i].k)) return n.kw[i];
    return null;
  }

  function advance(to) {
    var s = session(), t = TOPICS[cur.id];
    if (to === "end") {
      s.done = true; s.ask = true;
      push("p", t.end);
      var p = data.progress[cur.id] = data.progress[cur.id] || {};
      p.finished = dayKey();
    } else {
      s.node = to;
      s.hinted = false;
      push("p", t.nodes[to].q);
    }
  }

  function bumpExchange() {
    var s = session();
    s.exchange++;
    var p = data.progress[cur.id] = data.progress[cur.id] || {};
    p.furthest = Math.max(p.furthest || 0, s.exchange);
  }

  function answer(raw, optIndex) {
    var s = session(), n = node();
    firstNew = s.log.length;
    push("c", raw);
    bumpExchange();
    var reply, go = n.next;
    if (optIndex != null) {
      var o = n.opts[optIndex];
      reply = o.r; if (o.go) go = o.go;
    } else {
      var text = norm(raw);
      var m = matchKw(n, text);
      if (!m && hasAny(text, UNSURE) && !s.hinted) {
        s.hinted = true;
        push("p", "here's a hint. " + n.hint + " have another go, or tap one of the ideas below.");
        save(); renderChat();
        return;
      }
      if (m) {
        if (m.opt != null) { reply = n.opts[m.opt].r; if (n.opts[m.opt].go) go = n.opts[m.opt].go; }
        else reply = m.r;
      } else {
        reply = n.def;
      }
    }
    push("p", reply);
    advance(go);
    save();
    renderChat();
  }

  function bankAnswer(raw) {
    var text = norm(raw), best = null, bestScore = 0;
    var pools = [TOPICS[cur.id].bank, GENERAL];
    ORDER.forEach(function (id) { if (id !== cur.id) pools.push(TOPICS[id].bank); });
    pools.forEach(function (pool, pi) {
      pool.forEach(function (e) {
        var score = 0;
        e.k.forEach(function (k) { if (has(text, k)) score += k.indexOf(" ") !== -1 ? 3 : 2; });
        if (score && pi === 0) score += 0.5; // prefer the current topic on ties
        if (score && pi === 1) score += 1;   // "who are you" style questions win outright
        if (score > bestScore) { bestScore = score; best = e; }
      });
    });
    return best;
  }

  function askBack(raw) {
    var s = session();
    firstNew = s.log.length;
    var n = countQuestion();
    push("cq", raw, "question " + n + " today");
    bumpExchange();
    var hit = bankAnswer(raw);
    if (hit) {
      push("p", hit.a);
    } else {
      push("p", WONDER_REPLY);
      push("stamp", "saved to wonders");
      data.wonders.push({ text: raw, topic: cur.id, date: dayKey() });
    }
    if (!s.done) {
      s.ask = false;
      push("p", BACK_LINES[data.total % BACK_LINES.length] + lastQuestion(node().q));
    }
    save();
    renderChat();
  }

  el.form.addEventListener("submit", function (e) {
    e.preventDefault();
    var raw = el.say.value.trim();
    if (!raw || !cur) return;
    el.say.value = "";
    var s = session();
    if (s.ask || s.done || looksLikeQuestion(raw)) askBack(raw);
    else answer(raw, null);
  });

  el.ask.addEventListener("click", function () {
    var s = session();
    s.ask = !s.ask;
    save();
    renderChat(true);
    if (s.ask) el.say.focus();
  });

  $("back").addEventListener("click", closeChat);
  $("another").addEventListener("click", closeChat);
  $("restart").addEventListener("click", function () { if (cur) openTopic(cur.id, true); });
  $("to-wonders").addEventListener("click", function () { if (cur) closeChat(); });

  renderHome();

  // read-only hook for the smoke test
  window.__prashna = { TOPICS: TOPICS };
})();
