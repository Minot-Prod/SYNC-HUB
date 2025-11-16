const path = require('path');
const { readJson } = require('../storage/jsonStore');

const OPPS_FILE = path.join(process.cwd(), 'data', 'opportunities.json');

function computePipelineStats(opportunities) {
  const stages = {};
  let totalValue = 0;
  let wonValue = 0;

  opportunities.forEach((opp) => {
    const stage = opp.stage || 'unknown';
    const value = Number(opp.value || 0);
    const status = opp.status || 'open';

    if (!stages[stage]) {
      stages[stage] = { count: 0, totalValue: 0 };
    }

    stages[stage].count += 1;
    stages[stage].totalValue += value;
    totalValue += value;

    if (status === 'won') {
      wonValue += value;
    }
  });

  return {
    totalOpportunities: opportunities.length,
    totalValue,
    wonValue,
    winRate: totalValue > 0 ? Math.round((wonValue / totalValue) * 100) : 0,
    stages,
  };
}

function getRecentOpportunities(opportunities, limit = 5) {
  const sorted = [...opportunities].sort((a, b) => {
    const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return db - da;
  });
  return sorted.slice(0, limit);
}

async function getDashboardSnapshot() {
  const opportunities = await readJson(OPPS_FILE, []);

  const pipeline = computePipelineStats(opportunities);
  const recent = getRecentOpportunities(opportunities, 5);

  const kpis = [
    {
      id: 'total_opps',
      label: 'Opportunités totales',
      value: pipeline.totalOpportunities,
      trend: 'flat',
    },
    {
      id: 'pipeline_value',
      label: 'Valeur pipeline',
      value: pipeline.totalValue,
      unit: '$',
      trend: 'up',
    },
    {
      id: 'won_value',
      label: 'Gagné (Closed Won)',
      value: pipeline.wonValue,
      unit: '$',
      trend: 'up',
    },
    {
      id: 'win_rate',
      label: 'Taux de win',
      value: pipeline.winRate,
      unit: '%',
      trend: 'flat',
    },
  ];

  return {
    kpis,
    pipelineByStage: pipeline.stages,
    recentOpportunities: recent,
  };
}

module.exports = {
  getDashboardSnapshot,
};
