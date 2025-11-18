import { useRouter } from "next/router";

const META = {
  prospection: { title: "Agent Prospection", role: "Chasseur de leads" },
  redaction:   { title: "Agent Rédaction",   role: "Copy / Email / LinkedIn" },
  analyse:     { title: "Analyste Entreprise", role: "Diagnostic flash" },
  radar:       { title: "Radar Opportunités", role: "Détection signaux" },
  coach:       { title: "Coach IA",          role: "Habitudes & feedback" },
};

export default function AgentPage(){
  const { query } = useRouter();
  const key = (query.slug || "").toString();
  const data = META[key] || { title: "Agent", role: "Bientôt" };

  return (
    <main style={{ padding: 24 }}>
      <h1>{data.title}</h1>
      <p style={{ opacity: 0.7 }}>{data.role}</p>
      <div style={{ marginTop: 16 }}>
        MVP: on branchera ici l'API <code>/api/agents/{key || "..."}</code>.
      </div>
    </main>
  );
}