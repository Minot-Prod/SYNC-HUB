import Link from "next/link";
import mockKpis from "../../data/mockKpi";

export default function Managers() {
  const exportCsv = () => {
    const headers = ["id","label","value","unit","delta","description"];
    const rows = mockKpis.map(k => [
      k.id,
      k.label,
      k.value,
      k.unit || "",
      k.delta || "",
      (k.description || "").replace(/"/g, '""')
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(r => r.map(v => `"${v}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `sync-hub-kpi-roi-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

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

      {/* Header brand + retour */}
      <div style={{
        width: "100%",
        maxWidth: 1000,
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginTop: 10,
        marginBottom: 18
      }}>
        <img src="/sync-logo.png" alt="Sync" style={{height:"40px",width:"auto"}} />
        <div style={{opacity:0.5,fontSize:"0.9rem",fontWeight:600}}>×</div>
        <img src="/parlios-logo.png" alt="Parlios" style={{height:"36px",width:"auto"}} />
        <div style={{marginLeft:10, opacity:0.85, fontWeight:700, fontSize:14}}>
          Propulsé par Parlios OS
        </div>

        <div style={{marginLeft:"auto"}}>
          <Link href="/" style={{
            padding:"8px 12px",
            borderRadius:999,
            border:"1px solid rgba(255,255,255,0.12)",
            background:"rgba(255,255,255,0.04)",
            color:"white",
            textDecoration:"none",
            fontSize:14,
            fontWeight:800
          }}>
            ← Retour au site Sync-Hub
          </Link>
        </div>
      </div>

      {/* KPI / ROI PORTAL */}
      <section style={{
        width: "100%",
        maxWidth: 1000,
        padding: "22px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <h1 style={{margin:0,fontSize:26,fontWeight:900}}>
            Portail KPI / ROI Sync-Hub
          </h1>
          <div style={{opacity:0.8,fontSize:14,fontWeight:600}}>
            Vue synthèse de l’utilisation et de l’impact sur l’équipe pilote.
          </div>
        </div>

        <div style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 12
        }}>
          {mockKpis.map(kpi => (
            <div key={kpi.id} style={{
              padding: "16px",
              borderRadius: 14,
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.08)"
            }}>
              <div style={{fontSize:13,opacity:0.85,fontWeight:700}}>
                {kpi.label}
              </div>
              <div style={{marginTop:8,fontSize:30,fontWeight:900,letterSpacing:0.5}}>
                {kpi.value}{kpi.unit === "%" ? "%" : ""}
                {kpi.unit && kpi.unit !== "%" ? (
                  <span style={{fontSize:14,opacity:0.8,fontWeight:700,marginLeft:6}}>
                    {kpi.unit}
                  </span>
                ) : null}
              </div>
              {kpi.delta ? (
                <div style={{marginTop:6,fontSize:12,opacity:0.8,fontWeight:700}}>
                  {kpi.delta}
                </div>
              ) : null}
              {kpi.description ? (
                <div style={{marginTop:8,fontSize:12,opacity:0.75,lineHeight:1.5}}>
                  {kpi.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div style={{display:"flex",justifyContent:"flex-end",marginTop:14}}>
          <button
            onClick={exportCsv}
            style={{
              padding:"10px 14px",
              borderRadius:999,
              border:"1px solid rgba(255,255,255,0.12)",
              background:"#7a1fd1",
              color:"white",
              fontWeight:900,
              cursor:"pointer",
              boxShadow:"0 8px 25px rgba(122,31,209,0.35)"
            }}
          >
            Exporter les KPI (CSV)
          </button>
        </div>
      </section>
    </div>
  );
}