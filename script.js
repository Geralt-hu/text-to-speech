let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  // Set default voice
  if (voices.length > 0) {
    speech.voice = voices[0];
  }

  // Clear existing options first to prevent duplicates
  voiceSelect.innerHTML = "";

  voices.forEach((voice, i) => {
    // FIX: Use voice.name (singular) and include the language for clarity
    voiceSelect.options[i] = new Option(`${voice.name} (${voice.lang})`, i);
  });
};

voiceSelect.addEventListener("change", () => {
  // This index now correctly maps to the voices array
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});
