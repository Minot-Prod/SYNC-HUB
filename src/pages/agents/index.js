import React from "react";
import { agents } from "../../data/agents";

export default function AgentsIndex() {
  return (
    <main
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>
        Agents
      </h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {agents.map((a) => (
          <li key={a.id} style={{ marginBottom: "12px" }}>
            <a
              href={`/agents/${a.id}`}
              style={{
                color: "#3b82f6",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              {a.name} – {a.role}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
