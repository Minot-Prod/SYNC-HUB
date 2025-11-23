import Link from "next/link";

export default function Managers() {
  return (
    <div style={{
      minHeight: "100vh",
      padding: "28px 22px",
      background: "radial-gradient(1200px 800px at 10% -10%, #1a2b6d 0%, rgba(0,0,0,0) 60%), radial-gradient(1000px 700px at 90% -20%, #7a1fd1 0%, rgba(0,0,0,0) 55%), #050814",
      color: "white"
    }}>
      {/* Branding strip */}
      <div style={{display:"flex",gap:"1rem",alignItems:"center",marginBottom:"1.5rem"}}>
        <img src="/sync-logo.png" alt="Sync" style={{height:"40px",width:"auto"}} />
        <div style={{opacity:0.5,fontSize:"0.9rem",fontWeight:600}}>x</div>
        <img src="/parlios-logo.png" alt="Parlios" style={{height:"36px",width:"auto"}} />
        <div style={{marginLeft:8,opacity:0.9,fontWeight:700}}>
          Sync-Hub — Direction & Managers
        </div>

        <div style={{marginLeft:"auto"}}>
          <Link href="/" style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            textDecoration: "none",
            fontSize: 14
          }}>
            ← Retour au site
          </Link>
        </div>
      </div>

      {/* Bloc Playground */}
      <div style={{
        marginTop: 18,
        padding: "22px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        maxWidth: 900
      }}>
        <h1 style={{marginTop:0,fontSize:30,fontWeight:800}}>
          Playground Parlios OS – Direction Sync
        </h1>
        <p style={{opacity:0.9,lineHeight:1.6}}>
          Ici, vous pouvez explorer ce que Parlios OS pourrait faire pour vos ventes, votre support, vos opérations, vos finances…
          Vous parlez à un agent dédié, l’“Architecte Parlios OS – édition Sync”, qui traduit votre contexte métier en cas d’usage IA concrets et en projets priorisés.
        </p>

        <div style={{marginTop:16,fontWeight:700}}>Exemples de questions :</div>
        <ul style={{opacity:0.9,lineHeight:1.7}}>
          <li>Liste les 5 processus les plus prometteurs à automatiser dans notre contexte.</li>
          <li>Crée un plan Parlios OS pour équiper nos équipes ventes, support et finance sur 12 mois.</li>
          <li>Donne-moi un scénario de journée type d’un manager avec Parlios OS déployé.</li>
          <li>Propose un pilote Parlios OS autour de Sync-Hub et du support client, avec des KPIs clairs.</li>
        </ul>

        <a
          href="https://parlios-os-3a12b730.base44.app"
          target="_blank"
          rel="noreferrer"
          style={{
            display:"inline-flex",
            marginTop:12,
            padding:"12px 18px",
            background:"#2f6bff",
            color:"white",
            fontWeight:800,
            borderRadius:999,
            textDecoration:"none",
            boxShadow:"0 10px 30px rgba(47,107,255,0.35)"
          }}
        >
          Ouvrir le Playground Parlios OS – Direction Sync
        </a>
      </div>
    </div>
  );
}