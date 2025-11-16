import AgentAvatar from "./AgentAvatar";

export default function AgentCard({ agent }){
  return (
    <div className="glass p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <AgentAvatar seed={agent.id} accent={agent.accent||"green"} />
        <div>
          <div className="text-lg font-semibold">{agent.name}</div>
          <div className="text-sm" style={{color:"var(--text-2)"}}>{agent.role}</div>
        </div>
      </div>
      <p style={{color:"var(--text-2)"}}>{agent.pitch}</p>
      <ul className="text-sm list-disc pl-5" style={{color:"var(--text-3)"}}>
        {agent.examples?.map((e,i)=>(<li key={i}>{e}</li>))}
      </ul>
      <div className="mt-2">
        <a className="btn btn-primary" href={`/agents/${agent.id}`}>Travailler avec {agent.name}</a>
      </div>
    </div>
  );
}
