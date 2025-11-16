// src/pages/dashboard/index.js

import React from "react";
import ShellLayout from "../../components/ShellLayout";
import {
  listOpportunities,
  getOpportunitiesStats,
} from "../../lib/services/opportunitiesService";

export async function getServerSideProps() {
  const opportunities = listOpportunities();
  const stats = getOpportunitiesStats();

  return {
    props: {
      opportunities,
      stats,
    },
  };
}

const defaultStats = {
  total: 0,
  byStage: {},
  totalPipelineValue: 0,
  totalWonValue: 0,
};

const layoutStyles = {
  main: {
    padding: "24px",
    width: "100%",
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    color: "white",
  },
  headerTitle: { fontSize: "28px", fontWeight: 700 },
  headerSubtitle: { color: "#cbd5f5", marginTop: "4px" },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
  },
  card: {
    padding: "16px",
    borderRadius: "16px",
    background: "rgba(15, 23, 42, 0.75)",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)",
  },
  cardTitle: { fontSize: "16px", fontWeight: 600 },
  cardNumberMain: { marginTop: "8px", fontSize: "26px", fontWeight: 700 },
  cardCaption: {
    marginTop: "4px",
    fontSize: "11px",
    color: "#94a3b8",
  },
  stageList: {
    listStyle: "none",
    padding: 0,
    margin: "8px 0 0 0",
    fontSize: "13px",
  },
  stageRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
    padding: "4px 0",
  },
  tableSection: {
    borderRadius: "16px",
    background: "rgba(15, 23, 42, 0.75)",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.7)",
    padding: "24px",
  },
  tableWrapper: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    color: "#e2e8f0",
    borderBottom: "1px solid rgba(148, 163, 184, 0.4)",
    fontWeight: 500,
  },
  td: {
    padding: "8px 12px",
    borderBottom: "1px solid rgba(30, 41, 59, 0.9)",
  },
  rowHover: {
    cursor: "default",
  },
  emptyRow: {
    padding: "16px 12px",
    textAlign: "center",
    color: "#94a3b8",
  },
};

export default function DashboardPage(props) {
  const safeOpportunities = props.opportunities || [];
  const safeStats = props.stats || defaultStats;

  const { total, byStage, totalPipelineValue, totalWonValue } = safeStats;

  return (
    <ShellLayout>
      <main style={layoutStyles.main}>
        <header>
          <h1 style={layoutStyles.headerTitle}>Sync GPT Hub – Dashboard</h1>
          <p style={layoutStyles.headerSubtitle}>
            Vue consolidée des opportunités &amp; de la performance commerciale.
          </p>
        </header>

        {/* CARTES MÉTRIQUES */}
        <section style={layoutStyles.metricsGrid}>
          <div style={layoutStyles.card}>
            <h2 style={layoutStyles.cardTitle}>Total opportunités</h2>
            <p style={layoutStyles.cardNumberMain}>{total}</p>
            <p style={layoutStyles.cardCaption}>Tous stages confondus</p>
          </div>

          <div style={layoutStyles.card}>
            <h2 style={layoutStyles.cardTitle}>
              Pipeline (hors deals gagnés)
            </h2>
            <p style={layoutStyles.cardNumberMain}>
              {totalPipelineValue.toLocaleString("fr-FR")} €
            </p>
            <p style={layoutStyles.cardCaption}>
              Prospection / proposition / négociation
            </p>
          </div>

          <div style={layoutStyles.card}>
            <h2 style={layoutStyles.cardTitle}>Valeur deals gagnés</h2>
            <p style={layoutStyles.cardNumberMain}>
              {totalWonValue.toLocaleString("fr-FR")} €
            </p>
            <p style={layoutStyles.cardCaption}>Cumul closed-won</p>
          </div>

          <div style={layoutStyles.card}>
            <h2 style={layoutStyles.cardTitle}>Par stage</h2>
            <ul style={layoutStyles.stageList}>
              {Object.entries(byStage).map(([stage, count]) => (
                <li key={stage} style={layoutStyles.stageRow}>
                  <span>{stage}</span>
                  <span>{count}</span>
                </li>
              ))}
              {Object.keys(byStage).length === 0 && (
                <li style={{ fontSize: "11px", color: "#94a3b8", marginTop: 4 }}>
                  Aucune donnée pour l&apos;instant.
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* TABLEAU OPPORTUNITÉS */}
        <section style={layoutStyles.tableSection}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
            Opportunités récentes
          </h2>

          <div style={layoutStyles.tableWrapper}>
            <table style={layoutStyles.table}>
              <thead>
                <tr>
                  <th style={layoutStyles.th}>Client</th>
                  <th style={layoutStyles.th}>Intitulé</th>
                  <th style={layoutStyles.th}>Stage</th>
                  <th style={layoutStyles.th}>Valeur</th>
                  <th style={layoutStyles.th}>Prochaine action</th>
                  <th style={layoutStyles.th}>Échéance</th>
                </tr>
              </thead>
              <tbody>
                {safeOpportunities.length === 0 && (
                  <tr>
                    <td style={layoutStyles.emptyRow} colSpan={6}>
                      Aucune opportunité pour l&apos;instant.
                    </td>
                  </tr>
                )}

                {safeOpportunities.map((opp) => (
                  <tr key={opp.id} style={layoutStyles.rowHover}>
                    <td style={layoutStyles.td}>{opp.client}</td>
                    <td style={layoutStyles.td}>{opp.title}</td>
                    <td style={layoutStyles.td}>{opp.stage}</td>
                    <td style={layoutStyles.td}>
                      {opp.valueEUR.toLocaleString("fr-FR")} €
                    </td>
                    <td style={layoutStyles.td}>{opp.nextAction}</td>
                    <td style={layoutStyles.td}>{opp.nextActionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </ShellLayout>
  );
}
