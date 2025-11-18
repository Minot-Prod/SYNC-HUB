import React, { useState } from "react";
import ShellLayout from "../../components/ShellLayout";
import SachaHeader from "../../components/SachaHeader";
import AgentGrid from "../../components/AgentGrid";
import TodoWidget from "../../components/TodoWidget";
import {
  listOpportunities,
  getOpportunitiesStats,
} from "../../lib/services/opportunitiesService";

export async function getServerSideProps() {
  const opportunities = listOpportunities();
  const stats = getOpportunitiesStats();
  return { props: { opportunities, stats } };
}

const defaultStats = {
  total: 0,
  byStage: {},
  totalPipelineValue: 0,
  totalWonValue: 0,
};

export default function DashboardPage(props) {
  const safeOpportunities = props.opportunities || [];
  const safeStats = props.stats || defaultStats;
  const { byStage } = safeStats;

  const [dailySuggestions, setDailySuggestions] = useState([]);

  const upcomingActions = [...safeOpportunities]
    .filter((o) => o.nextActionDate)
    .sort(
      (a, b) =>
        new Date(a.nextActionDate).getTime() -
        new Date(b.nextActionDate).getTime()
    )
    .slice(0, 3);

  const hotDeals = [...safeOpportunities]
    .map((o) => ({
      ...o,
      score: (o.valueCAD || 0) * (o.probability || 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <ShellLayout>
      <main
        style={{
          padding: "24px",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          color: "white",
        }}
      >
        {/* Sacha coach */}
        <SachaHeader onSuggestionsChange={setDailySuggestions} />

        {/* Grille d’agents IA */}
        <AgentGrid />

        {/* Stats & placeholders CRM */}
        <section style={{ marginTop: "24px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Stats & CRM – à venir
          </h2>

          {/* Cartes placeholders */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(148,163,184,0.5)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#facc15",
                  textAlign: "right",
                  marginBottom: "4px",
                }}
              >
                Prochaine étape
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
                Revenus & pipeline
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#e5e7eb",
                  marginTop: "8px",
                }}
              >
                À venir : connecte ton CRM pour voir le vrai chiffre d’affaires
                et la valeur du pipeline.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(148,163,184,0.5)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
                Nouveaux leads
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#e5e7eb",
                  marginTop: "8px",
                }}
              >
                À venir : Sync listera automatiquement les nouveaux leads créés
                chaque jour.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(148,163,184,0.5)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
                Taux de conversion
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#e5e7eb",
                  marginTop: "8px",
                }}
              >
                À venir : visualise ton taux de transformation par étape du
                pipeline.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(148,163,184,0.5)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
                Activité équipe
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#e5e7eb",
                  marginTop: "8px",
                }}
              >
                À venir : vue d’ensemble des appels, emails et rendez-vous de
                l’équipe.
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              marginBottom: "16px",
            }}
          >
            Disponible dans la version connectée à HubSpot.
          </p>

          {/* On garde le bloc Prochaines actions / Deals chauds + tableau
              pour que le tableau d’opportunités démo continue d’exister */}
          <div
            style={{
              marginTop: "8px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(148, 163, 184, 0.4)",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
                Prochaines actions
              </h3>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                Les 3 prochaines actions à traiter, triées par échéance.
              </p>
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {upcomingActions.length === 0 && (
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Aucune prochaine action planifiée.
                  </p>
                )}
                {upcomingActions.map((opp) => (
                  <div key={opp.id}>
                    <div
                      style={{ fontSize: "13px", fontWeight: 600 }}
                    >
                      {opp.client}
                    </div>
                    <div
                      style={{ fontSize: "11px", color: "#9ca3af" }}
                    >
                      {opp.title}
                      <br />
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: "999px",
                          border:
                            "1px solid rgba(148,163,184,0.6)",
                          fontSize: "11px",
                          marginRight: "6px",
                        }}
                      >
                        {opp.stage}
                      </span>
                      <span>
                        {opp.nextActionDate} — {opp.nextAction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(148, 163, 184, 0.4)",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
                Deals les plus chauds
              </h3>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                Triés par valeur × probabilité (score de chaleur).
              </p>
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {hotDeals.length === 0 && (
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Aucun deal chaud détecté pour l'instant.
                  </p>
                )}
                {hotDeals.map((opp) => (
                  <div key={opp.id}>
                    <div
                      style={{ fontSize: "13px", fontWeight: 600 }}
                    >
                      {opp.client} —{" "}
                      {opp.valueCAD.toLocaleString("fr-CA", {
                        style: "currency",
                        currency: "CAD",
                      })}
                    </div>
                    <div
                      style={{ fontSize: "11px", color: "#9ca3af" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: "999px",
                          border:
                            "1px solid rgba(148,163,184,0.6)",
                          fontSize: "11px",
                          marginRight: "6px",
                        }}
                      >
                        {opp.stage}
                      </span>
                      Probabilité :{" "}
                      {(opp.probability * 100).toFixed(0)}% • Score :{" "}
                      {opp.score.toLocaleString("fr-FR")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tableau d’opportunités */}
          <div
            style={{
              marginTop: "24px",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(148, 163, 184, 0.4)",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)",
              padding: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Opportunités récentes
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#e2e8f0",
                        borderBottom:
                          "1px solid rgba(148, 163, 184, 0.4)",
                        fontWeight: 500,
                      }}
                    >
                      Client
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#e2e8f0",
                        borderBottom:
                          "1px solid rgba(148, 163, 184, 0.4)",
                        fontWeight: 500,
                      }}
                    >
                      Intitulé
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#e2e8f0",
                        borderBottom:
                          "1px solid rgba(148, 163, 184, 0.4)",
                        fontWeight: 500,
                      }}
                    >
                      Stage
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#e2e8f0",
                        borderBottom:
                          "1px solid rgba(148, 163, 184, 0.4)",
                        fontWeight: 500,
                      }}
                    >
                      Valeur
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#e2e8f0",
                        borderBottom:
                          "1px solid rgba(148, 163, 184, 0.4)",
                        fontWeight: 500,
                      }}
                    >
                      Prochaine action
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#e2e8f0",
                        borderBottom:
                          "1px solid rgba(148, 163, 184, 0.4)",
                        fontWeight: 500,
                      }}
                    >
                      Échéance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {safeOpportunities.length === 0 && (
                    <tr>
                      <td
                        style={{
                          padding: "16px 12px",
                          textAlign: "center",
                          color: "#94a3b8",
                        }}
                        colSpan={6}
                      >
                        Aucune opportunité pour l'instant.
                      </td>
                    </tr>
                  )}
                  {safeOpportunities.map((opp) => (
                    <tr key={opp.id} style={{ cursor: "default" }}>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom:
                            "1px solid rgba(30, 41, 59, 0.9)",
                        }}
                      >
                        {opp.client}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom:
                            "1px solid rgba(30, 41, 59, 0.9)",
                        }}
                      >
                        {opp.title}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom:
                            "1px solid rgba(30, 41, 59, 0.9)",
                        }}
                      >
                        {opp.stage}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom:
                            "1px solid rgba(30, 41, 59, 0.9)",
                        }}
                      >
                        {opp.valueCAD.toLocaleString("fr-CA", {
                          style: "currency",
                          currency: "CAD",
                        })}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom:
                            "1px solid rgba(30, 41, 59, 0.9)",
                        }}
                      >
                        {opp.nextAction}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom:
                            "1px solid rgba(30, 41, 59, 0.9)",
                        }}
                      >
                        {opp.nextActionDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Plan de la journée / To-do intelligente */}
        <TodoWidget suggestions={dailySuggestions} />
      </main>
    </ShellLayout>
  );
}
