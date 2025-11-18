import React, { useState } from "react";

/**
 * SachaHeader
 * - Bandeau coach
 * - Formulaire 3 questions
 * - Appelle /api/start-day
 * - Remonte les suggestions au parent via onSuggestionsChange
 */
export default function SachaHeader({ onSuggestionsChange }) {
  const [priority, setPriority] = useState("");
  const [relances, setRelances] = useState("");
  const [hasMeeting, setHasMeeting] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/start-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority,
          relances,
          hasMeeting,
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
      <div>
        <h2 style={{ fontSize: "24px", fontWeight: 700 }}>
          Sacha – ton copilote de vente IA
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#cbd5f5",
            marginTop: "4px",
          }}
        >
          On prépare ta journée, tu focuses sur les conversations qui rapportent.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#94a3b8" }}>
            Ta priorité du jour
          </label>
          <input
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Ex: Relancer 5 prospects"
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
            placeholder="Ex: 5"
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
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button
            type="submit"
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              background:
                "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
              color: "#020617",
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
            }}
          >
            {loading ? "Génération..." : "Démarrer ma journée"}
          </button>
        </div>
      </form>
    </section>
  );
}
