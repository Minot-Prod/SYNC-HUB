# Deployment Playbook — SYNC-HUB

## 1. Plateforme
- Netlify
- GitHub (public, template activé)

## 2. Build
- sans build (site statique)
- publish dir: \.\

## 3. Secrets
- OPENAI_API_KEY
- ANTHROPIC_API_KEY

## 4. Rollback
- git revert <sha>
- ou rollback depuis Netlify Deploys
