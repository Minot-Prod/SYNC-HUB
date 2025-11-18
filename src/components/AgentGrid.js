import React from "react";
import agents from "../data/agents";

/**
 * Grille d’agents principale.
 * Affiche chaque agent avec son pitch et un bouton pour l’ouvrir.
 */
export default function AgentGrid() {
  return (
    <section style={{ marginTop: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>Agents</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        {agents.map((agent) => (
          <div key={agent.id} style={{ padding: "16px", borderRadius: "16px", background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.4)", boxShadow: "0 18px 45px rgba(15,23,42,0.7)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{agent.name}</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>{agent.role}</p>
            <p style={{ fontSize: "11px", color: "#9ca3af", flexGrow: 1 }}>{agent.pitch}</p>
            <button onClick={() => (window.location.href = `/agents/${agent.id}`)} style={{ marginTop: "auto", padding: "8px 12px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)", color: "#020617", fontWeight: 600, cursor: "pointer" }}>
              Ouvrir
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
