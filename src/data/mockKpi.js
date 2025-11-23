const mockKpis = [
  {
    id: "active_users_30d",
    label: "Utilisateurs actifs cockpit (30 derniers jours)",
    value: 18,
    unit: "users",
    delta: "+12% vs mois dernier",
    description: "Nombre d'utilisateurs uniques ayant utilisé le cockpit IA sur 30j."
  },
  {
    id: "meetings_prepared",
    label: "Rendez-vous préparés avec Sync-Hub",
    value: 42,
    unit: "RDV",
    delta: "+28% vs mois dernier",
    description: "RDV où un brief Sync-Hub a été généré avant l'échange."
  },
  {
    id: "hours_saved",
    label: "Temps estimé économisé",
    value: 31,
    unit: "heures",
    delta: "+9h vs mois dernier",
    description: "Estimation basée sur prépa RDV + follow-ups automatisés."
  },
  {
    id: "opps_through_cockpit",
    label: "Opportunités passées par le cockpit IA",
    value: 24,
    unit: "opps",
    delta: "+6 opps vs mois dernier",
    description: "Deals où au moins une action a été assistée par IA."
  },
  {
    id: "adoption_rate",
    label: "Taux d’adoption (équipe pilote)",
    value: 60,
    unit: "%",
    delta: "+15 pts vs mois dernier",
    description: "Part de l'équipe pilote connectée au cockpit sur 30j."
  }
];

export default mockKpis;