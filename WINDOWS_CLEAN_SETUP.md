# 🪟 Schone Setup - TeamsWork Dashboard op Windows

Je krijgt de foutmelding omdat er al een TeamsWork folder bestaat. Hier zijn twee opties:

---

## 🧹 Optie 1: Bestaande Folder Vervangen (AANBEVOLEN)

```powershell
# Ga naar je werkmap
cd C:\Users\Gebruiker\TeamsWork\teamswork-docker

# Verwijder de oude TeamsWork folder
rmdir TeamsWork -Recurse -Force

# Clone de nieuwe versie van GitHub
git clone https://github.com/hansanton/TeamsWork.git

# Ga erin
cd TeamsWork
```

---

## 🧹 Optie 2: Oude Folder Behouden

```powershell
# Ga naar je werkmap
cd C:\Users\Gebruiker\TeamsWork\teamswork-docker

# Rename de oude folder
ren TeamsWork TeamsWork-old

# Clone de nieuwe versie
git clone https://github.com/hansanton/TeamsWork.git

# Ga erin
cd TeamsWork
```

---

## ✅ Daarna: Setup Voltooien

```powershell
# 1. Kopieër environment template
copy .env.local.example .env.local

# 2. Open .env.local en vul in
notepad .env.local
```

**Inhoud .env.local:**
```
TICKETING_BASE_URL=https://ticketing-apim-eu.azure-api.net/ticketing/v1
TICKETING_API_KEY=<JOUW_API_KEY>
TICKETING_TIMEZONE=0
```

```powershell
# 3. Installeer dependencies
npm install

# 4. Start de applicatie
npm run dev
```

Open: **http://localhost:3000** 🎉

---

## ⚠️ Let Op

- `rmdir ... -Recurse -Force` verwijdert alles! Back-up eerst als je custom files hebt
- Na `git clone` heb je altijd de nieuwste code van GitHub
- Check of Node.js (`npm --version`) geïnstalleerd is

---

**Klaar voor schone setup!** 🚀
