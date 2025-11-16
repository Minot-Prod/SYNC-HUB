import React, { useEffect, useState } from "react";
import ShellLayout from "@/components/ShellLayout";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/analytics");
        if (!res.ok) {
          throw new Error("Erreur API analytics");
        }
        const json = await res.json();
        setMetrics(json);
      } catch (err) {
        console.error("[Dashboard] load error:", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <ShellLayout title="Dashboard Sync GPT Hub">
      <div
        style={{
          minHeight: "100vh",
          padding: "24px 26px",
          background:
            "radial-gradient(circle at top left, #020617 0, #020617 45%, #000000 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              Cockpit Sync GPT Hub
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(148,163,184,0.95)",
                maxWidth: "520px",
              }}
            >
              Vue d?ensemble de ton pipeline commercial. Sacha agent Assistant
              principal coordonne les agents (L?o, Maya, Eliot, Zo?, Nova) pour
              t?aider ? savoir quoi traiter maintenant.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <button
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.7)",
                background: "rgba(15,23,42,0.98)",
                color: "#e5e7eb",
                fontSize: "13px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = "/agents";
              }}
            >
              Voir les agents
            </button>
            <button
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cf6)",
                color: "#020617",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = "/opportunities";
              }}
            >
              Voir le pipeline complet
            </button>
          </div>
        </header>

        {loading && (
          <div
            style={{
              marginBottom: "16px",
              fontSize: "13px",
              color: "rgba(148,163,184,0.9)",
            }}
          >
            Chargement des KPIs?
          </div>
        )}

        {error && (
          <div
            style={{
              marginBottom: "16px",
              fontSize: "13px",
              color: "#f97373",
            }}
          >
            {error}
          </div>
        )}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              borderRadius: "16px",
              padding: "16px 18px",
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(15,23,42,0.95))",
              border: "1px solid rgba(148,163,184,0.4)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(148,163,184,0.9)",
                marginBottom: "6px",
              }}
            >
              Opportunit?s totales
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 600,
              }}
            >
              {metrics ? metrics.totalCount : "?"}
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "13px",
                color: "rgba(148,163,184,0.9)",
              }}
            >
              Toutes les opportunit?s suivies par le Hub.
            </div>
          </div>

          <div
            style={{
              borderRadius: "16px",
              padding: "16px 18px",
              background:
                "linear-gradient(135deg, rgba(96,165,250,0.18), rgba(15,23,42,0.95))",
              border: "1px solid rgba(147,197,253,0.4)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(148,163,184,0.9)",
                marginBottom: "6px",
              }}
            >
              Opportunit?s ouvertes
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 600,
              }}
            >
              {metrics ? metrics.pipelineCount : "?"}
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "13px",
                color: "rgba(148,163,184,0.9)",
              }}
            >
              Deals encore actifs dans ton pipeline.
            </div>
          </div>

          <div
            style={{
              borderRadius: "16px",
              padding: "16px 18px",
              background:
                "linear-gradient(135deg, rgba(52,211,153,0.18), rgba(15,23,42,0.95))",
              border: "1px solid rgba(52,211,153,0.45)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(148,163,184,0.9)",
                marginBottom: "6px",
              }}
            >
              Deals gagn?s
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 600,
              }}
            >
              {metrics ? metrics.wonCount : "?"}
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "13px",
                color: "rgba(148,163,184,0.9)",
              }}
            >
              Opportunit?s marqu?es Closed Won.
            </div>
          </div>

          <div
            style={{
              borderRadius: "16px",
              padding: "16px 18px",
              background:
                "linear-gradient(135deg, rgba(192,132,252,0.18), rgba(15,23,42,0.95))",
              border: "1px solid rgba(192,132,252,0.45)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(148,163,184,0.9)",
                marginBottom: "6px",
              }}
            >
              Valeur pipeline
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 600,
              }}
            >
              {metrics
                ? metrics.pipelineValue.toLocaleString("fr-CA", {
                    style: "currency",
                    currency: "CAD",
                    maximumFractionDigits: 0,
                  })
                : "?"}
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "13px",
                color: "rgba(148,163,184,0.9)",
              }}
            >
              Montant estim? des opportunit?s ouvertes.
            </div>
          </div>
        </section>
      </div>
    </ShellLayout>
  );
}
