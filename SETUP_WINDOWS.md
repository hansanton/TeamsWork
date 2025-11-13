# Setup TeamsWork Dashboard op Windows

Dit document bevat stap-voor-stap instructies om de TeamsWork Ticketing Dashboard op Windows te runnen.

## Optie 1: Docker (Aanbevolen — maar vereist setup)

### Stap 1: Installeer Docker Desktop

1. Download: https://www.docker.com/products/docker-desktop
2. Run installer en volg wizard
3. Herstart Windows (ESC drukken als gevraagd)
4. Open PowerShell en test:

```powershell
docker --version
docker-compose --version
```

Beide moeten versie nummers tonen.

### Stap 2: Zet het project klaar

1. Unzip `teamswork-docker.zip` naar een map, bijv. `C:\Users\YourUser\teamswork`
2. Open PowerShell
3. Navigeer naar de map:

```powershell
cd C:\Users\YourUser\teamswork\TeamsWork
```

### Stap 3: Maak `.env.local` bestand

```powershell
# In PowerShell, in de TeamsWork map
$env_content = @"
NEXT_PUBLIC_TEAMSWORK_API_BASE=https://ticketing-apim-eu.azure-api.net
TEAMSWORK_API_KEY=your_api_key_here
"@

$env_content | Out-File -FilePath ".env.local" -Encoding UTF8
```

Vervang `your_api_key_here` met de echte API-key.

### Stap 4: Start Docker Container

```powershell
# Build en start (eerste keer duurt ~2-3 minuten)
docker-compose up --build

# Daarna alleen starten (veel sneller):
# docker-compose up -d
```

**Verwacht output:**
```
✓ Ready in XXXms
Local: http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

### Stap 5: Stop wanneer klaar

```powershell
# In een ander PowerShell venster (of druk Ctrl+C in het eerste)
docker-compose down
```

---

## Optie 2: Lokale Node.js Installation (Sneller voor development)

Als Docker niet goed werkt, installeer Node.js direct:

### Stap 1: Installeer Node.js

1. Download Node.js LTS: https://nodejs.org/
2. Run installer (default instellingen OK)
3. Herstart PowerShell

Test:
```powershell
node --version
npm --version
```

### Stap 2: Unzip project

Unzip `teamswork-docker.zip` naar `C:\Users\YourUser\teamswork`

### Stap 3: Installeer dependencies

```powershell
cd C:\Users\YourUser\teamswork\TeamsWork

npm install
```

Dit zal ~1 minuut duren en ~500MB instaleren.

### Stap 4: Maak `.env.local`

```powershell
$env_content = @"
NEXT_PUBLIC_TEAMSWORK_API_BASE=https://ticketing-apim-eu.azure-api.net
TEAMSWORK_API_KEY=your_api_key_here
"@

$env_content | Out-File -FilePath ".env.local" -Encoding UTF8
```

### Stap 5: Build en start

```powershell
# Build (eenmalig, ~30 seconden)
npm run build

# Start server
npm run start

# Server draait nu op http://localhost:3000
```

### Stap 6: Stop server

Druk `Ctrl+C` in PowerShell.

---

## Troubleshooting

### "Docker daemon is not running"

**Oorzaak:** Docker Desktop is niet gestart

**Oplossing:**
```powershell
# Start Docker Desktop manual via Start Menu
# Of voer uit in PowerShell (admin):
Start-Service com.docker.service
```

### "Port 3000 is already in use"

**Oplossing:**
```powershell
# Controleer wat op poort 3000 draait
Get-NetTCPConnection -LocalPort 3000 | Get-Process

# Sluit het proces (vervang PID met het nummertje):
Stop-Process -Id <PID> -Force

# Of gebruik een ander poort in docker-compose.yml:
# ports:
#   - "3001:3000"
```

### "npm: command not found"

**Oorzaak:** Node.js niet goed geïnstalleerd

**Oplossing:**
1. Download en installeer Node.js opnieuw: https://nodejs.org/
2. Herstart PowerShell volledig
3. Test: `node --version`

### "EACCES: permission denied" (bij npm install)

**Oorzaak:** Maprechten probleem

**Oplossing:**
```powershell
# Run PowerShell als Administrator

# Wis cache
npm cache clean --force

# Probeer opnieuw
npm install
```

### "Dashboard toont 'Er ging iets mis'"

**Oorzaak:** API key is ongeldig of verkeerd

**Oplossing:**
1. Check `.env.local` bestand — is de API key correct?
2. Open browser DevTools (F12)
3. Ga naar Console tab
4. Kijk naar HTTP errors

### Leaderboard is leeg

**Oorzaak:** Geen tickets met assignee en gesloten status

**Oplossing:**
1. Check TeamsWork API direct in browser:
   ```
   https://ticketing-apim-eu.azure-api.net/ticketing/v1/tickets?limit=10
   ```
   (voeg API key toe in header)

2. Zorg dat er tickets zijn met:
   - `assignee.name` (niet empty)
   - `status` = "Gesloten", "Opgelost", of "Resolved"

---

## Snelle Reference: Commands

```powershell
# Docker Compose
docker-compose up -d              # Start in background
docker-compose down               # Stop alles
docker-compose logs -f app        # Bekijk logs
docker-compose restart            # Herstart
docker-compose up --build         # Rebuild image

# Direct Node.js
npm install                       # Install dependencies
npm run dev                       # Development mode (auto-reload)
npm run build                     # Production build
npm run start                     # Start production server
npm run lint                      # Run ESLint
```

## Welke optie kiezen?

| Optie | Voordeel | Nadeel |
|-------|----------|--------|
| **Docker** | Portable, geen dependencies, production-ready | Iets meer setup |
| **Node.js direct** | Sneller development, simpeler | Minder portable |

**Aanbeveling:** Start met **Optie 2 (Node.js)** als je snel wilt testen. Gebruik **Docker** voor productie/deployment.

---

## Meer Hulp Nodig?

- Controleer `.env.local` — bevat deze een geldige API key?
- Check `package.json` — zijn alle dependencies correct?
- Draait de proxy naar TeamsWork API? Check network tab in DevTools
- Zorg dat poort 3000 vrij is: `netstat -ano | findstr :3000`
