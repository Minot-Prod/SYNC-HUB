﻿import React, { useState } from "react";

const AGENT_OPTIONS = [
  { slug: "auto", label: "Auto (Assistant choisit)" },
  { slug: "prospection", label: "Agent Prospection" },
  { slug: "redaction", label: "Agent Rédaction" },
  { slug: "analyse", label: "Analyste Entreprise" },
  { slug: "radar", label: "Radar Opportunités" },
];

// Routing simple par mots-clés pour le mode "auto"
function chooseAgentSlug(question) {
  const q = question.toLowerCase();

  if (q.includes("prospect") || q.includes("cold") || q.includes("relance")) {
    return "prospection";
  }
  if (q.includes("message") || q.includes("email") || q.includes("script")) {
    return "redaction";
  }
  if (q.includes("entreprise") || q.includes("site") || q.includes("analyse")) {
    return "analyse";
  }
  if (q.includes("marché") || q.includes("tendance") || q.includes("opportunité")) {
    return "radar";
  }

  // fallback : prospection par défaut
  return "prospection";
}

export default function AssistantPage() {
  const [mode, setMode] = useState("auto");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;

    setError(null);
    setLoading(true);

    const chosenSlug = mode === "auto" ? chooseAgentSlug(q) : mode;

    const newHistory = [
      ...history,
      { id: Date.now(), from: "user", text: q },
    ];
    setHistory(newHistory);
    setQuestion("");

    try {
      const res = await fetch(`/api/agents/${chosenSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l’appel à l’agent.");
        return;
      }

      setHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "agent",
          agent: chosenSlug,
          text: data.answer || "(Pas de réponse retournée.)",
        },
      ]);
    } catch (err) {
      console.error("Erreur assistant central", err);
      setError("Erreur réseau ou serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginBottom: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Assistant Sync
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#9ca3af",
          }}
        >
          Un point d’entrée unique pour parler aux agents : prospection, rédaction,
          analyse et radar. Pose ta question, l’assistant route vers le bon agent.
        </p>
      </header>

      {/* Zone de contrôle */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "16px",
          borderRadius: "16px",
          border: "1px solid rgba(148,163,184,0.35)",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.2), transparent 55%), rgba(15,23,42,0.95)",
          maxWidth: "860px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>
            Mode de routage :
          </span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.6)",
              background: "rgba(15,23,42,0.9)",
              color: "#e5e7eb",
              fontSize: "12px",
            }}
          >
            {AGENT_OPTIONS.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.label}
              </option>
            ))}
          </select>
          <span
            style={{
              fontSize: "11px",
              color: "#64748b",
            }}
          >
            En mode auto, l’assistant choisit l’agent selon ta question.
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Décris ta situation ou ta question pour les ventes Sync…"
            rows={3}
            style={{
              resize: "vertical",
              borderRadius: "12px",
              padding: "10px 12px",
              border: "1px solid rgba(148,163,184,0.4)",
              background: "rgba(15,23,42,0.9)",
              color: "#e5e7eb",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
                color: "#020617",
                fontWeight: 700,
                fontSize: "14px",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? "Envoi en cours…" : "Envoyer à l’agent"}
            </button>
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>
              L’historique reste uniquement sur cette session de navigateur.
            </span>
          </div>
        </form>

        {error && (
          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#fecaca",
            }}
          >
            {error}
          </div>
        )}
      </section>

      {/* Historique */}
      <section
        style={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "860px",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Historique de la session
        </h2>
        <div
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(30,64,175,0.7)",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.9))",
            padding: "12px",
            maxHeight: "420px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {history.length === 0 && (
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Commence par poser une question sur ta prospection, tes messages
              ou l’analyse d’un compte clé. L’assistant choisira l’agent adapté.
            </div>
          )}
          {history.map((item) => {
            const isUser = item.from === "user";
            return (
              <div
                key={item.id}
                style={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "8px 10px",
                  borderRadius: "12px",
                  background: isUser
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "rgba(15,23,42,0.9)",
                  color: isUser ? "#022c22" : "#e5e7eb",
                  fontSize: "13px",
                  border: isUser
                    ? "none"
                    : "1px solid rgba(148,163,184,0.4)",
                }}
              >
                {!isUser && item.agent && (
                  <div
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#60a5fa",
                      marginBottom: "2px",
                    }}
                  >
                    {item.agent}
                  </div>
                )}
                <div>{item.text}</div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

