// src/lib/storage/jsonStore.js

// Palier A : données d\'opportunités hardcodées en JS.
// En Palier B, on branchera une vraie base (Supabase).

const opportunities = [
  {
    id: "opp-001",
    title: "Audit complet des scripts de vente",
    client: "Agence Lumen",
    stage: "prospecting",
    valueCAD: 3500,
    probability: 0.4,
    owner: "Max",
    source: "LinkedIn DM",
    nextAction: "Envoyer démo vidéo Sync GPT Hub",
    nextActionDate: "2025-11-20",
    tags: ["prospection", "SaaS", "agence"],
    updatedAt: "2025-11-15T10:00:00.000Z",
  },
  {
    id: "opp-002",
    title: "Formation IA pour équipe commerciale",
    client: "Studio Nord",
    stage: "proposal",
    valueCAD: 5800,
    probability: 0.6,
    owner: "Max",
    source: "Referral",
    nextAction: "Relance sur la proposition envoyée",
    nextActionDate: "2025-11-18",
    tags: ["formation", "IA", "B2B"],
    updatedAt: "2025-11-16T09:30:00.000Z",
  },
  {
    id: "opp-003",
    title: "Implémentation Sync Sales Hub",
    client: "Sync Productions",
    stage: "negotiation",
    valueCAD: 12000,
    probability: 0.75,
    owner: "Max",
    source: "Client existant",
    nextAction: "Aligner les KPIs avec la direction",
    nextActionDate: "2025-11-22",
    tags: ["hub", "long-term", "core"],
    updatedAt: "2025-11-16T11:00:00.000Z",
  },
  {
    id: "opp-004",
    title: "Pack scripts + coaching",
    client: "Créateurs FR",
    stage: "won",
    valueCAD: 2100,
    probability: 1.0,
    owner: "Max",
    source: "Instagram",
    nextAction: "Onboarding client dans Notion",
    nextActionDate: "2025-11-19",
    tags: ["closed-won", "coaching"],
    updatedAt: "2025-11-14T15:00:00.000Z",
  },
];

/**
 * Retourne toutes les opportunités.
 */
export function getAllOpportunities() {
  return opportunities;
}

/**
 * Retourne une opportunité par id.
 * @param {string} id
 */
export function getOpportunityById(id) {
  return opportunities.find((opp) => opp.id === id) || null;
}

/**
 * Filtre les opportunités par stage (prospecting, proposal, negotiation, won, lost).
 * @param {string} stage
 */
export function getOpportunitiesByStage(stage) {
  return opportunities.filter((opp) => opp.stage === stage);
}

