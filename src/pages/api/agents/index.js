import { runAgent } from "../../../lib/agents/agentOrchestrator.js";
import { AGENT_IDS } from "../../../lib/agents/agentsRegistry.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      ok: false,
      error: "Méthode non autorisée. Utilise POST sur /api/agents.",
    });
  }

  try {
    const body = req.body || {};
    const {
      agentId,
      message,
      userProfile,
      context,
      extras,
    } = body;

    const effectiveAgentId = agentId || AGENT_IDS.ASSISTANT;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        ok: false,
        error: "Champ 'message' obligatoire (string).",
      });
    }

    const result = await runAgent({
      agentId: effectiveAgentId,
      userMessage: message,
      userProfile: userProfile || null,
      context: context || {},
      extras: extras || {},
    });

    return res.status(200).json({
      ok: true,
      agentId: result.agentId,
      displayName: result.displayName,
      output: result.output,
      meta: result.meta || null,
    });
  } catch (err) {
    console.error("[/api/agents] Error:", err);

    return res.status(500).json({
      ok: false,
      error: "Erreur interne dans l’orchestrateur d’agents.",
      details: process.env.NODE_ENV === "development"
        ? String(err?.message || err)
        : undefined,
    });
  }
}
