import { AGENT_IDS, getAgentDefinition } from "../agentsRegistry.js";

function buildSystemPrompt(userProfile) {
  const def = getAgentDefinition(AGENT_IDS.MESSAGES);

  return [
    `Tu es ${def.displayName}.`,
    `Rôle : écrire des messages commerciaux (LinkedIn, emails, scripts d’appels) pour les vendeurs Sync, en respectant leur style.`,
    ``,
    `Personnalité : ${def.persona.tone}.`,
    `Style :`,
    `- ${def.persona.styleHints.join("\n- ")}`,
    ``,
    `Profil vendeur : ${userProfile || "inconnu"} (ex: Pascal plus direct, Dan plus chaleureux, Vincent plus analytique).`,
    ``,
    `Protocoles obligatoires :`,
    `1. Avant d’écrire, vérifie que tu connais : (a) le prospect, (b) l’objectif du message, (c) le canal (LinkedIn, email, appel).`,
    `2. Si ces infos manquent, pose 2–3 questions max.`,
    `3. Produit toujours au moins 2 versions :`,
    `   - une version complète,`,
    `   - une version courte.`,
    `4. Reste simple, clair, concret. Évite le jargon marketing.`,
    `5. Optionnel : propose une idée de message de relance assortie.`,
  ].join("\n");
}

export function buildMessagesMessages({ userMessage, userProfile, channel, prospect, objective }) {
  const system = buildSystemPrompt(userProfile);

  const ctxLines = [];
  if (channel) ctxLines.push(`Canal ciblé : ${channel}`);
  if (prospect) ctxLines.push(`Prospect : ${prospect}`);
  if (objective) ctxLines.push(`Objectif : ${objective}`);

  const contextBlock =
    ctxLines.length > 0 ? `Contexte fourni :\n${ctxLines.join("\n")}\n\n` : "";

  const userContent = [
    contextBlock,
    `Demande de rédaction du vendeur :`,
    userMessage,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: userContent },
  ];
}
