const agents = [
  {
    id: "assistant",
    name: "Sacha",
    role: "Conseiller IA & chef d’orchestre",
    pitch: "Je clarifie la demande, choisis l’agent et garde le contexte.",
    examples: ["Plan commercial", "Routine IA", "Rappel de notes importantes"],
    accent: "cyan"
  },
  {
    id: "prospection",
    name: "Mira",
    role: "Prospection & qualification",
    pitch: "Je trouve des cibles pertinentes et je priorise par signaux.",
    examples: ["20 PME au Québec", "Scoring simple", "3 accroches d’approche"],
    accent: "green"
  },
  {
    id: "redaction",
    name: "Léo",
    role: "Rédaction (LinkedIn, emails, scripts d’appel)",
    pitch: "Messages adaptés au style Pascal/Dan, avec variantes A/B.",
    examples: ["Premier message LinkedIn", "Relance J+3", "Script d’appel 30s"],
    accent: "purple"
  },
  {
    id: "analyste",
    name: "Noor",
    role: "Analyste Entreprise",
    pitch: "Je produis une synthèse 1-page, risques/opportunités et questions de découverte.",
    examples: ["Résumé client", "Forces/faiblesses", "Questions ciblées"],
    accent: "amber"
  },
  {
    id: "radar",
    name: "Kai",
    role: "Radar Opportunités",
    pitch: "Je détecte les signaux et propose la prochaine action priorisée.",
    examples: ["Top 5 de la semaine", "Alertes > 10k$", "Next best action"],
    accent: "red"
  }
];

export default agents;
