import React, { useState } from "react";

/**
 * SachaHeader v2
 * - Hero futuriste
 * - Barre de discussion + bouton micro
 * - 3 questions coach (priorité / relances / RDV)
 * - Bouton SYNC qui appelle /api/start-day et renvoie les suggestions au dashboard
 */
export default function SachaHeader({ onSuggestionsChange }) {
  const [priority, setPriority] = useState("");
  const [relances, setRelances] = useState("");
  const [hasMeeting, setHasMeeting] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSync(e) {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    setLoading(true);
    try {
      const res = await fetch("/api/start-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority,
          relances,
          hasMeeting,
          message,
        }),
      });
      const data = await res.json();
      const next = Array.isArray(data.suggestions) ? data.suggestions : [];
      if (typeof onSuggestionsChange === "function") {
        onSuggestionsChange(next);
      }
    } catch (err) {
      console.error("Erreur lors de la génération du plan", err);
      if (typeof onSuggestionsChange === "function") {
        onSuggestionsChange([]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{
        borderRadius: "16px",
        background: "rgba(15,23,42,0.8)",
        border: "1px solid rgba(148,163,184,0.4)",
        boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Ligne avatar + titre */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 0, #38bdf8, #4f46e5 60%, #0f172a)",
              border: "1px solid rgba(148,163,184,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 700,
              color: "#e5e7eb",
            }}
          >
            S
          </div>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
              Sacha – ton copilote de vente IA
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#cbd5f5",
                marginTop: "4px",
                marginBottom: 0,
              }}
            >
              Tu parles à Sacha, il structure ta journée et tes actions qui rapportent.
            </p>
          </div>
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#a5b4fc",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Mode coach Sync
        </div>
      </div>

      {/* Barre de discussion + micro + SYNC */}
      <form
        onSubmit={handleSync}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Dis à Sacha ce que tu veux accomplir aujourd’hui…"
            style={{
              flex: 1,
              minWidth: "220px",
              borderRadius: "999px",
              padding: "10px 14px",
              border: "1px solid rgba(148,163,184,0.4)",
              background: "rgba(15,23,42,0.9)",
              color: "#fff",
              fontSize: "14px",
            }}
          />
          <button
            type="button"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.6)",
              background: "rgba(15,23,42,0.9)",
              color: "#e5e7eb",
              cursor: "pointer",
              fontSize: "18px",
            }}
            title="Micro (à venir)"
          >
            🎙
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
              color: "#020617",
              fontWeight: 700,
              cursor: "pointer",
              minWidth: "110px",
            }}
          >
            {loading ? "SYNC..." : "SYNC"}
          </button>
        </div>

        {/* Ligne 3 questions coach */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginTop: "6px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>
              Ta priorité du jour
            </label>
            <input
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Ex : Relancer 5 prospects"
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.4)",
                background: "rgba(20,28,45,0.9)",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>
              Nombre de relances prévues
            </label>
            <input
              value={relances}
              onChange={(e) => setRelances(e.target.value)}
              placeholder="Ex : 5"
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.4)",
                background: "rgba(20,28,45,0.9)",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>
              As-tu des RDV aujourd’hui ?
            </label>
            <select
              value={hasMeeting}
              onChange={(e) => setHasMeeting(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.4)",
                background: "rgba(20,28,45,0.9)",
                color: "#fff",
              }}
            >
              <option value="">—</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
        </div>
      </form>
    </section>
  );
}
