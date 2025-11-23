import React from "react";

export default function Home() {
  return (
<main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #020617 0, #020617 40%, #020617 60%, #000 100%)",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backdropFilter: "blur(12px)",
          background:
            "linear-gradient(to right, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
          borderBottom: "1px solid rgba(148,163,184,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0.9rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "999px",
                background:
                  "conic-gradient(from 140deg, #22d3ee, #6366f1, #a855f7, #22d3ee)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 700,
              }}
            >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              S
            </div>
            <div>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <div
                style={{
                  fontSize: "0.9rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
                Sync-Hub
              </div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
                Cockpit IA des équipes de vente
              </div>
            </div>
          </div>
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              fontSize: "0.8rem",
            }}
          >
            <a href="#problem" style={navLinkStyle}>
              1. Problème
            </a>
            <a href="#sync-hub" style={navLinkStyle}>
              2. Sync-Hub
            </a>
            <a href="#wow" style={navLinkStyle}>
              3. Moments WOW
            </a>
            <a href="#security" style={navLinkStyle}>
              4. Sécurité
            </a>
            <a href="#pilot-90" style={navLinkStyle}>
              5. Pilote 90 j
            </a>
            <a href="#parlios-os" style={navLinkStyle}>
              6. Parlios OS
            </a>
            <a
              href="/dashboard"
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                background: "linear-gradient(90deg,#06b6d4,#6366f1)",
                textDecoration: "none",
                color: "white",
                fontWeight: 600,
                marginLeft: "0.3rem",
              }}
            >
              Ouvrir le cockpit IA
            </a>
          </nav>
        </div>
      </header>

      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 4rem",
        }}
      >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
        {/* Section 1 — Intro */}
        <section id="intro" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="0" title="Pourquoi je suis là" />
          <h1
            style={{
              fontSize: "2.6rem",
              lineHeight: 1.1,
              fontWeight: 700,
              marginBottom: "1.5rem",
              maxWidth: "820px",
            }}
          >
            Je construis un copilote IA pour les ventes,
            parce que je viens du terrain, pas d&apos;un labo.
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              opacity: 0.9,
              maxWidth: "760px",
            }}
          >
            J&apos;ai passé ces dernières années entre les équipes commerciales,
            les fondateurs et les opérations. Sync-Hub et Parlios OS sont nés
            d&apos;un truc très simple&nbsp;: arrêter de faire perdre du temps aux
            équipes avec des outils conçus pour des ingénieurs, pas pour ceux
            qui parlent aux clients.
          </p>
        </section>

        {/* Section 2 — Problème ventes */}
        <section id="problem" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="1" title="Le problème pour les équipes de vente" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
              gap: "2.5rem",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <div>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <h2
                style={{
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                  fontWeight: 600,
                }}
              >
                Avant chaque rendez-vous important, vos équipes perdent du temps
                et de l&apos;information.
              </h2>
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "1.3rem",
                  fontSize: "1.02rem",
                  opacity: 0.92,
                }}
              >
                <li style={{ marginBottom: "0.4rem" }}>
                  <strong>20–30 minutes</strong> de préparation avant chaque
                  rendez-vous stratégique.
                </li>
                <li style={{ marginBottom: "0.4rem" }}>
                  Fouille dans le <strong>CRM</strong>, les emails, les notes,
                  les documents internes pour reconstruire le contexte.
                </li>
                <li style={{ marginBottom: "0.4rem" }}>
                  Informations critiques qui restent dans des blocs-notes
                  perso, des threads Slack, ou des esprits sur-sollicités.
                </li>
                <li>
                  Décisions prises à l&apos;instinct plutôt que sur une vision
                  claire et partagée du compte.
                </li>
              </ul>
            </div>
            <div
              style={{
                padding: "1.4rem 1.5rem",
                borderRadius: "1.1rem",
                border: "1px solid rgba(148,163,184,0.4)",
                background:
                  "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 55%)",
                fontSize: "0.95rem",
              }}
            >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <p style={{ marginBottom: "0.5rem", opacity: 0.9 }}>
                <strong>Sur 10 rendez-vous</strong>, vous pouvez facilement
                perdre l&apos;équivalent de <strong>3 à 4 heures</strong> en
                préparation manuelle.
              </p>
              <p style={{ opacity: 0.8 }}>
                À l&apos;échelle d&apos;une équipe de 8–10 vendeurs, ce sont
                plusieurs <strong>journées complètes par semaine</strong> qui
                partent dans la fouille et la mise en forme, pas dans la
                relation client.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — Sync-Hub en une phrase */}
        <section id="sync-hub" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="2" title="Sync-Hub en une phrase" />
          <div
            style={{
              padding: "1.6rem 1.8rem",
              borderRadius: "1.25rem",
              border: "1px solid rgba(148,163,184,0.55)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,64,175,0.9))",
              boxShadow: "0 22px 45px rgba(15,23,42,0.9)",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.4,
                fontWeight: 600,
                marginBottom: "0.8rem",
              }}
            >
              Sync-Hub, c&apos;est le cockpit IA des équipes de vente&nbsp;:
              préparation des rendez-vous, gestion des objections, suivi et
              guidage au quotidien.
            </p>
            <p style={{ fontSize: "1rem", opacity: 0.9 }}>
              L&apos;objectif n&apos;est pas de transformer vos commerciaux en
              experts IA. L&apos;objectif est qu&apos;ils arrivent en rendez-vous
              <strong>prêts</strong>, avec un plan clair, et qu&apos;ils
              repartent avec des <strong>next steps explicites</strong>.
            </p>
          </div>
        </section>

        {/* Section 4 — Moments WOW */}
        <section id="wow" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="3" title="Les 3 moments WOW de la démo" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "1.6rem",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <WowCard
              title="Préparation de rendez-vous en 10 secondes"
              before={[
                "20–30 minutes à recoller CRM, emails, notes et docs internes.",
                "Brief souvent incomplet, parfois uniquement dans la tête du vendeur.",
              ]}
              after={[
                "Le rep clique sur « Préparer mon rendez-vous ».",
                "Sync-Hub génère un brief clair : contexte, enjeux, acteurs clés, historique.",
                "Objectifs du rendez-vous + 5 à 10 questions pour faire avancer le deal.",
              ]}
            />
            <WowCard
              title="Répondre aux objections en live"
              before={[
                "Objections traitées à chaud, parfois en improvisation.",
                "Argumentaires qui varient énormément d&apos;un vendeur à l&apos;autre.",
              ]}
              after={[
                "Le rep formule l&apos;objection en une phrase.",
                "Sync-Hub propose une réponse structurée : message clé, preuve, exemple.",
                "Suggestion de next step pour garder le deal en mouvement.",
              ]}
            />
            <WowCard
              title="Follow-up auto + CRM à jour"
              before={[
                "Compte-rendu repoussé à « plus tard »… qui n&apos;arrive jamais.",
                "CRM mis à jour en vitesse, avec peu de signal exploitable.",
              ]}
              after={[
                "Après l&apos;appel, Sync-Hub génère un email de follow-up propre.",
                "Propose les tâches à créer et prépare la mise à jour CRM.",
                "Résultat : une chronologie de deal lisible et actionnable pour le management.",
              ]}
            />
          </div>
        </section>

        {/* Section 5 — Comment ça marche */}
        <section id="how-it-works" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="4" title="Comment ça marche — version simple" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1.2fr)",
              gap: "2.5rem",
              alignItems: "flex-start",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <div>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <h2
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1rem",
                  fontWeight: 600,
                }}
              >
                Sous le capot, Sync-Hub reste compréhensible pour un directeur
                non technique.
              </h2>
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "1.3rem",
                  fontSize: "1.02rem",
                  opacity: 0.92,
                }}
              >
                <li style={{ marginBottom: "0.4rem" }}>
                  Un ensemble d&apos;<strong>agents IA métiers</strong>&nbsp;:
                  préparation de rendez-vous, traitement des objections, suivi
                  et relances.
                </li>
                <li style={{ marginBottom: "0.4rem" }}>
                  Un <strong>orchestrateur</strong> qui choisit quel agent
                  activer et dans quel ordre, en fonction du contexte du deal.
                </li>
                <li>
                  Une connexion à vos <strong>outils existants</strong>
                  &nbsp;(CRM, emails, notes) pour éviter de recréer une
                  énième base de données parallèle.
                </li>
              </ul>
            </div>
            <div
              style={{
                padding: "1.4rem 1.5rem",
                borderRadius: "1.1rem",
                border: "1px solid rgba(148,163,184,0.4)",
                background:
                  "radial-gradient(circle at top right, rgba(96,165,250,0.22), transparent 55%)",
                fontSize: "0.96rem",
              }}
            >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <p style={{ marginBottom: "0.5rem", opacity: 0.9 }}>
                Concrètement, pour vos équipes, l&apos;expérience reste très
                simple&nbsp;: quelques boutons clairs, des champs déjà remplis,
                et des propositions prêtes à être ajustées.
              </p>
              <p style={{ opacity: 0.8 }}>
                Toute la complexité IA reste derrière le rideau. Ce que vos
                décideurs voient, ce sont des <strong>rendez-vous mieux
                préparés</strong>, des <strong>pipelines plus fiables</strong>,
                et des <strong>reps qui gagnent du temps</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 — Sécurité & confiance */}
        <section id="security" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="5" title="Sécurité, gouvernance et confiance" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1.4rem",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <SecurityPoint
              title="Principe du moindre privilège"
              text="L&apos;IA n&apos;accède qu&apos;aux données nécessaires pour faire son travail. Pas de fenêtres ouvertes sur l&apos;ensemble de votre patrimoine d&apos;information."
            />
            <SecurityPoint
              title="Secrets protégés"
              text="Pas de clés ou de secrets techniques en dur dans le code. Configuration séparée par environnement, avec un contrôle strict de qui peut voir quoi."
            />
            <SecurityPoint
              title="Logs d&apos;audit"
              text="Possibilité de tracer qui a déclenché quelles actions, sur quels comptes et à quel moment. C&apos;est un cockpit, pas une boîte noire."
            />
            <SecurityPoint
              title="Données minimisées & RGPD"
              text="Seuls les champs utiles sont exploités, avec des mécanismes prévus pour l&apos;export, la rectification ou la suppression, selon vos besoins RGPD."
            />
          </div>
        </section>

        {/* Section 7 — Pilote 90 jours */}
        <section id="pilot-90" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="6" title="Pilote Sync-Hub sur 90 jours" />
          <div
            style={{
              padding: "1.8rem 1.9rem",
              borderRadius: "1.25rem",
              border: "1px solid rgba(148,163,184,0.5)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(22,101,52,0.9))",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1.2fr)",
                gap: "2.3rem",
                alignItems: "flex-start",
              }}
            >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <div>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
                <h2
                  style={{
                    fontSize: "1.6rem",
                    marginBottom: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Un pilote cadré comme un projet, pas comme une expérimentation
                  floue.
                </h2>
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "1.3rem",
                    fontSize: "1.02rem",
                    opacity: 0.93,
                  }}
                >
                  <li style={{ marginBottom: "0.3rem" }}>
                    <strong>1 équipe de vente</strong> ciblée (ex. SDR ou
                    Account Executives sur un segment donné).
                  </li>
                  <li style={{ marginBottom: "0.3rem" }}>
                    <strong>1 à 2 process</strong> bien définis&nbsp;:
                    préparation de rendez-vous, relances, gestion des objections.
                  </li>
                  <li>
                    <strong>Durée&nbsp;: 90 jours</strong>, suffisante pour voir
                    des tendances sans immobiliser votre organisation.
                  </li>
                </ul>
              </div>
              <div>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.6rem",
                    fontWeight: 600,
                  }}
                >
                  KPIs suivis pendant le pilote
                </h3>
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "1.3rem",
                    fontSize: "0.98rem",
                    opacity: 0.9,
                  }}
                >
                  <li>Temps moyen de préparation par rendez-vous.</li>
                  <li>
                    Adoption&nbsp;: pourcentage de reps qui utilisent
                    réellement Sync-Hub.
                  </li>
                  <li>
                    Impact sur le closing&nbsp;: par exemple taux de conversion
                    sur les deals exposés au cockpit, ou vitesse de cycle.
                  </li>
                  <li>Feedback qualitatif des reps et des managers.</li>
                </ul>
              </div>
            </div>
            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Si les résultats sont là, on scale. Sinon, on arrête. Pas de flou,
              pas de bullshit.
            </p>
          </div>
        </section>

        {/* Section 8 — Parlios OS */}
        <section id="parlios-os" style={{ marginBottom: "3.5rem" }}>
          <StepLabel number="7" title="Zoom-out : Parlios OS" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1.1fr)",
              gap: "2.4rem",
              alignItems: "flex-start",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <div>
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <h2
                style={{
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                  fontWeight: 600,
                }}
              >
                Parlios OS&nbsp;: l&apos;OS d&apos;entreprise derrière Sync-Hub.
              </h2>
              <p
                style={{
                  fontSize: "1.02rem",
                  opacity: 0.9,
                  marginBottom: "1rem",
                }}
              >
                Sync-Hub est le module <strong>ventes</strong> d&apos;un projet
                plus large&nbsp;: Parlios OS. Même philosophie, mais appliquée à
                l&apos;ensemble de l&apos;organisation&nbsp;: support, opérations,
                finance, etc.
              </p>
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "1.3rem",
                  fontSize: "0.98rem",
                  opacity: 0.9,
                }}
              >
                <li style={{ marginBottom: "0.3rem" }}>
                  <strong>Support</strong>&nbsp;: analyse des tickets, réponses
                  proposées, priorisation automatique des urgences.
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  <strong>Opérations</strong>&nbsp;: détection des goulots
                  d&apos;étranglement, recommandations sur les process à
                  optimiser en priorité.
                </li>
                <li>
                  <strong>Finance</strong>&nbsp;: structuration des relances,
                  suivi des retards, aide à la priorisation des actions de
                  recouvrement.
                </li>
              </ul>
            </div>
            <div
              style={{
                padding: "1.4rem 1.5rem",
                borderRadius: "1.1rem",
                border: "1px solid rgba(148,163,184,0.4)",
                background:
                  "radial-gradient(circle at top left, rgba(244,114,182,0.2), transparent 55%)",
                fontSize: "0.95rem",
              }}
            >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <p style={{ marginBottom: "0.7rem", opacity: 0.9 }}>
                Parlios OS se présente comme un <strong>workspace IA central</strong>,
                capable à terme de piloter plusieurs hubs métiers&nbsp;:
                ventes (Sync-Hub), support, opérations, finance…
              </p>
              <p style={{ marginBottom: "1rem", opacity: 0.85 }}>
                Dans la démo, je peux passer du cockpit Sync-Hub à Parlios OS
                pour montrer comment, demain, une direction peut superviser ses
                hubs IA depuis un seul endroit.
              </p>
              
            </div>
          </div>
        </section>

        {/* Section 9 — CTA */}
        <section id="cta" style={{ marginBottom: "1.5rem" }}>
          <StepLabel number="8" title="Prochaines étapes" />
          <div
            style={{
              padding: "1.6rem 1.8rem",
              borderRadius: "1.2rem",
              border: "1px solid rgba(148,163,184,0.5)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.92))",
            }}
          >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
            <h2
              style={{
                fontSize: "1.6rem",
                marginBottom: "0.9rem",
                fontWeight: 600,
              }}
            >
              La suite logique après cette présentation.
            </h2>
            <p
              style={{
                fontSize: "1.02rem",
                opacity: 0.9,
                marginBottom: "1.5rem",
                maxWidth: "760px",
              }}
            >
              L&apos;objectif de cette session est que vous ayez une vision
              claire&nbsp;: ce que fait Sync-Hub pour vos ventes aujourd&apos;hui,
              comment on le teste sérieusement sur 90 jours, et comment Parlios
              OS peut devenir progressivement l&apos;OS IA de votre organisation.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.9rem",
                marginBottom: "0.8rem",
              }}
            >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
              <a
                href="#pilot-90"
                style={{
                  padding: "0.9rem 1.7rem",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg,#22c55e,#4ade80)",
                  color: "#022c22",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                Planifier un pilote Sync-Hub
              </a>
              <a
                href="https://sync-hub-sales-ai-cockpit-8b4fc3f5.base44.app"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "0.9rem 1.6rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.7)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                Ouvrir le cockpit Sync-Hub (Base44)
              </a>
              
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const navLinkStyle = {
  padding: "0.35rem 0.75rem",
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.4)",
  textDecoration: "none",
  color: "rgba(226,232,240,0.9)",
  fontWeight: 500,
};

function StepLabel({ number, title }) {
  return (
<div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.7rem",
        marginBottom: "0.9rem",
        fontSize: "0.85rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        opacity: 0.85,
      }}
    >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
      <span
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "999px",
          background: "rgba(56,189,248,0.1)",
          border: "1px solid rgba(56,189,248,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: 700,
        }}
      >
        {number}
      </span>
      <span>{title}</span>
    </div>
  );
}

