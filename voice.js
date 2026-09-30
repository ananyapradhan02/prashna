/* prashna v0.3: voice in, voice out
   Uses the browser's own Web Speech API. Prashna stores no audio and sends nothing.
   The dialogue stays in english; the language switch changes what the mic listens
   for and which voice reads prashna's lines aloud.
   Loaded before app.js; app.js calls window.prashnaVoice.speak(lines). */
(function () {
  "use strict";

  var LANGS = [
    ["en-IN", "english"], ["hi-IN", "हिन्दी · hindi"], ["kn-IN", "ಕನ್ನಡ · kannada"], ["ta-IN", "தமிழ் · tamil"],
    ["te-IN", "తెలుగు · telugu"], ["mr-IN", "मराठी · marathi"], ["bn-IN", "বাংলা · bengali"], ["ml-IN", "മലയാളം · malayalam"]
  ];
  var KEY = "prashna-voice";

  function load() {
    var d = { lang: "en-IN", speak: false };
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && typeof o === "object") {
          if (LANGS.some(function (l) { return l[0] === o.lang; })) d.lang = o.lang;
          d.speak = o.speak === true;
        }
      }
    } catch (e) {}
    return d;
  }
  var prefs = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {} }

  function $(id) { return document.getElementById(id); }
  var mic = $("mic"), micNote = $("mic-note"), langSel = $("voice-lang"), speakBtn = $("speak"),
      speakNote = $("speak-note"), say = $("say");

  /* ---------- language switch ---------- */
  LANGS.forEach(function (l) {
    var o = document.createElement("option");
    o.value = l[0];
    o.textContent = l[1];
    langSel.appendChild(o);
  });
  langSel.value = prefs.lang;
  langSel.addEventListener("change", function () {
    prefs.lang = langSel.value;
    save();
    stopListening();
  });

  /* ---------- voice in ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var rec = null, listening = false, base = "";

  function setMic(on) {
    listening = on;
    mic.setAttribute("aria-pressed", on ? "true" : "false");
    mic.textContent = on ? "stop" : "mic";
    mic.setAttribute("aria-label", on ? "stop listening" : "answer with your voice");
  }
  function micMessage(text) { micNote.textContent = text; }
  var PRIVACY = "your browser may send what the mic hears to its maker (google, in chrome) to turn it into words. prashna itself keeps no audio.";

  function stopListening() {
    if (rec && listening) { try { rec.stop(); } catch (e) {} }
    setMic(false);
  }

  if (!SR) {
    mic.disabled = true;
    mic.hidden = true;
    micMessage("this browser cannot listen for speech, so type your answer instead.");
  } else {
    micMessage(PRIVACY);
    mic.addEventListener("click", function () {
      if (listening) { stopListening(); return; }
      try {
        rec = new SR();
        rec.lang = prefs.lang;
        rec.interimResults = true;
        rec.continuous = false;
        rec.maxAlternatives = 1;
      } catch (e) {
        mic.disabled = true;
        micMessage("the mic could not start here, so type your answer instead.");
        return;
      }
      base = say.value.trim();
      rec.onresult = function (ev) {
        var text = "";
        for (var i = 0; i < ev.results.length; i++) text += ev.results[i][0].transcript;
        say.value = (base ? base + " " : "") + text.trim();
      };
      rec.onerror = function (ev) {
        var why = ev && ev.error;
        if (why === "not-allowed" || why === "service-not-allowed") {
          micMessage("the mic is blocked on this page. allow it in the browser, or type instead.");
        } else if (why === "no-speech") {
          micMessage("prashna did not hear anything. tap mic and try again, or type.");
        } else if (why === "network") {
          micMessage("the browser's speech service is not reachable right now, so type instead.");
        } else if (why !== "aborted") {
          micMessage("the mic stopped. tap it to try again, or type.");
        }
        setMic(false);
      };
      rec.onend = function () {
        setMic(false);
        if (say.value.trim()) { say.focus(); }
      };
      try {
        rec.start();
        setMic(true);
        micMessage("listening… tap stop when you are done. you can fix the words before you send.");
      } catch (e) {
        setMic(false);
        micMessage("the mic could not start here, so type your answer instead.");
      }
    });
  }

  /* ---------- voice out ---------- */
  var synth = window.speechSynthesis;
  var canSpeak = !!(synth && window.SpeechSynthesisUtterance);

  function pickVoice(lang) {
    var voices = [];
    try { voices = synth.getVoices() || []; } catch (e) {}
    var want = lang.toLowerCase(), short = want.split("-")[0], exact = null, near = null;
    for (var i = 0; i < voices.length; i++) {
      var vl = String(voices[i].lang || "").replace("_", "-").toLowerCase();
      if (vl === want && !exact) exact = voices[i];
      else if (vl.split("-")[0] === short && !near) near = voices[i];
    }
    return exact || near;
  }

  function renderSpeak() {
    speakBtn.setAttribute("aria-pressed", prefs.speak ? "true" : "false");
    speakBtn.textContent = prefs.speak ? "read aloud: on" : "read aloud: off";
  }

  if (!canSpeak) {
    speakBtn.hidden = true;
    speakNote.textContent = "this browser cannot read prashna's lines aloud. " + speakNote.textContent;
  } else {
    renderSpeak();
    try { synth.getVoices(); } catch (e) {}
    speakBtn.addEventListener("click", function () {
      prefs.speak = !prefs.speak;
      save();
      renderSpeak();
      if (!prefs.speak) { try { synth.cancel(); } catch (e) {} }
    });
  }

  function speak(lines) {
    if (!canSpeak || !prefs.speak || !lines || !lines.length) return;
    try {
      synth.cancel();
      var voice = pickVoice(prefs.lang);
      lines.forEach(function (t) {
        var u = new SpeechSynthesisUtterance(String(t).replace(/[{}]/g, ""));
        u.lang = prefs.lang;
        if (voice) u.voice = voice;
        u.rate = 0.95;
        synth.speak(u);
      });
    } catch (e) {}
  }

  function quiet() {
    stopListening();
    if (canSpeak) { try { synth.cancel(); } catch (e) {} }
  }

  window.prashnaVoice = { speak: speak, quiet: quiet, supported: { listen: !!SR, speak: canSpeak } };
})();
