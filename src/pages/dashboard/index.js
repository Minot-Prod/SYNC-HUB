// src/pages/dashboard/index.js

import React from 'react';
import Link from 'next/link';
const {
  listOpportunities,
  getOpportunitiesStats,
} = require('../../lib/services/opportunitiesService');

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

export default function DashboardPage({ opportunities, stats }) {
  const { total, byStage, totalPipelineValue, totalWonValue } = stats;

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Sync GPT Hub – Dashboard</h1>
          <p className="dashboard-subtitle">
            Vue consolidée des opportunités & de la performance commerciale.
          </p>
        </div>
        <nav className="dashboard-nav">
          <Link href="/opportunities" className="nav-link">
            Voir toutes les opportunités
          </Link>
        </nav>
      </header>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Total opportunités</h2>
          <p className="card-main-number">{total}</p>
          <p className="card-caption">Tous stages confondus</p>
        </article>

        <article className="dashboard-card">
          <h2>Valeur pipeline (hors deals gagnés)</h2>
          <p className="card-main-number">
            {totalPipelineValue.toLocaleString('fr-FR')} €
          </p>
          <p className="card-caption">Prospection / proposition / négociation</p>
        </article>

        <article className="dashboard-card">
          <h2>Valeur deals gagnés</h2>
          <p className="card-main-number">
            {totalWonValue.toLocaleString('fr-FR')} €
          </p>
          <p className="card-caption">Cumul closed-won</p>
        </article>

        <article className="dashboard-card">
          <h2>Par stage</h2>
          <ul className="stage-list">
            {Object.entries(byStage).map(([stage, count]) => (
              <li key={stage}>
                <span className="stage-label">{stage}</span>
                <span className="stage-count">{count}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dashboard-table-section">
        <div className="dashboard-table-header">
          <h2>Opportunités récentes</h2>
          <p className="dashboard-subtitle">
            Aperçu des dernières opportunités chargées depuis le JSON Store (Palier A).
          </p>
        </div>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Intitulé</th>
                <th>Stage</th>
                <th>Valeur</th>
                <th>Prochaine action</th>
                <th>Échéance</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id}>
                  <td>{opp.client}</td>
                  <td>{opp.title}</td>
                  <td>{opp.stage}</td>
                  <td>{opp.valueEUR.toLocaleString('fr-FR')} €</td>
                  <td>{opp.nextAction}</td>
                  <td>{opp.nextActionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