function WowCard({ title, before, after }) {
  return (
<div
      style={{
        borderRadius: "1.1rem",
        border: "1px solid rgba(148,163,184,0.45)",
        background: "rgba(15,23,42,0.9)",
        padding: "1.4rem 1.45rem",
        fontSize: "0.96rem",
      }}
    >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
      <h3
        style={{
          fontSize: "1.1rem",
          marginBottom: "0.7rem",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.82rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          opacity: 0.7,
          marginBottom: "0.3rem",
        }}
      >
        Avant
      </p>
      <ul style={{ listStyle: "disc", paddingLeft: "1.1rem", opacity: 0.9 }}>
        {before.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "0.2rem" }}>
            {item}
          </li>
        ))}
      </ul>
      <p
        style={{
          fontSize: "0.82rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          opacity: 0.7,
          marginTop: "0.7rem",
          marginBottom: "0.3rem",
        }}
      >
        Après
      </p>
      <ul style={{ listStyle: "disc", paddingLeft: "1.1rem", opacity: 0.95 }}>
        {after.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "0.2rem" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SecurityPoint({ title, text }) {
  return (
<div
      style={{
        padding: "1.2rem 1.25rem",
        borderRadius: "1rem",
        border: "1px solid rgba(148,163,184,0.45)",
        background: "rgba(15,23,42,0.96)",
        fontSize: "0.94rem",
      }}
    >
      {/* Retour au site */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 800,
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          textDecoration: "none",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Retour au site Sync-Hub
      </a>
      <h3
        style={{
          fontSize: "1rem",
          marginBottom: "0.5rem",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
      <p style={{ opacity: 0.88 }}>{text}</p>
    </div>
  );
}
