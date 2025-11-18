import { Configuration, OpenAIApi } from "openai";

const agentsMeta = {
  prospection: {
    name: "Agent Prospection",
    role: "Chasseur de leads",
    prompt: (question) =>
      `Tu es un agent de prospection commercial. On te demande : ${question}. Réponds de manière concise avec des conseils pratiques sur la prospection.`,
  },
  redaction: {
    name: "Agent Rédaction",
    role: "Scripts, emails & DM",
    prompt: (question) =>
      `Tu es un agent de rédaction. On te demande : ${question}. Réponds en produisant un message ou un script adapté.`,
  },
  analyse: {
    name: "Analyste Entreprise",
    role: "Diagnostic flash",
    prompt: (question) =>
      `Tu es un analyste d’entreprise. On te demande : ${question}. Réponds par un diagnostic structuré de l’entreprise ciblée.`,
  },
  radar: {
    name: "Radar Opportunités",
    role: "Surveillance & signaux",
    prompt: (question) =>
      `Tu es un radar d’opportunités. On te demande : ${question}. Réponds en identifiant tendances et signaux faibles.`,
  },
};

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
  } = req;

  if (!agentsMeta[slug]) {
    return res.status(404).json({ error: "Agent inconnu" });
  }

  if (method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { question } = req.body || {};
  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question manquante" });
  }

  try {
    const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(config);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: agentsMeta[slug].prompt(question) },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const answer = completion.data.choices[0].message.content.trim();
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de l’agent" });
  }
}
