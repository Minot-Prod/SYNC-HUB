import Link from "next/link";

export default function Managers() {
  return (
    <div style={{
      minHeight: "100vh",
      padding: "32px 22px 60px",
      background:
        "radial-gradient(1200px 800px at 10% -10%, #1a2b6d 0%, rgba(0,0,0,0) 60%), " +
        "radial-gradient(1000px 700px at 90% -20%, #7a1fd1 0%, rgba(0,0,0,0) 55%), #050814",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>

      {/* HEADER APP (logos centraux XXL) */}
      <div style={{
        width: "100%",
        maxWidth: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30
      }}>
        <img
          src="/sync-logo.png"
          alt="Sync"
          style={{
            height: 160,
            width: "auto",
            filter: "drop-shadow(0 0 22px rgba(255,255,255,0.28))"
          }}
        />

        <div style={{
          marginTop: 8,
          marginBottom: 6,
          opacity: 0.55,
          fontWeight: 800,
          letterSpacing: 2
        }}>
          ×
        </div>

        <img
          src="/parlios-logo.png"
          alt="Parlios"
          style={{
            height: 120,
            width: "auto",
            filter: "drop-shadow(0 0 26px rgba(255,80,80,0.45))"
          }}
        />

        <div style={{
          marginTop: 12,
          fontSize: 15,
          opacity: 0.8,
          fontWeight: 700
        }}>
          Propulsé par Parlios OS
        </div>

        <Link href="/" style={{
          marginTop: 14,
          fontSize: 14,
          opacity: 0.9,
          textDecoration: "none",
          color: "white",
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)"
        }}>
          ← Retour au site Sync-Hub
        </Link>
      </div>

      {/* HERO / PLAYGROUND */}
      <div style={{
        width: "100%",
        maxWidth: 1000,
        padding: "26px 22px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>
        <h1 style={{marginTop:0,fontSize:32,fontWeight:900}}>
          Playground Parlios OS — Direction Sync
        </h1>

        <p style={{opacity:0.9,lineHeight:1.7,fontSize:17}}>
          Ici, vous pouvez explorer ce que Parlios OS pourrait faire pour les ventes, le support,
          les opérations ou la finance de Sync.  
          Vous parlez à l’agent “Architecte Parlios OS – édition Sync”, qui traduit votre contexte
          métier en cas d’usage IA concrets et priorisés.
        </p>

        <div style={{marginTop:18,fontWeight:800,fontSize:16}}>
          Exemples de questions à poser :
        </div>

        <ul style={{opacity:0.9,lineHeight:1.8,fontSize:16,marginTop:8}}>
          <li>Liste les 5 processus les plus prometteurs à automatiser dans notre contexte.</li>
          <li>Crée un plan Parlios OS pour équiper nos équipes ventes, support et finance sur 12 mois.</li>
          <li>Donne-moi une journée type d’un manager avec Parlios OS déployé.</li>
          <li>Propose un pilote Parlios OS autour de Sync-Hub avec des KPIs clairs.</li>
        </ul>

        <a
          href="https://parlios-os-3a12b730.base44.app"
          target="_blank"
          rel="noreferrer"
          style={{
            display:"inline-flex",
            marginTop:14,
            padding:"12px 20px",
            background:"#2f6bff",
            color:"white",
            fontWeight:900,
            borderRadius:999,
            textDecoration:"none",
            boxShadow:"0 10px 30px rgba(47,107,255,0.38)"
          }}
        >
          Ouvrir le Playground Parlios OS — Direction Sync
        </a>
      </div>
    </div>
  );
}