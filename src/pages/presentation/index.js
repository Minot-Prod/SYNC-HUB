import Link from "next/link";

export default function PresentationSync() {
  return (
    <div style={{
      minHeight: "100vh",
      padding: "32px 22px 60px",
      background:
        "radial-gradient(1200px 800px at 10% -10%, #1a2b6d 0%, rgba(0,0,0,0) 60%), " +
        "radial-gradient(1000px 700px at 90% -20%, #7a1fd1 0%, rgba(0,0,0,0) 55%), #050814",
      color: "white"
    }}>
      {/* Brand strip */}
      <div style={{display:"flex",gap:"1rem",alignItems:"center",marginBottom:"1.5rem"}}>
        <img src="/sync-logo.png" alt="Sync" style={{height:"40px",width:"auto"}} />
        <div style={{opacity:0.5,fontSize:"0.9rem",fontWeight:600}}>x</div>
        <img src="/parlios-logo.png" alt="Parlios" style={{height:"36px",width:"auto"}} />
        <div style={{marginLeft:"auto"}}>
          <Link href="/" style={{
            padding:"8px 12px",
            borderRadius:999,
            border:"1px solid rgba(255,255,255,0.12)",
            background:"rgba(255,255,255,0.04)",
            color:"white",
            textDecoration:"none",
            fontSize:14
          }}>
            ← Retour au site
          </Link>
        </div>
      </div>

      <main style={{maxWidth:1000, margin:"0 auto"}}>
        <h1 style={{fontSize:"clamp(28px,4vw,46px)",fontWeight:900,marginTop:0}}>
          Présentation SYNC-HUB
        </h1>

        <p style={{opacity:0.9,lineHeight:1.7,fontSize:18,marginTop:12}}>
          Sync-Hub est le cockpit IA des équipes commerciales.
          Il prépare les rendez-vous, gère les objections, génère les follow-ups
          et aide à piloter la semaine en se branchant sur vos données (CRM, emails, notes).
        </p>

        <div style={{
          marginTop:22,
          padding:"20px",
          borderRadius:16,
          background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(255,255,255,0.08)"
        }}>
          <h2 style={{marginTop:0,fontSize:22,fontWeight:800}}>Ce que ça change concrètement</h2>
          <ul style={{opacity:0.9,lineHeight:1.8,fontSize:16}}>
            <li>Prépa RDV en 2 minutes au lieu de 20.</li>
            <li>Objections gérées avec des réponses calibrées terrain.</li>
            <li>Relances propres et régulières → pas de deals qui meurent dans le CRM.</li>
            <li>Vision claire de la semaine et des priorités.</li>
          </ul>
        </div>

        <div style={{marginTop:18, display:"flex", gap:12, flexWrap:"wrap"}}>
          <a
            href="https://sync-hub-sales-ai-cockpit-8b4fc3f5.base44.app"
            target="_blank"
            rel="noreferrer"
            style={{
              display:"inline-flex",
              padding:"12px 18px",
              background:"#2f6bff",
              color:"white",
              fontWeight:800,
              borderRadius:999,
              textDecoration:"none",
              boxShadow:"0 10px 30px rgba(47,107,255,0.35)"
            }}
          >
            Ouvrir le cockpit IA
          </a>

          <Link href="/managers" style={{
            display:"inline-flex",
            padding:"12px 18px",
            background:"rgba(255,255,255,0.06)",
            color:"white",
            fontWeight:800,
            borderRadius:999,
            textDecoration:"none",
            border:"1px solid rgba(255,255,255,0.12)"
          }}>
            Aller à l’espace Managers
          </Link>
        </div>
      </main>
    </div>
  );
}