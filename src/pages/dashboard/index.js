import React from "react";
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

  const { total, byStage, totalPipelineValue, totalWonValue } = safeStats;

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
      <main style={{ padding: "24px", width: "100%", height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: "32px", color: "white" }}>
        {/* Section Sacha + Plan */}
        <SachaHeader />

        {/* Section Grille Agents */}
        <AgentGrid />

        {/* Section Stats Beta */}
        <section style={{ marginTop: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
            Stats CRM – bêta (à venir)
          </h2>
          {/* Cartes métriques */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
            <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(148, 163, 184, 0.4)", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Total opportunités</h3>
              <p style={{ marginTop: "8px", fontSize: "24px", fontWeight: 700 }}>{total}</p>
              <p style={{ marginTop: "4px", fontSize: "11px", color: "#94a3b8" }}>Tous stages confondus</p>
            </div>
            <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(148, 163, 184, 0.4)", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Pipeline (hors deals gagnés)</h3>
              <p style={{ marginTop: "8px", fontSize: "24px", fontWeight: 700 }}>
                {totalPipelineValue.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}
              </p>
              <p style={{ marginTop: "4px", fontSize: "11px", color: "#94a3b8" }}>Prospection / proposition / négociation</p>
            </div>
            <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(148, 163, 184, 0.4)", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Valeur deals gagnés</h3>
              <p style={{ marginTop: "8px", fontSize: "24px", fontWeight: 700 }}>
                {totalWonValue.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}
              </p>
              <p style={{ marginTop: "4px", fontSize: "11px", color: "#94a3b8" }}>Cumul closed-won</p>
            </div>
            <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(148, 163, 184, 0.4)", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Par stage</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0 0", fontSize: "13px" }}>
                {Object.entries(byStage).map(([stage, count]) => (
                  <li key={stage} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(148, 163, 184, 0.25)", padding: "4px 0" }}>
                    <span>{stage}</span>
                    <span>{count}</span>
                  </li>
                ))}
                {Object.keys(byStage).length === 0 && (
                  <li style={{ fontSize: "11px", color: "#94a3b8", marginTop: 4 }}>
                    Aucune donnée pour l'instant.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Panneau actions & deals chauds */}
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(148, 163, 184, 0.4)", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Prochaines actions</h3>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>Les 3 prochaines actions à traiter, triées par échéance.</p>
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {upcomingActions.length === 0 && (
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>Aucune prochaine action planifiée.</p>
                )}
                {upcomingActions.map((opp) => (
                  <div key={opp.id}>
                    <div style={{ fontSize: "13px", fontWeight: 600 }}>{opp.client}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                      {opp.title}
                      <br />
                      <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.6)", fontSize: "11px", marginRight: "6px" }}>
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
            <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(148, 163, 184, 0.4)", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Deals les plus chauds</h3>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>Triés par valeur × probabilité (score de chaleur).</p>
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {hotDeals.length === 0 && (
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>Aucun deal chaud détecté pour l'instant.</p>
                )}
                {hotDeals.map((opp) => (
                  <div key={opp.id}>
                    <div style={{ fontSize: "13px", fontWeight: 600 }}>
                      {opp.client} — {opp.valueCAD.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                      <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.6)", fontSize: "11px", marginRight: "6px" }}>
                        {opp.stage}
                      </span>
                      Probabilité : {(opp.probability * 100).toFixed(0)}% • Score :{" "}
                      {opp.score.toLocaleString("fr-FR")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tableau opportunités */}
          <div style={{ marginTop: "24px", borderRadius: "16px", background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(148, 163, 184, 0.4)", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>Opportunités récentes</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#e2e8f0", borderBottom: "1px solid rgba(148, 163, 184, 0.4)", fontWeight: 500 }}>Client</th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#e2e8f0", borderBottom: "1px solid rgba(148, 163, 184, 0.4)", fontWeight: 500 }}>Intitulé</th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#e2e8f0", borderBottom: "1px solid rgba(148, 163, 184, 0.4)", fontWeight: 500 }}>Stage</th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#e2e8f0", borderBottom: "1px solid rgba(148, 163, 184, 0.4)", fontWeight: 500 }}>Valeur</th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#e2e8f0", borderBottom: "1px solid rgba(148, 163, 184, 0.4)", fontWeight: 500 }}>Prochaine action</th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#e2e8f0", borderBottom: "1px solid rgba(148, 163, 184, 0.4)", fontWeight: 500 }}>Échéance</th>
                  </tr>
                </thead>
                <tbody>
                  {safeOpportunities.length === 0 && (
                    <tr>
                      <td style={{ padding: "16px 12px", textAlign: "center", color: "#94a3b8" }} colSpan={6}>
                        Aucune opportunité pour l'instant.
                      </td>
                    </tr>
                  )}
                  {safeOpportunities.map((opp) => (
                    <tr key={opp.id} style={{ cursor: "default" }}>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30, 41, 59, 0.9)" }}>{opp.client}</td>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30, 41, 59, 0.9)" }}>{opp.title}</td>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30, 41, 59, 0.9)" }}>{opp.stage}</td>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30, 41, 59, 0.9)" }}>
                        {opp.valueCAD.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}
                      </td>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30, 41, 59, 0.9)" }}>{opp.nextAction}</td>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30, 41, 59, 0.9)" }}>{opp.nextActionDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section To-do */}
        <TodoWidget />
      </main>
    </ShellLayout>
  );
}
