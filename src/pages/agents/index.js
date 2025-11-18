export default function AgentsIndex() {
  const items = [
    { slug: "prospection", label: "Agent Prospection" },
    { slug: "redaction", label: "Agent Rédaction" },
    { slug: "analyse", label: "Analyste Entreprise" },
    { slug: "radar", label: "Radar Opportunités" },
    { slug: "coach", label: "Coach IA" },
  ];
  return (
    <main style={{ padding: 24 }}>
      <h1>Agents</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((x) => (
          <li key={x.slug} style={{ marginBottom: 8 }}>
            <a href={`/agents/${x.slug}`} style={{ color: "#3b82f6", textDecoration: "none" }}>
              {x.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
