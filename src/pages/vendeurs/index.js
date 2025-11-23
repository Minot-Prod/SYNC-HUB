export default function Vendeurs() {
  return (
    <div style={{
      minHeight: "100vh",
      padding: "28px 22px",
      background: "radial-gradient(1200px 800px at 10% -10%, #1a2b6d 0%, rgba(0,0,0,0) 60%), radial-gradient(1000px 700px at 90% -20%, #7a1fd1 0%, rgba(0,0,0,0) 55%), #050814",
      color: "white"
    }}>
      <div style={{display:"flex",gap:"1rem",alignItems:"center",marginBottom:"1.5rem"}}>
        <img src="/sync-logo.png" alt="Sync" style={{height:"40px",width:"auto"}} />
        <div style={{opacity:0.5,fontSize:"0.9rem",fontWeight:600}}>x</div>
        <img src="/parlios-logo.png" alt="Parlios" style={{height:"36px",width:"auto"}} />
      </div>

      <h1 style={{fontSize:32,fontWeight:800,marginTop:0}}>Espace Vendeurs</h1>
      <p style={{opacity:0.9,lineHeight:1.6,maxWidth:850}}>
        Sync-Hub est ton copilote IA pour préparer tes rendez-vous, gérer les objections et sortir des follow-ups propres en quelques minutes.
      </p>

      <div style={{marginTop:22,maxWidth:950,display:"grid",gap:14}}>
        <div style={{padding:18,borderRadius:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{fontWeight:800}}>Scénario 1 — Prépa RDV</div>
          <p style={{opacity:0.9,lineHeight:1.6}}>
            “Prépare-moi un plan de RDV avec {nom du client} : contexte, objectif, questions clés, risques et next steps.”
          </p>
        </div>

        <div style={{padding:18,borderRadius:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{fontWeight:800}}>Scénario 2 — Objection prix</div>
          <p style={{opacity:0.9,lineHeight:1.6}}>
            “Réponds à l’objection ‘c’est trop cher’ avec 3 angles : valeur, ROI, comparaison marché. Ton direct mais humain.”
          </p>
        </div>

        <div style={{padding:18,borderRadius:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{fontWeight:800}}>Scénario 3 — Relance chaude</div>
          <p style={{opacity:0.9,lineHeight:1.6}}>
            “Écris une relance courte après RDV en reprenant {point clé}, avec CTA clair et une touche perso.”
          </p>
        </div>
      </div>

      <a
        href="https://sync-hub-sales-ai-cockpit-8b4fc3f5.base44.app"
        target="_blank"
        rel="noreferrer"
        style={{
          display:"inline-flex",
          marginTop:20,
          padding:"12px 18px",
          background:"#7a1fd1",
          color:"white",
          fontWeight:800,
          borderRadius:999,
          textDecoration:"none",
          boxShadow:"0 10px 30px rgba(122,31,209,0.35)"
        }}
      >
        Ouvrir le cockpit IA Sync-Hub
      </a>
    </div>
  );
}