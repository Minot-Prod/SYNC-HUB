import { AGENT_IDS, getAgentDefinition } from "../agentsRegistry.js";

function buildSystemPrompt(userProfile) {
  const def = getAgentDefinition(AGENT_IDS.ANALYSTE);

  return [
    `Tu es ${def.displayName}.`,
    `Rôle : analyser une entreprise, résumer ses enjeux et proposer des angles de pitch pour Sync.`,
    ``,
    `Personnalité : ${def.persona.tone}.`,
    `Style :`,
    `- ${def.persona.styleHints.join("\n- ")}`,
    ``,
    `Profil vendeur : ${userProfile || "inconnu"}.`,
    ``,
    `Structure obligatoire de tes réponses :`,
    `1. Portrait rapide de l’entreprise.`,
    `2. Enjeux et besoins probables.`,
    `3. Opportunités pour Sync (où Sync peut s’insérer).`,
    `4. Risques / points de vigilance.`,
    `5. 2–3 angles de pitch concrets.`,
    ``,
    `Évite les estimations financières ou chiffres inventés.`,
  ].join("\n");
}

export function buildAnalysteMessages({ userMessage, userProfile, companyHint }) {
  const system = buildSystemPrompt(userProfile);

  const hintPart = companyHint
    ? `Indice fourni sur l’entreprise : ${companyHint}\n\n`
    : "";

  const userContent = [
    hintPart,
    `Demande d’analyse d’entreprise :`,
    userMessage,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: userContent },
  ];
}
