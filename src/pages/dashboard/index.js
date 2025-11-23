import Link from "next/link";

export default function Dashboard() {
  return (
    <div style={{ padding: "24px 18px", color: "white" }}>
      {/* BIG BRAND HEADER */}
      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "26px",
        paddingTop: "10px"
      }}>
        <img
          src="/sync-logo.png"
          alt="Sync"
          style={{
            height: 180,
            width: "auto",
            filter: "drop-shadow(0 0 18px rgba(255,255,255,0.25))"
          }}
        />
        <div style={{ marginTop: 6, opacity: 0.75, fontWeight: 600 }}>
          ✨ Propulsé par Parlios OS
        </div>

        {/* Retour site */}
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

      {/* CONTENU DASHBOARD (placeholder simple, garde ton UX finale plus tard) */}
      <div style={{
        background: "linear-gradient(135deg, rgba(82,0,255,0.5), rgba(255,0,120,0.5))",
        borderRadius: 20,
        padding: 22,
        minHeight: 260,
        border: "1px solid rgba(255,255,255,0.08)"
      }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Bonjour Maxime 👋</h2>
        <p style={{ marginTop: 6, opacity: 0.9 }}>Prêt à cartonner aujourd’hui ?</p>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Mes objectifs aujourd’hui</div>
          <input
            placeholder="Ex: Booker 3 RDV vidéo, relancer 5 prospects chauds..."
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
              fontSize: 16
            }}
          />
        </div>
      </div>
    </div>
  );
}