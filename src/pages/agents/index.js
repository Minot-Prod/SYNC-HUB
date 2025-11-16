import agents from "@/data/agents.json";
import AgentCard from "@/components/AgentCard";

export default function AgentsPage(){
  return (
    <main className="max-w-6xl mx-auto p-6 grid gap-4"
          style={{gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))"}}>
      {agents.map(a => <AgentCard key={a.id} agent={a} />)}
    </main>
  );
}

