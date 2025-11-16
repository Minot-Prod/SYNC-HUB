// src/pages/opportunities/index.js

import React from "react";
import Link from "next/link";
import ShellLayout from "../../components/ShellLayout";
import { listOpportunities } from "../../lib/services/opportunitiesService";

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
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "16px",
  },
  title: { fontSize: "26px", fontWeight: 700 },
  subtitle: { color: "#cbd5f5", marginTop: "4px" },
  backLink: {
    fontSize: "13px",
    color: "#cbd5f5",
    textDecoration: "none",
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
  badgeStage: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "999px",
    fontSize: "11px",
    border: "1px solid rgba(148, 163, 184, 0.6)",
  },
  emptyRow: {
    padding: "16px 12px",
    textAlign: "center",
    color: "#94a3b8",
  },
};

export async function getServerSideProps() {
  const opportunities = listOpportunities();

  return {
    props: {
      opportunities,
    },
  };
}

export default function OpportunitiesPage({ opportunities = [] }) {
  return (
    <ShellLayout>
      <main style={layoutStyles.main}>
        <header style={layoutStyles.headerRow}>
          <div>
            <h1 style={layoutStyles.title}>Opportunités</h1>
            <p style={layoutStyles.subtitle}>
              Vue détaillée de toutes les opportunités suivies dans Sync GPT Hub.
            </p>
          </div>
          <Link href="/dashboard" style={layoutStyles.backLink}>
            ← Retour au dashboard
          </Link>
        </header>

        <section style={layoutStyles.tableSection}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Liste complète
          </h2>

          <div style={layoutStyles.tableWrapper}>
            <table style={layoutStyles.table}>
              <thead>
                <tr>
                  <th style={layoutStyles.th}>ID</th>
                  <th style={layoutStyles.th}>Client</th>
                  <th style={layoutStyles.th}>Intitulé</th>
                  <th style={layoutStyles.th}>Stage</th>
                  <th style={layoutStyles.th}>Valeur</th>
                  <th style={layoutStyles.th}>Source</th>
                  <th style={layoutStyles.th}>Prochaine action</th>
                  <th style={layoutStyles.th}>Échéance</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.length === 0 && (
                  <tr>
                    <td style={layoutStyles.emptyRow} colSpan={8}>
                      Aucune opportunité pour l&apos;instant.
                    </td>
                  </tr>
                )}

                {opportunities.map((opp) => (
                  <tr key={opp.id} style={layoutStyles.rowHover}>
                    <td style={layoutStyles.td}>{opp.id}</td>
                    <td style={layoutStyles.td}>{opp.client}</td>
                    <td style={layoutStyles.td}>{opp.title}</td>
                    <td style={layoutStyles.td}>
                      <span style={layoutStyles.badgeStage}>{opp.stage}</span>
                    </td>
                    <td style={layoutStyles.td}>
                      {opp.valueEUR.toLocaleString("fr-FR")} €
                    </td>
                    <td style={layoutStyles.td}>{opp.source}</td>
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
