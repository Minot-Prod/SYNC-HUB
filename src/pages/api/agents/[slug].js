﻿import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const AGENTS = {
  prospection: {
    name: "Agent Prospection",
    systemPrompt:
      "Tu es l’agent Prospection de Sync Productions. " +
      "Tu aides un vendeur à identifier, qualifier et prioriser des prospects B2B. " +
      "Tu poses des questions si nécessaire et tu réponds en français, de manière concrète et orientée action.",
  },
  redaction: {
    name: "Agent Rédaction",
    systemPrompt:
      "Tu es l’agent Rédaction de Sync Productions. " +
      "Tu écris des messages, emails et scripts LinkedIn clairs, orientés résultats, en français. " +
      "Tu t’adaptes au ton demandé (casual, pro, direct) et tu proposes toujours 1 à 3 variantes.",
  },
  analyse: {
    name: "Analyste Entreprise",
    systemPrompt:
      "Tu es l’analyste entreprise de Sync Productions. " +
      "On te donne du contexte sur une entreprise ou un prospect, et tu fournis un diagnostic rapide : enjeux, risques, opportunités. " +
      "Tu restes synthétique, structuré, et priorises les 3 points les plus importants.",
  },
  radar: {
    name: "Radar Opportunités",
    systemPrompt:
      "Tu es le radar d’opportunités de Sync Productions. " +
      "À partir d’une question ou d’un contexte, tu fais ressortir les signaux faibles, tendances ou angles d’attaque pour la prospection. " +
      "Tu proposes des pistes concrètes d’actions commerciales.",
  },
};

export default async function handler(req, res) {
  const { slug } = req.query;
  const agentKey = Array.isArray(slug) ? slug[0] : slug;
  const agent = agentKey ? AGENTS[agentKey] : null;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }

  if (!agent) {
    res
      .status(404)
      .json({ error: "Agent inconnu", slug: agentKey || null });
    return;
  }

  const body = req.body || {};
  const question = typeof body.question === "string" ? body.question.trim() : "";

  if (!question) {
    res.status(400).json({ error: "Champ 'question' manquant ou vide." });
    return;
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      messages: [
        { role: "system", content: agent.systemPrompt },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });

    const answer =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Je n’ai pas pu générer de réponse utile.";

    res.status(200).json({
      agent: agentKey,
      answer,
    });
  } catch (err) {
    console.error("Erreur agent", agentKey, err);
    res.status(500).json({
      error: "Erreur interne de l’agent.",
    });
  }
}
