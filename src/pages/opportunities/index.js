import React, { useEffect, useState, useMemo } from "react";
import ShellLayout from "@/components/ShellLayout";

function formatStageLabel(stage) {
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

export default function OpportunitiesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stageFilter, setStageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/opportunities");
        if (!res.ok) {
          throw new Error("Erreur API opportunities");
        }
        const json = await res.json();
        const list = Array.isArray(json) ? json : [];
        const sorted = [...list].sort((a, b) => {
          const da = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const db = new Date(b.createdAt || b.updatedAt || 0).getTime();
          return db - da;
        });
        setItems(sorted);
      } catch (err) {
        console.error("[OpportunitiesPage] load error:", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((opp) => {
      if (stageFilter !== "all") {
        const s = String(opp.stage || "");
        if (String(stageFilter) !== s) return false;
      }
      if (statusFilter !== "all") {
        const st = String(opp.status || "").toLowerCase();
        if (statusFilter === "open") {
          if (st !== "open") return false;
        } else if (statusFilter === "won") {
          if (!st.includes("won")) return false;
        } else if (statusFilter === "lost") {
          if (!st.includes("lost")) return false;
        }
      }
      return true;
    });
  }, [items, stageFilter, statusFilter]);

  const totalValue = useMemo(() => {
    return filtered.reduce((sum, opp) => {
      const v = Number(opp.value || 0);
      return sum + (Number.isNaN(v) ? 0 : v);
    }, 0);
  }, [filtered]);

  return (
    <ShellLayout title="Pipeline d'opportunit?s ? Sync GPT Hub">
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
            marginBottom: "20px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Pipeline des opportunit?s
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(148,163,184,0.95)",
                maxWidth: "520px",
              }}
            >
              Vue d?taill?e des opportunit?s suivies par le Hub. Ce tableau est
              aliment? par les agents (L?o pour la prospection, Eliot pour
              l?analyse, Zo? pour le radar, Maya pour les suivis).
            </p>
          </div>

          <button
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.7)",
              background: "rgba(15,23,42,0.98)",
              color: "#e5e7eb",
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Retour au dashboard
          </button>
        </header>

        {error && (
          <div
            style={{
              marginBottom: "12px",
              fontSize: "13px",
              color: "#f97373",
            }}
          >
            {error}
          </div>
        )}

        {/* Filtres + stats */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(148,163,184,0.9)",
                  marginBottom: "2px",
                }}
              >
                Stage
              </div>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(55,65,81,0.9)",
                  background: "rgba(15,23,42,0.98)",
                  color: "rgba(229,231,235,0.96)",
                  fontSize: "12px",
                }}
              >
                <option value="all">Tous</option>
                <option value="1">1 ? Nouveau</option>
                <option value="2">2 ? Qualif.</option>
                <option value="3">3 ? Proposition</option>
                <option value="4">4 ? N?gociation</option>
                <option value="5">5 ? Gagn?</option>
              </select>
            </div>

            <div>
              <div
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(148,163,184,0.9)",
                  marginBottom: "2px",
                }}
              >
                Statut
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(55,65,81,0.9)",
                  background: "rgba(15,23,42,0.98)",
                  color: "rgba(229,231,235,0.96)",
                  fontSize: "12px",
                }}
              >
                <option value="all">Tous</option>
                <option value="open">Ouvert</option>
                <option value="won">Gagn?</option>
                <option value="lost">Perdu</option>
              </select>
            </div>
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "rgba(148,163,184,0.95)",
              }}
            >
              Opportunit?s filtr?es :{" "}
              <span
                style={{
                  color: "#e5e7eb",
                  fontWeight: 600,
                }}
              >
                {filtered.length}
              </span>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(148,163,184,0.95)",
              }}
            >
              Valeur totale :{" "}
              <span
                style={{
                  color: "#e5e7eb",
                  fontWeight: 600,
                }}
              >
                {totalValue.toLocaleString("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Tableau pipeline */}
        <section
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(55,65,81,0.9)",
            background:
              "radial-gradient(circle at top left, rgba(15,23,42,0.98), rgba(15,23,42,0.94))",
            boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
            padding: "8px 10px",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "12px 4px",
                fontSize: "13px",
                color: "rgba(148,163,184,0.95)",
              }}
            >
              Chargement du pipeline?
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: "12px 4px",
                fontSize: "13px",
                color: "rgba(148,163,184,0.95)",
              }}
            >
              Aucune opportunit? pour ces filtres. Essaie d??largir les crit?res
              ou laisse les agents Sync remplir le pipeline.
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
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((opp) => (
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
                        {formatStageLabel(opp.stage)}
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
                      <td
                        style={{
                          padding: "8px 6px",
                          color: "rgba(148,163,184,0.95)",
                        }}
                      >
                        {opp.source || "?"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </ShellLayout>
  );
}
