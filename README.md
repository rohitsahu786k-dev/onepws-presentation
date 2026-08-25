# OnePWS Control Room Interactive Presentation

Interactive product-presentation platform for OnePWS control room and operator-console solutions.

The project combines a modern React experience with presentation export, desktop packaging, visual QA automation, 3D product rendering support and generated narration workflows.

## Highlights

- Interactive React presentation experience
- 3D product visualization with `<model-viewer>`
- Motion and transition system with Framer Motion
- PowerPoint generation using PptxGenJS
- Windows desktop packaging with Electron
- Visual audit tooling for presentation QA
- Cloudinary asset upload workflow
- ElevenLabs narration generation and duration measurement
- TypeScript-first codebase

## Technology

| Area | Stack |
| --- | --- |
| UI | React 19, TypeScript, Vite |
| Motion | Framer Motion |
| 3D | Google Model Viewer |
| Presentation Export | PptxGenJS |
| Desktop | Electron, electron-builder |
| Styling | Tailwind CSS |
| Automation | Node.js scripts, Puppeteer-based visual checks |

## Development

```bash
npm install
npm run dev
```

## Build & Verification

```bash
npm run typecheck
npm run build
npm run audit:visual
```

## Presentation Export

```bash
npm run generate:pptx
```

## Desktop Preview & Packaging

```bash
npm run desktop:preview
npm run dist:win
```

## Narration Workflow

```bash
npm run voiceover:voices
npm run voiceover:generate
npm run voiceover:durations
```

Narration credentials are supplied through local or deployment environment variables and must never be committed to the repository.

## Asset Workflow

Cloudinary-backed assets can be prepared with the included upload scripts:

```bash
npm run assets:upload:dry
npm run assets:upload
```

## Repository Status

This repository contains internal OnePWS presentation assets and implementation details and is intentionally maintained as a private repository.
