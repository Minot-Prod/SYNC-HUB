import OpenAI from "openai";
import { AGENT_IDS, getAgentDefinition } from "./agentsRegistry.js";
import { buildAssistantMessages } from "./definitions/assistant.sacha.js";
import { buildProspectionMessages } from "./definitions/prospection.leo.js";
import { buildMessagesMessages } from "./definitions/messages.maya.js";
import { buildAnalysteMessages } from "./definitions/analyste.eliot.js";
import { buildRadarMessages } from "./definitions/radar.zoe.js";
import { buildCoachMessages } from "./definitions/coach.nova.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Construit les messages (system + user) en fonction de l’agent.
 */
function buildMessagesForAgent(options) {
  const { agentId, userMessage, userProfile, context = {}, extras = {} } = options;

  switch (agentId) {
    case AGENT_IDS.ASSISTANT:
      return buildAssistantMessages({
        userMessage,
        userProfile,
        contextSummary: context.summary,
      });

    case AGENT_IDS.PROSPECTION:
      return buildProspectionMessages({
        userMessage,
        userProfile,
        criteria: extras.criteria || context.criteria,
      });

    case AGENT_IDS.MESSAGES:
      return buildMessagesMessages({
        userMessage,
        userProfile,
        channel: extras.channel,
        prospect: extras.prospect,
        objective: extras.objective,
      });

    case AGENT_IDS.ANALYSTE:
      return buildAnalysteMessages({
        userMessage,
        userProfile,
        companyHint: extras.companyHint,
      });

    case AGENT_IDS.RADAR:
      return buildRadarMessages({
        userMessage,
        userProfile,
        pipelineSnapshot: context.pipelineSnapshot,
      });

    case AGENT_IDS.COACH:
      return buildCoachMessages({
        userMessage,
        userProfile,
      });

    default:
      throw new Error(`Agent inconnu : ${agentId}`);
  }
}

/**
 * Lance un agent spécialisé ou l’assistant principal.
 */
export async function runAgent(options) {
  const { agentId, userMessage } = options;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY manquant dans les variables d’environnement.");
  }

  const def = getAgentDefinition(agentId);
  if (!def) {
    throw new Error(`Agent non référencé dans agentsRegistry : ${agentId}`);
  }

  if (!userMessage || typeof userMessage !== "string") {
    throw new Error("userMessage est requis pour runAgent.");
  }

  const messages = buildMessagesForAgent(options);

  const model = def.defaultModel || process.env.OPENAI_DEFAULT_MODEL || "gpt-4.1-mini";

  const completion = await client.chat.completions.create({
    model,
    messages,
    temperature: def.temperature ?? 0.4,
    max_tokens: def.maxOutputTokens ?? 900,
  });

  const choice = completion.choices?.[0];
  const output = choice?.message?.content?.trim() || "";

  return {
    agentId,
    displayName: def.displayName,
    output,
    meta: {
      model: completion.model,
      usage: completion.usage,
      finishReason: choice?.finish_reason,
    },
  };
}

/**
 * Helper haut niveau pour l’assistant principal (Sacha).
 */
export async function runAssistant({ userMessage, userProfile, context }) {
  return runAgent({
    agentId: AGENT_IDS.ASSISTANT,
    userMessage,
    userProfile,
    context,
  });
}
