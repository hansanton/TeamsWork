# 🚀 Push naar GitHub - TeamsWork Dashboard

## Status: Remote toegevoegd ✅

De GitHub repository is klaar:
- **URL:** https://github.com/hansanton/TeamsWork
- **Local remote:** `origin`

## Stap 1: Authenticatie op GitHub

Voor HTTPS push heb je een **Personal Access Token** nodig:

1. Ga naar: https://github.com/settings/tokens
2. Klik "Generate new token" → "Generate new token (classic)"
3. Geef het token deze permissies:
   - ✓ `repo` (alle subopties)
   - ✓ `workflow` (optioneel)
4. Kopieer het token (je ziet het maar 1x!)

## Stap 2: Git Credentials Cache Instellen

Zodat je niet elke keer je token moet invullen:

```bash
git config --global credential.helper osxkeychain
```

## Stap 3: Push naar GitHub

Voer dit commando uit:

```bash
cd "/Users/hansanton.verschoor/App development/TeamsWork"
git push -u origin main
```

**Bij prompt:**
- Username: `hansanton`
- Password: plak je **Personal Access Token** (niet je wachtwoord!)

## Stap 4: Verificatie

Check dat alles geupload is:

```bash
git remote -v
git log --oneline
```

Je zou op GitHub alles moeten kunnen zien:
- https://github.com/hansanton/TeamsWork/commits/main
- https://github.com/hansanton/TeamsWork/blob/main/package.json
- etc.

## Download op Externe PC

Na succesvol pushen kun je op je Windows machine dit doen:

```bash
# Clone de repository
git clone https://github.com/hansanton/TeamsWork.git
cd TeamsWork

# Installeer dependencies
npm install

# Zet .env.local
copy .env.local.example .env.local
# → Vul API credentials in

# Start de app
npm run dev
```

---

**Klaar om te pushen? Let op stap 1 en 2 hierboven!** 🎯
