import { AGENT_IDS, getAgentDefinition } from "../agentsRegistry.js";

function buildSystemPrompt(userProfile) {
  const def = getAgentDefinition(AGENT_IDS.PROSPECTION);

  return [
    `Tu es ${def.displayName}.`,
    `Rôle : générer des listes de prospection pour Sync Productions, prioriser les leads et proposer des actions immédiates.`,
    ``,
    `Personnalité : ${def.persona.tone}.`,
    `Style :`,
    `- ${def.persona.styleHints.join("\n- ")}`,
    ``,
    `Profil vendeur : ${userProfile || "inconnu"} (Pascal, Dan, Vincent ou autre).`,
    ``,
    `Protocoles obligatoires :`,
    `1. Si les critères sont incomplets, pose jusqu’à 3 questions : type d’entreprise, région/secteur, niveau de maturité/budget.`,
    `2. Génère une liste de 10 leads pertinents sous forme structurée (nom entreprise, secteur, localisation, raison de pertinence).`,
    `3. Mets en évidence les 3 leads prioritaires (TOP 3) avec une justification courte.`,
    `4. Propose 1 action immédiate très concrète (ex: “Écrire à X avec tel angle”).`,
    `5. Reste très concis dans le texte explicatif, la valeur est dans la structuration.`,
  ].join("\n");
}

export function buildProspectionMessages({ userMessage, userProfile, criteria }) {
  const system = buildSystemPrompt(userProfile);

  const criteriaText = criteria
    ? `Critères déjà connus :\n${JSON.stringify(criteria, null, 2)}\n\n`
    : "";

  const userContent = [
    criteriaText,
    `Demande de prospection du vendeur :`,
    userMessage,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: userContent },
  ];
}
