// src/pages/opportunities/index.js

import React from 'react';
import Link from 'next/link';
const { listOpportunities } = require('../../lib/services/opportunitiesService');

export async function getServerSideProps() {
  const opportunities = listOpportunities();

  return {
    props: {
      opportunities,
    },
  };
}

export default function OpportunitiesPage({ opportunities }) {
  return (
    <main className="opportunities-page">
      <header className="page-header">
        <h1>Opportunités</h1>
        <p className="page-subtitle">
          Liste complète des opportunités (Palier A – JSON store).
        </p>
        <Link href="/dashboard" className="nav-link">
          ← Retour au dashboard
        </Link>
      </header>

      <section className="dashboard-table-section">
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Intitulé</th>
                <th>Stage</th>
                <th>Valeur</th>
                <th>Source</th>
                <th>Prochaine action</th>
                <th>Échéance</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id}>
                  <td>{opp.id}</td>
                  <td>{opp.client}</td>
                  <td>{opp.title}</td>
                  <td>{opp.stage}</td>
                  <td>{opp.valueEUR.toLocaleString('fr-FR')} €</td>
                  <td>{opp.source}</td>
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
