export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  // Dans cette version MVP, on renvoie des suggestions statiques.
  const suggestions = [
    { title: "Lister 10 entreprises cibles", agentSlug: "prospection" },
    { title: "Analyser 1 entreprise prioritaire", agentSlug: "analyse" },
    { title: "Répondre aux DM / emails en attente", agentSlug: "redaction" },
    { title: "Scanner marché (mots-clés / tendances)", agentSlug: "radar" },
  ];
  return res.status(200).json({ suggestions });
}
