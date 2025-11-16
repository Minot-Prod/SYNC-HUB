// src/lib/services/opportunitiesService.js

const {
  getAllOpportunities,
  getOpportunityById,
  getOpportunitiesByStage,
} = require('../storage/jsonStore');

/**
 * Retourne la liste des opportunités, avec filtrage optionnel.
 * @param {Object} params
 * @param {string=} params.stage
 * @param {string=} params.owner
 */
function listOpportunities(params = {}) {
  const { stage, owner } = params;
  let items = getAllOpportunities();

  if (stage) {
    items = items.filter((opp) => opp.stage === stage);
  }

  if (owner) {
    items = items.filter(
      (opp) => opp.owner && opp.owner.toLowerCase() === owner.toLowerCase()
    );
  }

  return items;
}

/**
 * Détail d’une opportunité.
 * @param {string} id
 */
function getOpportunity(id) {
  return getOpportunityById(id);
}

/**
 * Statistiques simples pour le dashboard.
 */
function getOpportunitiesStats() {
  const items = getAllOpportunities();
  const total = items.length;

  const byStage = items.reduce((acc, opp) => {
    acc[opp.stage] = (acc[opp.stage] || 0) + 1;
    return acc;
  }, {});

  const totalPipelineValue = items
    .filter((opp) => opp.stage !== 'won' && opp.stage !== 'lost')
    .reduce((sum, opp) => sum + (opp.valueEUR || 0), 0);

  const totalWonValue = items
    .filter((opp) => opp.stage === 'won')
    .reduce((sum, opp) => sum + (opp.valueEUR || 0), 0);

  return {
    total,
    byStage,
    totalPipelineValue,
    totalWonValue,
  };
}

module.exports = {
  listOpportunities,
  getOpportunity,
  getOpportunitiesStats,
};
