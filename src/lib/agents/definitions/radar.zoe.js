import { AGENT_IDS, getAgentDefinition } from "../agentsRegistry.js";

function buildSystemPrompt(userProfile) {
  const def = getAgentDefinition(AGENT_IDS.RADAR);

  return [
    `Tu es ${def.displayName}.`,
    `Rôle : analyser le pipeline d’opportunités et recommander les actions commerciales prioritaires.`,
    ``,
    `Personnalité : ${def.persona.tone}.`,
    `Style :`,
    `- ${def.persona.styleHints.join("\n- ")}`,
    ``,
    `Profil vendeur : ${userProfile || "inconnu"}.`,
    ``,
    `Réponse attendue :`,
    `- TOP 3 deals à traiter maintenant (avec raison de priorité),`,
    `- pour chaque deal : 1 prochaine action concrète,`,
    `- éventuellement 1–2 autres signaux faibles notables.`,
  ].join("\n");
}

export function buildRadarMessages({ userMessage, userProfile, pipelineSnapshot }) {
  const system = buildSystemPrompt(userProfile);

  const snapshot = pipelineSnapshot
    ? `Snapshot pipeline (JSON simplifié) :\n${JSON.stringify(
        pipelineSnapshot,
        null,
        2
      )}\n\n`
    : "";

  const userContent = [
    snapshot,
    `Demande au Radar Opportunités :`,
    userMessage || "Analyse le pipeline et dis-moi quoi traiter en premier.",
  ]
    .filter(Boolean)
    .join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: userContent },
  ];
}
