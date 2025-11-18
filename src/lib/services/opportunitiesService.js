import { getAllOpportunities, getOpportunityById } from "../storage/jsonStore";

/**
 * Retourne la liste des opportunités, avec filtrage optionnel.
 * @param {{stage?: string, owner?: string}} params
 */
export function listOpportunities(params = {}) {
  const { stage, owner } = params;
  let items = getAllOpportunities();

  if (stage) items = items.filter((opp) => opp.stage === stage);
  if (owner) items = items.filter(
    (opp) => opp.owner && opp.owner.toLowerCase() === owner.toLowerCase()
  );

  return items;
}

/** Détail d’une opportunité. */
export function getOpportunity(id) {
  return getOpportunityById(id);
}

/** Statistiques simples pour le dashboard. */
export function getOpportunitiesStats() {
  const items = getAllOpportunities();
  const total = items.length;

  const byStage = items.reduce((acc, opp) => {
    acc[opp.stage] = (acc[opp.stage] || 0) + 1;
    return acc;
  }, {});

  const totalPipelineValue = items
    .filter((opp) => opp.stage !== "won" && opp.stage !== "lost")
    .reduce((sum, opp) => sum + (opp.valueCAD || 0), 0);

  const totalWonValue = items
    .filter((opp) => opp.stage === "won")
    .reduce((sum, opp) => sum + (opp.valueCAD || 0), 0);

  return { total, byStage, totalPipelineValue, totalWonValue };
}

export default { listOpportunities, getOpportunity, getOpportunitiesStats };
