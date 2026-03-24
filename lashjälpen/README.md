# LasHjälpen - Läsassistent

A dyslexia-friendly reading assistant for students aged 8-18. Fully client-side, no backend required.

## Setup

```bash
cd lashjälpen
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Features

- **Text-to-Speech** — Read text aloud with word-by-word highlighting, speed control, and Swedish language support (sv-SE default)
- **Speech-to-Text** — Dictate text using the microphone with real-time transcription
- **Dyslexia-friendly typography** — Toggle between OpenDyslexic, Arial, and Verdana fonts. Adjust font size, letter spacing, word spacing, and line height
- **Color overlays** — 8 background color presets (white, cream, yellow, light blue, light green, lavender, peach, dark mode) plus custom color picker
- **Reading ruler** — Semi-transparent colored bar that follows mouse/touch. Adjustable color and height
- **Focus mode** — Highlights the paragraph near the cursor and dims the rest
- **Syllable helper** — Split Swedish words into syllables with alternating colors
- **Word lookup** — Click any word to look up its definition (Free Dictionary API)
- **Settings profiles** — Save and load named profiles. All settings persist via localStorage

## Tech Stack

- React 19 + TypeScript (Vite)
- Tailwind CSS v4
- Web Speech API (TTS + STT, built-in)
- localStorage for persistence

## Project Structure

```
src/
  components/
    TextEditor.tsx       — main text input + display
    TTSControls.tsx      — play/pause/speed/language
    ReadingRuler.tsx     — overlay ruler
    FocusMode.tsx        — blur non-active paragraphs
    SettingsPanel.tsx    — all user preferences
    WordLookup.tsx       — click-to-define popup
    SyllableView.tsx     — syllable toggle button
    STTButton.tsx        — speech to text button
  hooks/
    useTTS.ts           — text-to-speech logic
    useSTT.ts           — speech-to-text logic
    useSettings.ts      — settings state + localStorage
  utils/
    syllables.ts        — Swedish syllable splitting
    wordLookup.ts       — dictionary API calls
  App.tsx               — main layout
  main.tsx
```

## Browser Support

Requires a modern browser with Web Speech API support (Chrome, Edge, Safari). Firefox has partial support for Speech Recognition.
