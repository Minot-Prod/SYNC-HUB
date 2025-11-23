import React from "react";

const cockpitUrl =
  process.env.NEXT_PUBLIC_SYNC_HUB_COCKPIT_URL ||
  "https://sync-hub-sales-ai-cockpit-8b4fc3f5.base44.app";

export default function Dashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem",
        background: "#020617",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <section style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 700, marginBottom: "1rem" }}>
          Cockpit IA Sync-Hub
        </h1>
        <p style={{ fontSize: "1.05rem", opacity: 0.9, marginBottom: "1.5rem" }}>
          Voici la version actuelle du cockpit IA Sync-Hub. C&apos;est ici que vos
          commerciaux préparent leurs rendez-vous, gèrent les objections et
          génèrent leurs follow-ups.
        </p>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, marginBottom: "2rem" }}>
          Pendant un pilote 90 jours, ce cockpit est ouvert dans une fenêtre dédiée
          et relié à vos propres données (CRM, emails, notes), avec des règles de
          sécurité définies ensemble.
        </p>

        <a
          href={cockpitUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.9rem 1.8rem",
            borderRadius: "999px",
            background: "linear-gradient(90deg,#06b6d4,#6366f1)",
            color: "white",
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: "1.5rem",
          }}
        >
          Ouvrir le cockpit IA Sync-Hub dans un nouvel onglet
        </a>

        <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
          Accès réservé aux comptes autorisés. Les actions réalisées dans le
          cockpit peuvent être tracées (logs d&apos;audit) selon la configuration
          mise en place dans votre environnement.
        </p>
      </section>
    </main>
  );
}
