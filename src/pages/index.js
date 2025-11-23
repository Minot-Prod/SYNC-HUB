import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>SYNC-HUB — Cockpit IA des ventes</title>
      </Head>

      <div style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 10% -10%, #1a2b6d 0%, rgba(0,0,0,0) 60%), " +
          "radial-gradient(1000px 700px at 90% -20%, #7a1fd1 0%, rgba(0,0,0,0) 55%), #050814",
        color: "white"
      }}>
        {/* BRAND HEADER */}
        <header style={{
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}>
          <img src="/sync-logo.png" alt="Sync" style={{ height: 40, width: "auto" }} />
          <div style={{ opacity: 0.5, fontWeight: 700 }}>×</div>
          <img src="/parlios-logo.png" alt="Parlios" style={{ height: 36, width: "auto" }} />
          <div style={{ marginLeft: 14, opacity: 0.9, fontWeight: 600 }}>
            Sync-Hub — Cockpit IA des équipes de vente (propulsé par Parlios OS)
          </div>

          <div style={{ marginLeft: "auto" }}>
            <Link href="/dashboard" style={{
              padding: "10px 16px",
              background: "#2f6bff",
              borderRadius: 999,
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(47,107,255,0.35)"
            }}>
              Ouvrir le cockpit IA
            </Link>
          </div>
        </header>

        {/* HERO */}
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "70px 24px 40px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 800 }}>
            Le copilote IA des équipes commerciales.
          </h1>
          <p style={{ marginTop: 14, fontSize: 18, opacity: 0.9, maxWidth: 720 }}>
            Prépare tes RDV, gère les objections, fais tes follow-ups, et pilote ta semaine
            avec un cockpit IA relié à tes données.
          </p>

          {/* ROLE SELECTOR */}
          <div style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18
          }}>
            {/* Présentation SYNC */}
            <Link href="/presentation" style={{
              padding: "22px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              textDecoration: "none",
              color: "white"
            }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Présentation SYNC</div>
              <div style={{ marginTop: 6, opacity: 0.8, fontSize: 14 }}>
                Vision, promesse produit, démo direction.
              </div>
            </Link>

            {/* Vendeurs */}
            <Link href="/vendeurs" style={{
              padding: "22px",
              borderRadius: 16,
              background: "rgba(122,31,209,0.12)",
              border: "1px solid rgba(122,31,209,0.35)",
              textDecoration: "none",
              color: "white"
            }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Espace Vendeurs</div>
              <div style={{ marginTop: 6, opacity: 0.8, fontSize: 14 }}>
                Scénarios prêts à l’emploi pour tes RDV.
              </div>
            </Link>

            {/* Managers */}
            <Link href="/managers" style={{
              padding: "22px",
              borderRadius: 16,
              background: "rgba(47,107,255,0.12)",
              border: "1px solid rgba(47,107,255,0.35)",
              textDecoration: "none",
              color: "white"
            }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Espace Managers / Direction</div>
              <div style={{ marginTop: 6, opacity: 0.8, fontSize: 14 }}>
                Playground Parlios OS édition Sync.
              </div>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}