import React, { useState } from "react";
import { useRouter } from "next/router";

/**
 * Composant SachaHeader
 * - Affiche le bandeau coach (titre, sous-texte)
 * - Pose 3 questions au vendeur (priorité, relances, RDV)
 * - Appelle /api/start-day pour générer des suggestions
 * - Affiche les suggestions en boutons qui ouvrent l"agent correspondant
 */
export default function SachaHeader() {
  const router = useRouter();
  const [priority, setPriority] = useState("");
  const [relances, setRelances] = useState("");
  const [hasMeeting, setHasMeeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

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
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (err) {
      console.error("Erreur lors de la génération du plan", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ borderRadius: "16px", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.4)", boxShadow: "0 18px 45px rgba(15,23,42,0.7)", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Bandeau coach */}
      <div>
        <h2 style={{ fontSize: "24px", fontWeight: 700 }}>Sacha – ton copilote de vente IA</h2>
        <p style={{ fontSize: "14px", color: "#cbd5f5", marginTop: "4px" }}>
          On prépare ta journée, tu focuses sur les conversations qui rapportent.
        </p>
      </div>

      {/* Formulaire coach */}
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#94a3b8" }}>Ta priorité du jour</label>
          <input value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Ex: Relancer 5 prospects" style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(148,163,184,0.4)", background: "rgba(20,28,45,0.9)", color: "#fff" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#94a3b8" }}>Nombre de relances prévues</label>
          <input value={relances} onChange={(e) => setRelances(e.target.value)} placeholder="Ex: 5" style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(148,163,184,0.4)", background: "rgba(20,28,45,0.9)", color: "#fff" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#94a3b8" }}>As-tu des RDV aujourd’hui ?</label>
          <select value={hasMeeting} onChange={(e) => setHasMeeting(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(148,163,184,0.4)", background: "rgba(20,28,45,0.9)", color: "#fff" }}>
            <option value="">—</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button type="submit" style={{ padding: "10px 14px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)", color: "#020617", fontWeight: 700, cursor: "pointer", width: "100%" }}>
            {loading ? "Génération..." : "Démarrer ma journée"}
          </button>
        </div>
      </form>

      {/* Suggestions / Plan de journée */}
      {suggestions.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>Plan de ta journée</h3>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>Basé sur ce que tu m’as dit, voilà les actions qui vont vraiment bouger tes ventes.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {suggestions.map((item, idx) => (
              <button key={idx} onClick={() => router.push(`/agents/${item.agentSlug}`)} style={{ padding: "8px 12px", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.6)", background: "rgba(20,28,45,0.9)", color: "#fff", fontSize: "12px", cursor: "pointer" }}>
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
