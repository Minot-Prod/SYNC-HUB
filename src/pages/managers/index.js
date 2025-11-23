import React from "react";

export default function ManagersPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid rgba(148,163,184,0.35)",
          background: "rgba(15,23,42,0.96)",
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              Espace Managers / Direction
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              Sync-Hub & Parlios OS – vue direction
            </div>
          </div>
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              fontSize: "0.85rem",
            }}
          >
            <a
              href="/"
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.35)",
                textDecoration: "none",
                color: "rgba(226,232,240,0.9)",
              }}
            >
              Retour à la présentation Sync-Hub
            </a>
            <a
              href="#playground"
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.35)",
                textDecoration: "none",
                color: "rgba(226,232,240,0.9)",
              }}
            >
              Playground Parlios OS
            </a>
          </nav>
        </div>
      </header>

      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem 3rem",
        }}
      >
        <section style={{ marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            Comprendre Parlios OS, sans toucher à la technique.
          </h1>
          <p
            style={{
              fontSize: "1.02rem",
              opacity: 0.9,
              maxWidth: "760px",
            }}
          >
            Cet espace est conçu pour la direction de Sync. Il vous permet
            d&apos;explorer ce que Parlios OS peut faire pour vos ventes,
            votre support, vos opérations, vos finances… sans avoir accès
            aux paramètres techniques ni aux agents internes.
          </p>
        </section>

        <section id="playground" style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "1.4rem",
              marginBottom: "0.8rem",
              fontWeight: 600,
            }}
          >
            Playground Parlios OS – Direction Sync
          </h2>
          <p
            style={{
              fontSize: "0.98rem",
              opacity: 0.9,
              marginBottom: "1rem",
              maxWidth: "780px",
            }}
          >
            Le Playground Parlios OS – édition Sync est un espace d&apos;idéation
            guidée. Vous y parlez à un agent dédié, l&apos;
            <strong>Architecte Parlios OS – édition Sync</strong>, qui :
          </p>
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: "1.3rem",
              fontSize: "0.96rem",
              opacity: 0.92,
              marginBottom: "1.2rem",
            }}
          >
            <li>
              traduit votre contexte métier en cas d&apos;usage IA concrets ;
            </li>
            <li>
              propose des workflows et des “projets Parlios OS” en langage business ;
            </li>
            <li>
              vous aide à prioriser ce qu&apos;il faut tester en premier (pilotes 90 jours,
              hubs futurs…).
            </li>
          </ul>

          <div
            style={{
              padding: "1.3rem 1.5rem",
              borderRadius: "1.2rem",
              border: "1px solid rgba(148,163,184,0.4)",
              background: "rgba(15,23,42,0.96)",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "0.94rem",
                opacity: 0.9,
                marginBottom: "0.8rem",
              }}
            >
              Exemples de questions à poser au Playground :
            </p>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.3rem",
                fontSize: "0.94rem",
                opacity: 0.9,
              }}
            >
              <li>
                « Liste les 5 processus les plus prometteurs à automatiser dans notre
                contexte. »
              </li>
              <li>
                « Crée un plan Parlios OS pour équiper nos équipes ventes, support et
                finance sur 12 mois. »
              </li>
              <li>
                « Donne-moi un scénario de journée type d&apos;un manager avec
                Parlios OS déployé. »
              </li>
              <li>
                « Propose un pilote Parlios OS autour de Sync-Hub et du support client,
                avec des KPIs clairs. »
              </li>
            </ul>
          </div>

          <a
            href="https://parlios-os-3a12b730.base44.app?mode=playground-sync"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.9rem 1.7rem",
              borderRadius: "999px",
              background: "linear-gradient(90deg,#22c55e,#4ade80)",
              color: "#022c22",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.95rem",
              marginBottom: "0.7rem",
            }}
          >
            Ouvrir le Playground Parlios OS – Direction Sync
          </a>

          <p
            style={{
              fontSize: "0.86rem",
              opacity: 0.75,
              marginTop: "0.2rem",
              maxWidth: "680px",
            }}
          >
            Mode exploration uniquement : pas d&apos;accès aux paramètres, pas
            d&apos;impact direct sur votre production. L&apos;objectif est de faire
            émerger des projets IA clairs, actionnables, et alignés avec vos
            priorités business.
          </p>
        </section>
      </div>
    </main>
  );
}
