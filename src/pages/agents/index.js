export default function AgentsIndex(){
  const items = [
    {slug:"prospection", label:"Agent Prospection"},
    {slug:"redaction",   label:"Agent Rédaction"},
    {slug:"analyse",     label:"Analyste Entreprise"},
    {slug:"radar",       label:"Radar Opportunités"},
    {slug:"coach",       label:"Coach IA"}
  ];
  return (
    <main style={{padding:24}}>
      <h1>Agents</h1>
      <ul>
        {items.map(x => (
          <li key={x.slug}>
            <a href={/agents/}>{x.label}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}