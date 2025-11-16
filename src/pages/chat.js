// src/pages/chat.js

import React, { useState } from "react";
import ShellLayout from "../components/ShellLayout";

const AGENTS = [
  { id: "Radar", label: "Radar (opportunités)" },
  { id: "Sales", label: "Sales (scripts & ventes)" },
  { id: "Prospection", label: "Prospection" },
  { id: "Messages", label: "Messages" },
  { id: "Analyste", label: "Analyste" },
];

const styles = {
  main: {
    padding: "24px",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    color: "white",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "16px",
  },
  title: { fontSize: "26px", fontWeight: 700 },
  subtitle: { color: "#cbd5f5", marginTop: "4px" },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.4fr)",
    gap: "16px",
    height: "calc(100% - 80px)",
    minHeight: 0,
  },
  card: {
    borderRadius: "16px",
    background: "rgba(15, 23, 42, 0.8)",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: 0,
  },
  label: {
    fontSize: "13px",
    color: "#e2e8f0",
    marginBottom: "4px",
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(148, 163, 184, 0.7)",
    background: "rgba(15, 23, 42, 0.8)",
    color: "white",
    fontSize: "13px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "140px",
    resize: "vertical",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.7)",
    background: "rgba(15, 23, 42, 0.8)",
    color: "white",
    padding: "10px 12px",
    fontSize: "13px",
    outline: "none",
  },
  actionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },
  button: {
    borderRadius: "999px",
    padding: "8px 18px",
    border: "none",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    background:
      "linear-gradient(135deg, rgba(56,189,248,0.9), rgba(129,140,248,0.95))",
    color: "#0b1120",
    boxShadow: "0 12px 30px rgba(59,130,246,0.55)",
  },
  status: { fontSize: "12px", color: "#94a3b8" },
  logsContainer: {
    flex: 1,
    borderRadius: "12px",
    background: "rgba(15, 23, 42, 0.75)",
    border: "1px solid rgba(30, 64, 175, 0.7)",
    padding: "10px",
    overflowY: "auto",
    fontSize: "13px",
  },
  logItem: {
    padding: "10px 10px",
    borderRadius: "10px",
    marginBottom: "8px",
    background: "rgba(15, 23, 42, 0.9)",
    border: "1px solid rgba(51, 65, 85, 0.9)",
  },
  logMeta: {
    fontSize: "11px",
    color: "#9ca3af",
    marginBottom: "4px",
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
  },
  logUser: { marginBottom: "4px" },
  logUserLabel: { fontSize: "11px", color: "#e5e7eb", fontWeight: 600 },
  logUserText: { fontSize: "13px" },
  logAgentLabel: { fontSize: "11px", color: "#a5b4fc", fontWeight: 600 },
  logAgentText: { fontSize: "13px", color: "#e5e7eb" },
  jsonRaw: {
    marginTop: "6px",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "11px",
    color: "#9ca3af",
    whiteSpace: "pre-wrap",
    background: "rgba(15,23,42,0.9)",
    borderRadius: "6px",
    padding: "6px 8px",
  },
};

export default function ChatPage() {
  const [selectedAgent, setSelectedAgent] = useState("Radar");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  async function handleSend() {
    setError("");

    if (!selectedAgent) {
      setError("Sélectionne un agent avant d'envoyer.");
      return;
    }

    if (!input.trim() && selectedAgent !== "Radar") {
      setError("Ajoute un message pour cet agent.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent: selectedAgent,
          input: input || null,
          context: {},
        }),
      });

      const json = await response.json();

      if (!json.ok) {
        throw new Error(json.error || "Réponse invalide de l'API");
      }

      const result = json.result || {};
      const timestamp = new Date().toISOString();

      setLogs((prev) => [
        {
          id: `${timestamp}-${prev.length + 1}`,
          timestamp,
          agent: result.agent || selectedAgent,
          type: result.type || "unknown",
          message: result.message || "",
          input: input,
          raw: result,
        },
        ...prev,
      ]);

      if (selectedAgent !== "Radar") {
        setInput("");
      }
    } catch (err) {
      console.error("[ChatPage] Error calling /api/agent", err);
      setError(err.message || "Erreur lors de l'appel à l'agent.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ShellLayout>
      <main style={styles.main}>
        <header style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Hub des agents</h1>
            <p style={styles.subtitle}>
              Choisis un agent, envoie un contexte, laisse Sync GPT Hub faire le reste.
            </p>
          </div>
        </header>

        <section style={styles.layout}>
          {/* PANEL GAUCHE : INPUT */}
          <div style={styles.card}>
            <div>
              <label style={styles.label}>Agent</label>
              <select
                style={styles.select}
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                {AGENTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={styles.label}>Message / Contexte</label>
              <textarea
                style={styles.textarea}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  selectedAgent === "Radar"
                    ? "Tu peux laisser vide : Radar renverra juste l'état du pipeline."
                    : "Décris le besoin pour cet agent (ex: \"Rédige un script de relance pour Studio Nord\")."
                }
              />
            </div>

            <div style={styles.actionsRow}>
              <span style={styles.status}>
                {loading
                  ? "L'agent réfléchit..."
                  : "Prêt. Choisis un agent, envoie un message."}
                {error ? " — " + error : ""}
              </span>
              <button
                type="button"
                style={styles.button}
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? "En cours..." : "Envoyer à l'agent"}
              </button>
            </div>
          </div>

          {/* PANEL DROIT : LOGS */}
          <div style={styles.card}>
            <h2 style={{ fontSize: "16px", fontWeight: 600 }}>
              Historique des appels
            </h2>
            <div style={styles.logsContainer}>
              {logs.length === 0 && (
                <p style={{ fontSize: "13px", color: "#94a3b8" }}>
                  Aucun appel pour l&apos;instant. Lance d&apos;abord Radar pour
                  voir l&apos;état du pipeline, puis teste Sales / Prospection.
                </p>
              )}

              {logs.map((log) => (
                <div key={log.id} style={styles.logItem}>
                  <div style={styles.logMeta}>
                    <span>
                      {new Date(log.timestamp).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      — {log.agent} ({log.type})
                    </span>
                  </div>

                  {log.input && (
                    <div style={styles.logUser}>
                      <div style={styles.logUserLabel}>Toi</div>
                      <div style={styles.logUserText}>{log.input}</div>
                    </div>
                  )}

                  {log.message && (
                    <div>
                      <div style={styles.logAgentLabel}>Agent</div>
                      <div style={styles.logAgentText}>{log.message}</div>
                    </div>
                  )}

                  <div style={styles.jsonRaw}>
                    {JSON.stringify(log.raw, null, 2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ShellLayout>
  );
}
