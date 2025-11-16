import React from "react";
import ShellLayout from "@/components/ShellLayout";

const agents = [
  {
    id: "assistant.sacha",
    name: "Sacha agent Assistant principal",
    role: "Assistant principal – orchestrateur conversationnel",
    tagline: "Ton copilote central pour naviguer dans tous les agents Sync.",
    badge: "Central Hub",
    color: "rgba(56,189,248,0.95)",
    description:
      "Sacha clarifie ce que tu veux faire, choisit le bon agent, coordonne les réponses et te propose la prochaine action logique. Il garde la vue globale de ton activité et de ta relation avec l’IA.",
    bestFor: [
      "“Je ne sais pas par où commencer.”",
      "“Choisis l’agent le plus pertinent pour moi.”",
      "“Rappelle-moi ce qu’on a fait la dernière fois.”",
    ],
  },
  {
    id: "prospection.leo",
    name: "Léo agent Prospection",
    role: "Détection et priorisation de prospects",
    tagline: "Le radar d’entreprises qui remplit ton pipeline.",
    badge: "Prospection",
    color: "rgba(129,230,217,0.95)",
    description:
      "Léo trouve des entreprises pertinentes, les segmente, les score et propose toujours une première action concrète pour avancer. Il pense en termes de listes, de priorités et de prochaines démarches.",
    bestFor: [
      "Lister des entreprises à cibler par secteur / région.",
      "Prioriser les 3 meilleurs leads à traiter aujourd’hui.",
      "Préparer des segments pour campagnes d’outreach.",
    ],
  },
  {
    id: "messages.maya",
    name: "Maya agent Messages & Scripts",
    role: "Rédaction commerciale Sync",
    tagline: "Le copywriter qui parle comme toi, mais en mieux.",
    badge: "Messages & Scripts",
    color: "rgba(196,181,253,0.95)",
    description:
      "Maya rédige des messages LinkedIn, des courriels, des scripts d’appels dans ton style. Elle reste simple, claire, orientée conversion, et applique les cadres psycholinguistiques Parlios sans jargon inutile.",
    bestFor: [
      "Écrire un message LinkedIn ou un courriel précis.",
      "Obtenir 2 versions : courte + complète.",
      "Adapter le ton à Pascal, Dan ou Vincent.",
    ],
  },
  {
    id: "analyste.eliot",
    name: "Eliot agent Analyste Entreprise",
    role: "Analyse rapide d’entreprise",
    tagline: "Le consultant express qui comprend ton client en 2 minutes.",
    badge: "Analyse",
    color: "rgba(94,234,212,0.95)",
    description:
      "Eliot analyse une entreprise, identifie les enjeux, repère où Sync peut s’intégrer et propose des angles de pitch clairs. Il reste factuel, concis et orienté décisions.",
    bestFor: [
      "Analyser un prospect avant un appel.",
      "Trouver 2–3 angles de pitch Sync.",
      "Comprendre rapidement l’activité d’une entreprise.",
    ],
  },
  {
    id: "radar.zoe",
    name: "Zoé agent Radar Opportunités",
    role: "Radar d’événements et d’opportunités",
    tagline: "La chasseuse d’événements qui ne dort jamais.",
    badge: "Radar",
    color: "rgba(251,191,36,0.95)",
    description:
      "Zoé détecte des événements B2B, des galas, des conférences et les transforme en opportunités structurées avec scoring, priorités et plan d’action. Elle est orientée horizon 6–36 mois.",
    bestFor: [
      "Repérer des événements à fort potentiel Sync.",
      "Construire un backlog d’opportunités à long terme.",
      "Avoir une vue radar du marché Québec / Montréal.",
    ],
  },
  {
    id: "coach.nova",
    name: "Nova agent Coach IA",
    role: "Professeur IA pour vendeurs",
    tagline: "Le coach qui t’apprend à travailler avec l’IA sans te juger.",
    badge: "Coach IA",
    color: "rgba(248,250,252,0.95)",
    description:
      "Nova t’explique comment tirer le maximum des agents, te propose des exercices simples, corrige tes habitudes et te fait monter en compétences, à ton rythme, sans jargon technique.",
    bestFor: [
      "Comprendre comment formuler de meilleures demandes.",
      "Apprendre à intégrer l’IA dans ta routine de vente.",
      "Progresser en confiance et en autonomie.",
    ],
  },
];

