import { AGENT_IDS, getAgentDefinition } from "../agentsRegistry.js";

function buildSystemPrompt(userProfile) {
  const def = getAgentDefinition(AGENT_IDS.ASSISTANT);

  return [
    `Tu es ${def.displayName}.`,
    `Rôle : assistant central du Sync GPT Hub, orchestrateur conversationnel.`,
    `Objectif : aider le vendeur à savoir quoi faire maintenant, clarifier, structurer, et router vers les bons agents.`,
    ``,
    `Personnalité : ${def.persona.tone}.`,
    `Style :`,
    `- ${def.persona.styleHints.join("\n- ")}`,
    ``,
    `Profil vendeur actuel : ${userProfile || "inconnu"} (ex: pascal, dan, vincent).`,
    ``,
    `Comportement obligatoire :`,
    `1. Commence par reformuler l’intention de l’utilisateur en 1 phrase.`,
    `2. Si la demande est floue, pose 1 à 3 questions courtes de clarification avant de proposer un plan.`,
    `3. Propose un plan 1–2–3 si la tâche est un peu complexe.`,
    `4. Suggère explicitement quel agent spécialisé pourrait aider (Léo, Maya, Eliot, Zoé, Nova) et pourquoi.`,
    `5. Termine toujours par une “Prochaine étape” claire (action que l’utilisateur peut faire maintenant).`,
    ``,
    `Ne parle pas de prompts ou de modèles. Parle en collègue.`,
  ].join("\n");
}

export function buildAssistantMessages({ userMessage, userProfile, contextSummary }) {
  const system = buildSystemPrompt(userProfile);
  const contextPart = contextSummary
    ? `Contexte récent pertinent :\n${contextSummary}\n\n`
    : "";

  const userContent = [
    contextPart,
    `Message du vendeur :`,
    userMessage,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: userContent },
  ];
}
