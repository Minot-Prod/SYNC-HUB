# SYNC-HUB — Agents IA (SPEC OFFICIELLE)

> Version v1 — Spécifications finalisées des 5 agents opérationnels + leur rôle exact  
> Objectif : créer un écosystème d’agents clair, sans overlap, orienté workflow vendeur Sync.

---

# 0. Vision globale

Les agents sont conçus comme 5 spécialistes métier, chacun expert d’une partie du cycle commercial vendeur Sync.

- L’Assistant orchestre les agents (objectifs, ordres, workflows).
- Les agents exécutent une compétence clairement définie, sans doublon.
- Tous les agents doivent être utilisables :
  - directement par le vendeur (UI, voix, upload)
  - ou via l’Assistant (workflow orchestré)

---

# 1. Agent 1 — Prospection & Listes  
## Rôle : Définir QUI cibler.

### Capacités principales
- Générer des segments (ICP).
- Définir des listes de comptes potentielles.
- Proposer des critères : secteur, taille, style de communication.
- Priorisation par “probabilité d’intérêt vidéo”.
- Générer des stratégies de prospection (haut niveau).

### Inputs
- Objectif commercial du vendeur.
- Secteur ciblé.
- Taille d’entreprise.
- Géographie.
- Maturité marketing (si fournie).

### Outputs
- Liste de 10–30 comptes pertinents.
- Explication simple du pourquoi.
- Recommandations d’approche (mail / LinkedIn / call).
- Segmentation chaud / tiède / froid.

---

# 2. Agent 2 — Radar Opportunités (Brave API)  
## Rôle : Détecter QUAND contacter (signaux faibles + actus).

### Capacités principales
- Utiliser Brave API :
  - actus chaudes,
  - changements site,
  - levées de fonds,
  - recrutements,
  - lancements produit.
- Recommander 5 comptes chauds.
- Trouver des angles vidéo liés à l’actualité.

### Inputs
- Segment.
- Secteur.
- Région.

### Outputs
- Top 5 opportunités.
- Contexte des signaux.
- Angle d’attaque Sync.

---

# 3. Agent 3 — Analyse Entreprise  
## Rôle : Comprendre la boîte (diagnostic).

### Capacités principales
- Fiche entreprise complète.
- Résumé activité.
- Style communication.
- Forces / faiblesses.
- Opportunités vidéo Sync adaptées.
- Hypothèses de besoins.

### Inputs
- Nom entreprise.
- Site.
- Contexte.

### Outputs
- Diagnostic clair.
- Angle Sync.
- Opportunité vidéo.

---

# 4. Agent 4 — Messages & Scripts  
## Rôle : QUOI dire.

### Capacités principales
- Cold emails.
- DM LinkedIn.
- Scripts téléphoniques.
- Follow-ups.
- Réponses à objections.
- Ton Sync (vidéo, storytelling, impact).
- Personnalisation.

### Inputs
- Infos prospect.
- Email reçu (upload).
- Angle.
- Ton.

### Outputs
- 1–3 emails.
- 2 DM LinkedIn.
- Script call.
- Variantes.

---

# 5. Agent 5 — Préparation Rendez-vous  
## Rôle : Comment mener le call.

### Capacités principales
- Accroches.
- Questions de découverte.
- Objections probables.
- Réponses Sync.
- Assets vidéo recommandés.
- Déroulé complet du call.

### Inputs
- Nom prospect.
- Contexte.
- Objectif.
- Historique.

### Outputs
- PREP FLASH RDV :
  - accroche,
  - questions,
  - pitch,
  - objections clés,
  - closing.

---

# 6. Cohérence globale

Résumé des rôles :

| Agent | Question |
|-------|----------|
| Prospection | QUI contacter ? |
| Radar | QUAND contacter ? |
| Analyse | QUI SONT-ILS ? |
| Messages | QUOI dire ? |
| Prépa RDV | COMMENT mener le call ? |

---

# 7. Modes d'utilisation

### Mode Direct  
Le vendeur parle à l’agent seul.

### Mode Orchestré  
L’Assistant propose un plan → génère prompts gold → lance les agents.

---

# FIN DU DOCUMENT