function AgentCard({ agent }) {
  return (
    <div
      style={{
        borderRadius: "18px",
        padding: "16px 16px 14px 16px",
        background:
          "radial-gradient(circle at top left, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
        border: "1px solid rgba(51,65,85,0.9)",
        boxShadow: "0 20px 50px rgba(15,23,42,0.95)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#fafafa",
              marginBottom: "2px",
            }}
          >
            {agent.name}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(148,163,184,0.95)",
            }}
          >
            {agent.role}
          </div>
        </div>
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "11px",
            border: "1px solid rgba(148,163,184,0.7)",
            color: agent.color,
            background: "rgba(15,23,42,0.98)",
            whiteSpace: "nowrap",
          }}
        >
          {agent.badge}
        </span>
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "rgba(209,213,219,0.95)",
        }}
      >
        {agent.tagline}
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "rgba(148,163,184,0.95)",
        }}
      >
        {agent.description}
      </div>

      <div
        style={{
          marginTop: "4px",
          padding: "8px 9px",
          borderRadius: "12px",
          background: "rgba(15,23,42,0.98)",
          border: "1px dashed rgba(55,65,81,0.9)",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(148,163,184,0.9)",
            marginBottom: "4px",
          }}
        >
          Cas d’usage typiques
        </div>
        <ul
          style={{
            margin: 0,
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {agent.bestFor.map((line, idx) => (
            <li
              key={idx}
              style={{
                fontSize: "12px",
                color: "rgba(209,213,219,0.96)",
              }}
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "6px",
        }}
      >
        <button
          style={{
            padding: "7px 12px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 500,
            color: "#020617",
            background: `linear-gradient(135deg, ${agent.color}, rgba(129,140,248,0.95))`,
            boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
          }}
          onClick={async () => {
            try {
              const res = await fetch("/api/agents", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  agentId: agent.id,
                  message:
                    "Explique-moi ce que tu peux faire pour moi dans le Hub Sync GPT, en restant concret et orienté actions.",
                  userProfile: "pascal",
                  context: { source: "agents-page" },
                }),
              });

              if (!res.ok) {
                throw new Error("Erreur lors de l’appel de l’agent");
              }

              const json = await res.json();
              // Pour le MVP, on affiche juste une alerte simple.
              // Plus tard, ce sera branché sur le chat dédié.
              alert(
                json?.output?.summary ||
                  json?.output?.message ||
                  "Agent appelé avec succès."
              );
            } catch (err) {
              console.error("[AgentsPage] call error:", err);
              alert("Impossible de joindre cet agent pour le moment.");
            }
          }}
        >
          Parler avec {agent.name.split(" ")[0]}
        </button>

        <button
          style={{
            padding: "7px 12px",
            borderRadius: "999px",
            border: "1px solid rgba(75,85,99,0.9)",
            cursor: "pointer",
            fontSize: "12px",
            color: "rgba(209,213,219,0.95)",
            background: "rgba(15,23,42,0.98)",
          }}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Voir son impact dans le pipeline
        </button>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <ShellLayout title="Agents IA – Sync GPT Hub">
      <div
        style={{
          minHeight: "100vh",
          padding: "24px 26px",
          background:
            "radial-gradient(circle at top left, #020617 0, #020617 40%, #000000 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "18px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Équipe d’agents Sync GPT
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(148,163,184,0.95)",
                maxWidth: "560px",
              }}
            >
              Voici ton équipe IA complète : une vraie squad autour du vendeur.
              Chaque agent a un rôle clair, une mission précise et une manière
              de travailler alignée avec Sync. Sacha agent Assistant principal
              reste ton point d’entrée privilégié.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.7)",
                background: "rgba(15,23,42,0.98)",
                color: "#e5e7eb",
                fontSize: "13px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Retour au dashboard
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      </div>
    </ShellLayout>
  );
}
