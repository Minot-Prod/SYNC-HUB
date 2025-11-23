import React from "react";

const cockpitUrl =
  process.env.NEXT_PUBLIC_SYNC_HUB_COCKPIT_URL ||
  "https://sync-hub-sales-ai-cockpit-8b4fc3f5.base44.app";

const homeUrl = "/";

export default function Dashboard() {
  return (
{/* BIG_BRAND_HEADER */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2.5rem",
    paddingBottom: "2rem",
    gap: "0.6rem",
    textAlign: "center"
  }}
>
  <img
    src="/sync-logo.png"
    alt="SYNC Productions"
    style={{
      height: "180px",
      width: "auto",
      display: "block",
      margin: "0 auto",
      filter: "drop-shadow(0 0 20px rgba(255,255,255,0.25))"
    }}
  />
  <div style={{ fontSize: "0.95rem", opacity: 0.8 }}>
    Powered by Parlios Engine
  </div>
</div>
{/* /BIG_BRAND_HEADER */}
<main
      style={{
        minHeight: "100vh",
        padding: "3.5rem 1.5rem 4rem",
        background: "#020617",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {/* Header brandé Sync + Parlios */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <img
              src="/sync-logo.png"
              alt="Sync Productions"
              style={{ height: "40px", objectFit: "contain" }}
            />
            <div
              style={{
                height: "28px",
                width: "1px",
                background: "rgba(148,163,184,0.5)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "0.8rem",
                lineHeight: 1.3,
              }}
            >
              <span style={{ opacity: 0.9 }}>Sync-Hub</span>
              <span style={{ opacity: 0.6 }}>Cockpit IA des équipes de vente</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              opacity: 0.85,
            }}
          >
            <span style={{ opacity: 0.7 }}>Propulsé par</span>
            <img
              src="/parlios-logo.png"
              alt="Parlios OS"
              style={{ height: "32px", objectFit: "contain" }}
            />
          </div>
        </header>

        {/* Bloc texte cockpit */}
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: 700,
            marginBottom: "1.2rem",
          }}
        >
          Cockpit IA Sync-Hub
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            opacity: 0.9,
            marginBottom: "1.4rem",
            maxWidth: "52rem",
          }}
        >
          Voici la version actuelle du cockpit IA Sync-Hub. C&apos;est ici que vos
          commerciaux préparent leurs rendez-vous, gèrent les objections et
          génèrent leurs follow-ups.
        </p>

        <p
          style={{
            fontSize: "0.98rem",
            opacity: 0.8,
            marginBottom: "2.4rem",
            maxWidth: "52rem",
          }}
        >
          Pendant un pilote 90 jours, ce cockpit est ouvert dans une fenêtre dédiée
          et relié à vos propres données (CRM, emails, notes), avec des règles de
          sécurité définies ensemble.
        </p>

        {/* Boutons d'action */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
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
              fontSize: "0.98rem",
              boxShadow: "0 18px 40px rgba(37,99,235,0.45)",
              border: "1px solid rgba(56,189,248,0.6)",
              whiteSpace: "nowrap",
            }}
          >
            Ouvrir le cockpit IA Sync-Hub dans un nouvel onglet
          </a>

          <a
            href={homeUrl}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.85rem 1.4rem",
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.5)",
              color: "rgba(248,250,252,0.9)",
              background:
                "radial-gradient(circle at top left, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
              textDecoration: "none",
              fontSize: "0.95rem",
              gap: "0.4rem",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>←</span>
            <span>Revenir au site Sync-Hub</span>
          </a>
        </div>

        <p
          style={{
            fontSize: "0.85rem",
            opacity: 0.7,
            maxWidth: "48rem",
          }}
        >
          Accès réservé aux comptes autorisés. Les actions réalisées dans le
          cockpit peuvent être tracées (logs d&apos;audit) selon la configuration
          mise en place dans votre environnement.
        </p>
      </section>
    </main>
  );
}