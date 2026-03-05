# Katrine Funnel Dashboard

Visuelt overblik over funnels, salgsdata og Money Model for KroniskSmertefriFysioterapi.

## Quick Start (lokal udvikling)

```bash
npm install
npm run dev
```

Åbn http://localhost:5173

## Deploy til Netlify

### Option A: Netlify CLI
```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

### Option B: Git-baseret deploy
1. Push dette projekt til et GitHub/GitLab repo
2. Gå til [app.netlify.com](https://app.netlify.com)
3. "Add new site" → "Import an existing project"
4. Vælg dit repo
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Deploy

## Opdatering af data

Al data ligger i `src/App.jsx`. Søg efter de relevante tal og opdater direkte.

### Nøgle-sektioner at opdatere:
- **KPI-tal** i toppen af hver funnel-komponent
- **FunnelStep metrics** — de konkrete tal i hvert trin
- **MoneyModel** — omsætningstal per produktniveau
- **Status-badges** — skift mellem `"active"`, `"paused"`, `"missing"`

## Tech Stack
- Vite 5
- React 18
- Ingen eksterne UI-libraries (ren inline CSS)
