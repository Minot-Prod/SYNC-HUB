import React, { useEffect, useState } from "react";
import ShellLayout from "@/components/ShellLayout";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [recentOpps, setRecentOpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [analyticsRes, oppsRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/opportunities"),
        ]);

        if (!analyticsRes.ok) {
          throw new Error("Erreur API analytics");
        }
        if (!oppsRes.ok) {
          throw new Error("Erreur API opportunities");
        }

        const analyticsJson = await analyticsRes.json();
        const oppsJson = await oppsRes.json();

        setMetrics(analyticsJson || null);

        const list = Array.isArray(oppsJson) ? oppsJson : [];
        const sorted = [...list].sort((a, b) => {
          const da = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const db = new Date(b.createdAt || b.updatedAt || 0).getTime();
          return db - da;
        });
        setRecentOpps(sorted.slice(0, 5));
      } catch (err) {
        console.error("[Dashboard] load error:", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function formatStage(stage) {
    const s = Number(stage || 0);
    if (s === 1) return "1 ? Nouveau";
    if (s === 2) return "2 ? Qualif.";
    if (s === 3) return "3 ? Proposition";
    if (s === 4) return "4 ? N?gociation";
    if (s === 5) return "5 ? Gagn?";
    return String(stage || "?");
  }

  function formatStatus(status) {
    if (!status) return "?";
    const s = String(status).toLowerCase();
    if (s.includes("won")) return "Gagn?";
    if (s.includes("lost")) return "Perdu";
    if (s === "open") return "Ouvert";
    return status;
  }

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
            Chargement des donn?es?
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

        {/* KPIs */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
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

        {/* Opportunit?s r?centes */}
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "2px",
                }}
              >
                Opportunit?s r?centes
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(148,163,184,0.95)",
                }}
              >
                Derni?res opportunit?s cr??es ou mises ? jour dans le Hub.
              </p>
            </div>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(75,85,99,0.9)",
                background: "rgba(15,23,42,0.98)",
                color: "rgba(209,213,219,0.95)",
                fontSize: "12px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                window.location.href = "/opportunities";
              }}
            >
              Ouvrir le pipeline
            </button>
          </div>

          <div
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(55,65,81,0.9)",
              background:
                "radial-gradient(circle at top left, rgba(15,23,42,0.98), rgba(15,23,42,0.94))",
              boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
              padding: "8px 10px",
            }}
          >
            {recentOpps.length === 0 ? (
              <div
                style={{
                  padding: "12px 4px",
                  fontSize: "13px",
                  color: "rgba(148,163,184,0.95)",
                }}
              >
                Aucune opportunit? r?cente trouv?e. Commence par cr?er des
                opportunit?s via l?agent Prospection ou directement dans le
                pipeline.
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        textAlign: "left",
                        color: "rgba(148,163,184,0.95)",
                      }}
                    >
                      <th
                        style={{
                          padding: "8px 6px",
                          fontWeight: 500,
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid rgba(31,41,55,0.9)",
                        }}
                      >
                        Opportunit?
                      </th>
                      <th
                        style={{
                          padding: "8px 6px",
                          fontWeight: 500,
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid rgba(31,41,55,0.9)",
                        }}
                      >
                        Stage
                      </th>
                      <th
                        style={{
                          padding: "8px 6px",
                          fontWeight: 500,
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid rgba(31,41,55,0.9)",
                        }}
                      >
                        Statut
                      </th>
                      <th
                        style={{
                          padding: "8px 6px",
                          fontWeight: 500,
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid rgba(31,41,55,0.9)",
                        }}
                      >
                        Valeur
                      </th>
                      <th
                        style={{
                          padding: "8px 6px",
                          fontWeight: 500,
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid rgba(31,41,55,0.9)",
                        }}
                      >
                        Propri?taire
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOpps.map((opp) => (
                      <tr
                        key={opp.id || `${opp.name}-${opp.createdAt}`}
                        style={{
                          borderBottom: "1px solid rgba(31,41,55,0.8)",
                        }}
                      >
                        <td
                          style={{
                            padding: "8px 6px",
                            color: "rgba(243,244,246,0.97)",
                          }}
                        >
                          {opp.name || "Sans nom"}
                        </td>
                        <td
                          style={{
                            padding: "8px 6px",
                            color: "rgba(209,213,219,0.95)",
                          }}
                        >
                          {formatStage(opp.stage)}
                        </td>
                        <td
                          style={{
                            padding: "8px 6px",
                            color: "rgba(209,213,219,0.95)",
                          }}
                        >
                          {formatStatus(opp.status)}
                        </td>
                        <td
                          style={{
                            padding: "8px 6px",
                            color: "rgba(209,213,219,0.95)",
                          }}
                        >
                          {typeof opp.value === "number"
                            ? opp.value.toLocaleString("fr-CA", {
                                style: "currency",
                                currency: "CAD",
                                maximumFractionDigits: 0,
                              })
                            : "?"}
                        </td>
                        <td
                          style={{
                            padding: "8px 6px",
                            color: "rgba(148,163,184,0.95)",
                          }}
                        >
                          {opp.owner || "Sync Team"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </ShellLayout>
  );
}
