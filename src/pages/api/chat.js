import client from "@/lib/openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing \"message\" in request body" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es un assistant commercial pour Sync Productions. Tu reponds de maniere claire, concise et oriente business, en francais.",
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
      reply,
    });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return res.status(500).json({
      error: "Erreur interne du serveur",
      detail: error?.message || "No error message",
    });
  }
}
