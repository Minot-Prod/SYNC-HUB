// src/lib/storage/jsonStore.js

// Palier A : JSON de démonstration, lecture seule.
// En Palier B, on branchera Supabase ici.

const opportunities = require('../../../data/opportunities.json');

/**
 * Retourne toutes les opportunités.
 */
function getAllOpportunities() {
  return opportunities;
}

/**
 * Retourne une opportunité par id.
 * @param {string} id
 */
function getOpportunityById(id) {
  return opportunities.find((opp) => opp.id === id) || null;
}

/**
 * Filtre les opportunités par stage (prospecting, proposal, negotiation, won, lost).
 * @param {string} stage
 */
function getOpportunitiesByStage(stage) {
  return opportunities.filter((opp) => opp.stage === stage);
}

module.exports = {
  getAllOpportunities,
  getOpportunityById,
  getOpportunitiesByStage,
};
