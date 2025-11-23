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
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <section style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 700, marginBottom: "1rem" }}>
          Cockpit IA Sync-Hub
        </h1>
        <p style={{ fontSize: "1.05rem", opacity: 0.9, marginBottom: "1.5rem" }}>
          Voici la version actuelle du cockpit IA Sync-Hub. C&apos;est ici que vos commerciaux
          préparent leurs rendez-vous, gèrent les objections et génèrent leurs follow-ups.
        </p>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, marginBottom: "2rem" }}>
          Pendant un pilote 90 jours, ce cockpit est relié à vos propres données (CRM, emails, notes),
          avec des règles de sécurité définies ensemble.
        </p>

        <div
          style={{
            marginTop: "1rem",
            height: "70vh",
            borderRadius: "1.25rem",
            overflow: "hidden",
            background: "#020617",
            border: "1px solid rgba(148,163,184,0.35)",
            boxShadow: "0 22px 45px rgba(15,23,42,0.9)",
          }}
        >
          <iframe
            src={cockpitUrl}
            title="Sync-Hub Sales AI Cockpit"
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="clipboard-write; microphone; camera; fullscreen"
          />
        </div>

        <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "1rem" }}>
          Accès réservé aux comptes autorisés. Les actions réalisées ici peuvent être tracées
          (logs d&apos;audit) selon la configuration mise en place dans votre environnement.
        </p>
      </section>
    </main>
  );
}
