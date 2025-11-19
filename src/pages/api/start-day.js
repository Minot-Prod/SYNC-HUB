export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // MVP : suggestions statiques alignées avec le Plan de la journée
  const suggestions = [
    {
      title: "Relancer 5 prospects chauds",
      agentSlug: "redaction",
      badge: "Agent Rédaction",
    },
    {
      title: "Lister 10 entreprises cibles",
      agentSlug: "prospection",
      badge: "Agent Prospection",
    },
    {
      title: "Analyser 1 entreprise prioritaire",
      agentSlug: "analyse",
      badge: "Analyste Entreprise",
    },
    {
      title: "Répondre aux DM / emails en attente",
      agentSlug: "redaction",
      badge: "Agent Rédaction",
    },
    {
      title: "Scanner le marché (mots-clés / tendances)",
      agentSlug: "radar",
      badge: "Radar Opportunités",
    },
  ];

  return res.status(200).json({ suggestions });
}

