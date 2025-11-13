# 🪟 Windows Quick Start - TeamsWork Dashboard

Je krijgt `git is not recognized` omdat Git nog niet geïnstalleerd is. Hier's hoe je het snel aan de slag krijgt.

---

## ✅ Stap 1: Git Installeren (als nog niet gedaan)

1. Download Git: https://git-scm.com/download/win
2. Run het installer en volg de wizard (standaard opties OK)
3. **Restart PowerShell/CMD** na installatie
4. Test: `git --version` in PowerShell

---

## ✅ Stap 2: Repository Clonen

```powershell
# Ga naar je map
cd C:\Users\Gebruiker\TeamsWork\teamswork-docker

# Clone TeamsWork
git clone https://github.com/hansanton/TeamsWork.git

# Ga in de TeamsWork folder
cd TeamsWork
```

---

## ✅ Stap 3: Environment Variabelen Instellen

```powershell
# Kopieer het template
copy .env.local.example .env.local

# Open .env.local in Notepad
notepad .env.local
```

**Vul in:**
```
TICKETING_BASE_URL=https://ticketing-apim-eu.azure-api.net/ticketing/v1
TICKETING_API_KEY=<JOUW_API_KEY_HIER>
TICKETING_TIMEZONE=0
```

---

## ✅ Stap 4: Dependencies Installeren

```powershell
npm install
```

*(Dit kan 2-3 minuten duren, dat is normaal)*

---

## ✅ Stap 5: Applicatie Starten

### Optie A: Development Mode (met auto-reload)
```powershell
npm run dev
```
→ Open http://localhost:3000 in je browser

### Optie B: Production Build
```powershell
npm run build
npm start
```
→ Open http://localhost:3000 in je browser

---

## 🔧 Troubleshooting

### `npm: The term 'npm' is not recognized`
→ Node.js niet geïnstalleerd. Download hier: https://nodejs.org (LTS versie)

### `TICKETING_BASE_URL is not set`
→ Check dat .env.local correct is ingesteld (zie Stap 3)

### Port 3000 is al in gebruik
```powershell
npm run dev -- -p 3001
```
→ Gebruikt port 3001 i.p.v. 3000

### Build faalt
```powershell
rm node_modules -Recurse
npm install
npm run build
```

---

## 📊 Je Dashboard is Klaar!

Zodra het draait op http://localhost:3000 zie je:
- 📈 Ticket statistieken (open, new, resolved)
- 📊 Trend grafiek
- 👥 Leaderboard top performers
- ⏰ Live klok

**Auto-refresh elke 60 seconden** 🔄

---

## 💡 Tips

- **Achtergrond starten:** Voeg `&` toe: `npm run dev &`
- **Altijd beschikbaar:** Gebruik Task Scheduler (zie SETUP_WINDOWS.md)
- **Docker optie:** `docker-compose up` (als Docker Desktop geïnstalleerd is)

---

**Klaar!** 🚀 Je TeamsWork dashboard draait nu op Windows!
