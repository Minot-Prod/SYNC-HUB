﻿import { useRouter } from "next/router";
import { useState } from "react";
import { agents } from "../../data/agents";

export default function AgentPage() {
  const { query } = useRouter();
  const slug = (query.slug || "").toString();
  const agent = agents.find((a) => a.id === slug);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const q = question.trim();
    if (!q || !slug) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await fetch(`/api/agents/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnswer(data.answer);
      } else {
        setError(data.error || "Erreur.");
      }
    } catch (err) {
      setError("Erreur lors de la requête.");
    } finally {
      setLoading(false);
    }
  }

  if (!agent) {
    return (
      <main
        style={{
          padding: "24px",
          minHeight: "100vh",
          background: "#020617",
          color: "#e5e7eb",
        }}
      >
        <h1>Agent introuvable</h1>
        <p>Nous n’avons pas trouvé cet agent.</p>
      </main>
    );
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
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={agent.avatar}
          alt={agent.name}
          style={{ width: "72px", height: "72px", borderRadius: "50%" }}
        />
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
            {agent.name}
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            {agent.role}
          </p>
        </div>
      </div>
      <p style={{ fontSize: "12px", color: "#9ca3af" }}>{agent.pitch}</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "600px",
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pose une question à cet agent…"
          style={{
            padding: "12px",
            borderRadius: "8px",
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
            background:
              "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
            color: "#020617",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Envoi…" : "Envoyer"}
        </button>
      </form>
      {error && (
        <div
          style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "#f87171",
          }}
        >
          {error}
        </div>
      )}
      {answer && (
        <div
          style={{
            marginTop: "12px",
            padding: "16px",
            borderRadius: "12px",
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.4)",
            color: "#e5e7eb",
          }}
        >
          {answer}
        </div>
      )}
    </main>
  );
}
