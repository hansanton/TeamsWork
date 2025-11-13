# Solid Systems Ticketing Dashboard

Een modern Next.js dashboard voor Solid Systems Customer Service ticketing systeem.

## Features

- 📊 Real-time ticket overview met open/gesloten telling
- 🏆 Leaderboard met top performers
- 📈 Ticket trend charts (7-daags overzicht)
- ⏰ Live clock en geautomatiseerde polling
- 🎨 Solid Systems brand alignment (licht thema met brand kleuren)
- 🌐 Responsive design (desktop/tablet/mobile)
- 🐳 Docker support voor eenvoudige deployment

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR + Axios
- **Charting**: Recharts
- **Containerization**: Docker + Docker Compose

## Quick Start (Local Development)

### macOS / zsh

```bash
# 1) Navigeer naar project
cd "/Users/hansanton.verschoor/App development/TeamsWork"

# 2) Installeer dependencies
npm install

# 3) Start development server
npm run dev

# Server draait op: http://localhost:3000
```

### Build & Production

```bash
npm run build
npm run start
```

## Docker Deployment

### Prerequisites
- Docker en Docker Compose geïnstalleerd

### Option 1: Docker Compose (Recommended)

```bash
# Start container
docker-compose up -d

# Stop container
docker-compose down

# View logs
docker-compose logs -f app
```

### Option 2: Direct Docker

```bash
# Build image
docker build -t teamswork-dashboard:latest .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  teamswork-dashboard:latest
```

App is beschikbaar op [http://localhost:3000](http://localhost:3000)

## Configuration

### Environment Variables

Maak `.env.local` bestand (niet ingecheckt):

```env
# TeamsWork API
NEXT_PUBLIC_TEAMSWORK_API_BASE=https://ticketing-apim-eu.azure-api.net
TEAMSWORK_API_KEY=your_api_key_here
```

### Docker Environment

Bij Docker Compose kun je environment variabelen toevoegen in `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - TEAMSWORK_API_KEY=your_api_key_here
```

## Project Structure

```
TeamsWork/
├── components/              # React components
│   ├── Hero.tsx            # Main stats card
│   ├── Clock.tsx           # Live clock
│   ├── KpiCard.tsx         # KPI metric cards
│   ├── Leaderboard.tsx     # Top performers (resolved tickets)
│   └── TrendChart.tsx      # Ticket trends chart
├── pages/                   # Next.js pages & API routes
│   ├── index.tsx           # Main dashboard
│   └── api/tickets.ts      # Proxy endpoint
├── lib/                     # Utilities
│   └── status.ts           # Status normalization helpers
├── styles/                  # Global styles
│   └── globals.css         # Tailwind + custom brand colors
├── Dockerfile              # Container definition
├── docker-compose.yml      # Multi-container setup
├── package.json            # Dependencies
└── README.md               # This file
```

## Available Scripts

```bash
npm run dev      # Development server (HMR enabled)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## API Integration

De applicatie communiceert met TeamsWork Ticketing API via proxy endpoint `/api/tickets`.

**Status Normalisatie**:
Tickets met volgende statuswaarden worden als "gesloten" beschouwd:
- English: `Resolved`, `Closed`, `Cancelled`
- Dutch: `Gesloten`, `Opgelost`, `Afgesloten`, `Wacht op klant`

## Troubleshooting

### "Er ging iets mis" error
- Verifieer `.env.local` bestand met correcte API key
- Check netwerkconnectie naar TeamsWork API
- Open browser console voor HTTP error details

### Leaderboard is leeg
- Zorg dat tickets een `assignee` hebben
- Controleer dat tickets status "Opgelost" of "Gesloten" hebben

### Docker container start niet
```bash
# Bekijk logs
docker-compose logs app

# Check poort beschikbaarheid
lsof -i :3000

# Rebuild image
docker-compose up --build
```

## Performance

- **Bundle Size**: ~222 KB First Load JS
- **Data Polling**: 30 seconden refresh interval
- **Docker Image**: ~200 MB (production optimized)
- **Health Check**: Container health monitoring ingebouwd

## Notes

- API-key wordt veilig opgeslagen in `.env.local` (niet in git)
- Proxy endpoint (`pages/api/tickets.ts`) cacht korte tijd om rate-limits te sparen
- Alle timestamps zijn UTC (timezone=0)
- Dashboard is full-screen optimized (kiosk mode)
