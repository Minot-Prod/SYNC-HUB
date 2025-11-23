import React from "react";
import Link from "next/link";

export default function Home() {
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
      <section style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 700, marginBottom: "1rem" }}>
          Le cockpit IA qui prépare vos rendez-vous de vente en 10 secondes.
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "2rem" }}>
          Sync-Hub lit vos données existantes (CRM, emails, notes) et sert à chaque commercial un brief clair avant son rendez-vous.
          Pas une nouvelle usine à gaz, juste un compagnon IA focalisé sur le chiffre.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <Link href="/dashboard" legacyBehavior>
            <a
              style={{
                padding: "0.9rem 1.6rem",
                borderRadius: "999px",
                background: "linear-gradient(90deg,#06b6d4,#6366f1)",
                color: "white",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Ouvrir le cockpit IA Sync-Hub
            </a>
          </Link>
          <a
            href="#pilote-90-jours"
            style={{
              padding: "0.9rem 1.6rem",
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.4)",
              color: "white",
              textDecoration: "none",
            }}
          >
            Découvrir le pilote 90 jours
          </a>
        </div>
      </section>
    </main>
  );
}
