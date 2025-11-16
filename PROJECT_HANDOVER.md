# PROJECT_HANDOVER.md – SYNC-HUB

Ce fichier sert à passer le relais entre sessions / agents pour le projet **SYNC-HUB** (Hub de vente IA pour Sync Productions, basé sur Next.js).

---

## 1. Métadonnées projet

- **Nom du projet** : SYNC-HUB
- **Repo Git** : https://github.com/Minot-Prod/SYNC-HUB
- **Plateforme de déploiement** : Netlify (MVP) — Vercel possible plus tard
- **Domaine(s)** : à définir (ex : `sync-hub.syncproductions.fr` ou sous-domaine équivalent)
- **Type de projet** : webapp (dashboard IA de vente)
- **Stack principale** :
  - Next.js 14+ (React 18, React Compiler **activé**)
  - Router utilisé : **/pages** (pas d’App Router)
  - Langage : JavaScript (pas TypeScript)
  - Styling : CSS custom (pas de Tailwind)
  - Alias d’import : `@/*`
  - Hébergement : Netlify (build Next.js standard)

---

## 2. État actuel

- **Dernier commit important (hash + message)** :  
  - À compléter dans Git une fois le premier commit UI fait  
  - Recommandation : tagger `v0.1.0-sync-hub-ui` après première UI stable

- **Branche actuellement déployée en prod** :  
  - Aucune pour l’instant (pas encore lié à Netlify / Vercel)

- **Environnements actifs** :
  - **Local** :
    - Projet Next.js initialisé avec `create-next-app` dans :  
      `C:\Users\maxim\OneDrive\Bureau\repo entreprise\SYNC-HUB`
    - Commande de dev : `npm run dev`
  - **Staging** :
    - Non créé (à prévoir : branche `dev` + site Netlify de preview)
  - **Prod** :
    - Non créé (à prévoir : branche `main` → site Netlify prod)

- **Statut global** :
  - ☑ Prototype (vision + architecture + design system validés)
  - ☐ Bêta
  - ☐ Stable
  - ☐ En refonte

---

## 3. Connexions & intégrations existantes

### GitHub ↔ Plateforme (Netlify / Vercel)

- **GitHub**
  - Repo prévu : `Minot-Prod/SYNC-HUB`
  - `.git` existe déjà (ancien site HTML/CSS remplacé par Next, historique conservé)
- **Netlify** :
  - Non encore relié à ce repo au moment de la passation
  - À faire : connecter `Minot-Prod/SYNC-HUB` à un nouveau site Netlify
- **Vercel** :
  - Option possible plus tard, pas encore configurée

### OpenAI / IA

- Clés OpenAI déjà existantes au niveau compte Max (environnement global)
- **Pour SYNC-HUB** :
  - Aucune variable d’environnement déclarée spécifiquement pour ce projet côté Netlify/GitHub
  - Intégration API prévue Phase 2 (endpoints `/api/*`)

Variables à prévoir (naming recommandé) :

- `OPENAI_API_KEY` (backend uniquement, jamais côté front)
- Éventuellement plus tard : `SYNC_HUB_ENV`, `SYNC_HUB_LOG_WEBHOOK`, etc.

### BDD / Services externes

- Pas de base de données branchée pour le MVP
- Stockage prévu :
  - **MVP** : `localStorage` pour Notes et éventuelle mémoire légère
  - **V2** : Supabase ou équivalent pour persistance multi-device

### Orchestrateurs / Webhooks

- n8n / Make : non branchés à SYNC-HUB pour l’instant
- Webhooks : aucun dédié à cette app au moment de la passation

### Analytics / Logs

- Rien de spécifique à SYNC-HUB encore configuré
- À prévoir plus tard :
  - Analytics léger (Plausible / Umami / autre)
  - Logs côté fonctions (Netlify Functions + console)

---

## 4. Ce qui fonctionne déjà

### 4.1. Base technique Next.js

- Projet Next.js propre créé **dans le dossier SYNC-HUB existant** via :

  ```powershell
  npx create-next-app@latest . `
    --use-npm `
    --js `
    --eslint `
    --src-dir `
    --no-tailwind `
    --no-app `
    --import-alias "@/*" `
    --package-name sync-hub
