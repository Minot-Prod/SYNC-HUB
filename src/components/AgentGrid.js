import React from "react";
import { agents } from "../data/agents";

export default function AgentGrid() {
  return (
    <section style={{ marginTop: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
        Agents IA
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {agents.map((agent) => (
          <div
            key={agent.id}
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(148,163,184,0.5)",
              boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={agent.avatar}
              alt={agent.name}
              style={{ width: "64px", height: "64px", borderRadius: "50%" }}
            />
            <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
              {agent.name}
            </h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>
              {agent.role}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              {agent.pitch}
            </p>
            <button
              onClick={() => (window.location.href = `/agents/${agent.id}`)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background:
                  "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
                color: "#020617",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "auto",
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

