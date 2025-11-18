import React, { useState } from "react";

export default function AssistantPage() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    setHistory((h) => [...h, { from: "user", text }]);
    setMessage("");

    // Simple routage par mots clés pour déterminer l’agent
    const lowered = text.toLowerCase();
    let slug = "";
    if (lowered.includes("prospect") || lowered.includes("cible")) {
      slug = "prospection";
    } else if (lowered.includes("mail") || lowered.includes("écrire")) {
      slug = "redaction";
    } else if (lowered.includes("analyse") || lowered.includes("diagnostic")) {
      slug = "analyse";
    } else if (lowered.includes("trend") || lowered.includes("marché")) {
      slug = "radar";
    }
    if (!slug) {
      // pas de routage ? message générique
      setHistory((h) => [
        ...h,
        { from: "sacha", text: "Je n’ai pas compris, reformule ou va sur un agent." },
      ]);
      return;
    }

    // Appel de l’agent correspondant via /api/agents/[slug]
    try {
      const res = await fetch(`/api/agents/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      setHistory((h) => [
        ...h,
        {
          from: "sacha",
          text: data.answer || "Pas de réponse pour le moment.",
        },
      ]);
    } catch {
      setHistory((h) => [
        ...h,
        { from: "sacha", text: "Erreur lors de la requête." },
      ]);
    }
  }

  return (
    <main
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Assistant Sacha</h1>
      <div
        style={{
          flexGrow: 1,
          padding: "16px",
          borderRadius: "16px",
          background: "rgba(15,23,42,0.8)",
          border: "1px solid rgba(148,163,184,0.4)",
          overflowY: "auto",
        }}
      >
        {history.map((entry, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "8px",
              textAlign: entry.from === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                background:
                  entry.from === "user"
                    ? "rgba(37,99,235,0.8)"
                    : "rgba(147,197,253,0.2)",
                color: entry.from === "user" ? "#fff" : "#e5e7eb",
              }}
            >
              {entry.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Pose une question à Sacha…"
          style={{
            flexGrow: 1,
            borderRadius: "8px",
            padding: "12px",
            border: "1px solid rgba(148,163,184,0.4)",
            background: "rgba(20,28,45,0.9)",
            color: "#fff",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
            color: "#020617",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Envoyer
        </button>
      </form>
    </main>
  );
}
