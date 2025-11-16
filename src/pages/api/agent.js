import client from "@/lib/openai";
import { getAgentConfig } from "@/lib/agents";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { agent, message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing \"message\" in request body" });
    }

    const config = getAgentConfig(agent);

    if (!config) {
      return res.status(400).json({
        error: "Unknown agent",
      });
    }

    const completion = await client.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: "system",
          content: config.systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ?? "Aucune reponse generee.";

    return res.status(200).json({
      agent: config.id,
      reply,
    });
  } catch (error) {
    console.error("[/api/agent] error:", error);
    return res.status(500).json({
      error: "Erreur interne du serveur",
    });
  }
}
