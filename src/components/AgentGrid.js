import React from "react";

/**
 * Grille futuriste des 4 agents principaux.
 */
export default function AgentGrid() {
  const cards = [
    {
      slug: "prospection",
      title: "Agent Prospection",
      subtitle: "Chasseur de leads",
      text: "Exemples : lister des cibles, préparer des séquences, trouver des contacts.",
    },
    {
      slug: "redaction",
      title: "Agent Rédaction",
      subtitle: "Scripts, emails & DM",
      text: "Exemples : messages LinkedIn, emails de relance, scripts d’appels.",
    },
    {
      slug: "analyse",
      title: "Analyste Entreprise",
      subtitle: "Diagnostic flash",
      text: "Exemples : fiche entreprise, pain points, angle de pitch.",
    },
    {
      slug: "radar",
      title: "Radar Opportunités",
      subtitle: "Surveillance & signaux",
      text: "Exemples : idées de comptes à cibler, signaux faibles à creuser.",
    },
  ];

  return (
    <section style={{ marginTop: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
        Agents IA
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.slug}
            style={{
              padding: "16px",
              borderRadius: "16px",
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(148,163,184,0.5)",
              boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.7)",
                marginBottom: "4px",
              }}
            />
            <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{card.title}</h3>
            <p style={{ fontSize: "12px", color: "#a5b4fc" }}>{card.subtitle}</p>
            <p style={{ fontSize: "11px", color: "#9ca3af", flexGrow: 1 }}>
              {card.text}
            </p>
            <button
              onClick={() => (window.location.href = `/agents/${card.slug}`)}
              style={{
                marginTop: "auto",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background:
                  "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
                color: "#020617",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Ouvrir l’agent
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
