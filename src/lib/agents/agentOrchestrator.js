// src/lib/agents/agentOrchestrator.js

const {
  listOpportunities,
  getOpportunitiesStats,
} = require('../services/opportunitiesService');

/**
 * Orchestrateur multi-agents Sync GPT Hub.
 *
 * Structure d'appel typique (via /api/agent) :
 * {
 *   "agent": "Radar" | "Sales" | "Prospection" | "Messages" | "Analyste",
 *   "input": "Texte libre ou payload spécifique",
 *   "context": { ... }
 * }
 */
async function agentOrchestrator(payload) {
  const { agent, input, context = {} } = payload || {};

  if (!agent) {
    throw new Error('agent manquant dans la requête');
  }

  switch (agent) {
    case 'Radar':
      return handleRadarAgent({ input, context });

    case 'Sales':
      return handleSalesAgent({ input, context });

    case 'Prospection':
      return handleProspectionAgent({ input, context });

    case 'Messages':
      return handleMessagesAgent({ input, context });

    case 'Analyste':
      return handleAnalysteAgent({ input, context });

    default:
      return {
        agent,
        type: 'unknown.agent',
        message: `Agent inconnu : ${agent}`,
      };
  }
}

/**
 * Agent Radar : vue opportunités + stats pipeline.
 */
function handleRadarAgent() {
  const opportunities = listOpportunities();
  const stats = getOpportunitiesStats();

  return {
    agent: 'Radar',
    type: 'radar.overview',
    message: 'Radar des opportunités chargé depuis le JSON store (Palier A).',
    data: {
      opportunities,
      stats,
    },
  };
}

/**
 * Agent Sales : placeholder (branché plus tard sur LLM / scripts).
 */
function handleSalesAgent({ input }) {
  return {
    agent: 'Sales',
    type: 'sales.echo',
    message:
      'Agent Sales (placeholder Palier A). Le vrai prompt LLM sera branché au Palier B.',
    data: {
      input,
    },
  };
}

/**
 * Agent Prospection : placeholder.
 */
function handleProspectionAgent({ input }) {
  return {
    agent: 'Prospection',
    type: 'prospection.echo',
    message:
      'Agent Prospection (placeholder Palier A). Servira plus tard pour générer des séquences.',
    data: {
      input,
    },
  };
}

/**
 * Agent Messages : placeholder.
 */
function handleMessagesAgent({ input }) {
  return {
    agent: 'Messages',
    type: 'messages.echo',
    message:
      'Agent Messages (placeholder Palier A). Routing futur vers templates / scripts.',
    data: {
      input,
    },
  };
}

/**
 * Agent Analyste : placeholder.
 */
function handleAnalysteAgent({ input }) {
  return {
    agent: 'Analyste',
    type: 'analyste.echo',
    message:
      "Agent Analyste (placeholder Palier A). Sera branché sur l'analyse d'historique et KPIs.",
    data: {
      input,
    },
  };
}

module.exports = {
  agentOrchestrator,
};
