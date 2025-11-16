import ShellLayout from "../components/ShellLayout";

const KPI = [
  { label: "Total revenue", value: "25 500 €", trend: "+18%" },
  { label: "Nouveaux clients", value: "31", trend: "+9%" },
  { label: "Deals actifs", value: "14", trend: "+3" },
  { label: "Conversion", value: "15.5%", trend: "+1.2 pts" },
];

const AGENT_STATS = [
  { agent: "Sales", status: "Actif", kpi: "Closing", color: "#22C55E" },
  { agent: "Prospection", status: "Actif", kpi: "Leads", color: "#0EA5E9" },
  { agent: "Messages", status: "Actif", kpi: "Suivi", color: "#EC4899" },
  { agent: "Analyste", status: "Actif", kpi: "Insights", color: "#F97316" },
  { agent: "Radar", status: "Actif", kpi: "Opportunités", color: "#6366F1" },
];

const QUICK_ACTIONS = [
  "Créer une séquence de messages",
  "Analyser un nouveau client",
  "Générer un script vidéo",
  "Scanner le pipeline",
];

export default function DashboardPage() {
  return (
    <ShellLayout active="dashboard" title="Sync GPT Hub · Dashboard">
      <div className="grid-top">
        <section className="panel hero">
          <div className="hero-left">
            <h2 className="hero-title">Bienvenue dans Sync GPT Hub</h2>
            <p className="hero-sub">
              Pilote tes agents IA de vente, visualise la performance et
              déclenche des actions en un clic.
            </p>
            <div className="hero-cta-row">
              <button className="btn-primary">Lancer une session de vente</button>
              <button className="btn-ghost">Voir les opportunités</button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-chart">
              <div className="chart-header">
                <span className="chart-title">Revenue vs. Leads</span>
                <span className="chart-sub">Vue synthèse 7 derniers jours</span>
              </div>
              <div className="chart-body">
                <div className="chart-bar chart-bar-a" />
                <div className="chart-bar chart-bar-b" />
                <div className="chart-bar chart-bar-c" />
                <div className="chart-bar chart-bar-d" />
                <div className="chart-bar chart-bar-e" />
              </div>
            </div>
          </div>
        </section>

        <section className="panel kpi-panel">
          {KPI.map((item) => (
            <div key={item.label} className="kpi-card">
              <div className="kpi-label">{item.label}</div>
              <div className="kpi-value">{item.value}</div>
              <div className="kpi-trend">{item.trend}</div>
            </div>
          ))}
        </section>
      </div>

      <div className="grid-main">
        <section className="panel agents-panel">
          <header className="panel-header">
            <div>
              <h3>Performance des agents</h3>
              <p>Vue rapide de l&apos;activité de chaque agent IA.</p>
            </div>
          </header>
          <div className="agents-list">
            {AGENT_STATS.map((a) => (
              <div key={a.agent} className="agent-row">
                <div className="agent-left">
                  <span
                    className="agent-pill"
                    style={{
                      borderColor: `${a.color}88`,
                      background: `${a.color}16`,
                      color: a.color,
                    }}
                  >
                    {a.agent}
                  </span>
                  <span className="agent-kpi">{a.kpi}</span>
                </div>
                <div className="agent-right">
                  <span className="agent-status">{a.status}</span>
                  <div
                    className="agent-status-dot"
                    style={{ background: a.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel actions-panel">
          <header className="panel-header">
            <div>
              <h3>Actions rapides</h3>
              <p>Ce que tu peux lancer en quelques secondes.</p>
            </div>
          </header>
          <ul className="actions-list">
            {QUICK_ACTIONS.map((text) => (
              <li key={text} className="action-item">
                <span className="action-bullet">•</span>
                <span className="action-text">{text}</span>
                <button className="action-btn">Lancer</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel feed-panel">
          <header className="panel-header">
            <div>
              <h3>Activité récente</h3>
              <p>Dernières actions effectuées par les agents.</p>
            </div>
          </header>
          <ul className="feed-list">
            <li className="feed-item">
              <span className="feed-agent">Sales</span>
              <span className="feed-text">
                a généré une proposition pour &quot;Studio Montréal&quot;.
              </span>
              <span className="feed-meta">il y a 12 min</span>
            </li>
            <li className="feed-item">
              <span className="feed-agent">Prospection</span>
              <span className="feed-text">
                a ajouté 15 leads qualifiés à ton pipeline.
              </span>
              <span className="feed-meta">il y a 32 min</span>
            </li>
            <li className="feed-item">
              <span className="feed-agent">Radar</span>
              <span className="feed-text">
                a détecté 3 opportunités à fort potentiel.
              </span>
              <span className="feed-meta">il y a 1 h</span>
            </li>
          </ul>
        </section>
      </div>

      <style jsx>{`
        .grid-top {
          display: grid;
          grid-template-columns: minmax(0, 3.2fr) minmax(0, 2.2fr);
          gap: 12px;
        }
        .panel {
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: radial-gradient(
              circle at top left,
              rgba(56, 189, 248, 0.16),
              transparent 55%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(248, 113, 113, 0.2),
              transparent 60%
            ),
            rgba(15, 23, 42, 0.96);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.95);
          padding: 12px 14px 12px;
        }
        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.2fr);
          gap: 10px;
          align-items: stretch;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: center;
        }
        .hero-title {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .hero-sub {
          font-size: 13px;
          color: #cbd5f5;
          max-width: 420px;
        }
        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .btn-primary {
          border-radius: 999px;
          border: none;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          background: linear-gradient(to right, #4f46e5, #6366f1);
          color: #f9fafb;
          box-shadow: 0 14px 30px rgba(79, 70, 229, 0.6);
        }
        .btn-primary:hover {
          box-shadow: 0 20px 40px rgba(79, 70, 229, 0.8);
          transform: translateY(-1px);
        }
        .btn-ghost {
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: #e5e7eb;
        }
        .hero-right {
          display: flex;
          align-items: stretch;
        }
        .hero-chart {
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: radial-gradient(
              circle at top,
              rgba(15, 23, 42, 0.8),
              rgba(3, 7, 18, 0.98)
            ),
            url("/design/sync-hero.jpg");
          background-size: cover;
          background-position: center;
          padding: 10px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .chart-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .chart-title {
          font-size: 13px;
          font-weight: 500;
        }
        .chart-sub {
          font-size: 11px;
          color: #cbd5f5;
        }
        .chart-body {
          flex: 1;
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-top: 4px;
        }
        .chart-bar {
          flex: 1;
          border-radius: 999px 999px 0 0;
          background: linear-gradient(to top, #f97316, #22c55e);
          opacity: 0.7;
        }
        .chart-bar-a {
          height: 30%;
        }
        .chart-bar-b {
          height: 55%;
        }
        .chart-bar-c {
          height: 75%;
        }
        .chart-bar-d {
          height: 45%;
        }
        .chart-bar-e {
          height: 60%;
        }
        .kpi-panel {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .kpi-card {
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: rgba(15, 23, 42, 0.98);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .kpi-label {
          font-size: 11px;
          color: #9ca3af;
        }
        .kpi-value {
          font-size: 15px;
          font-weight: 500;
        }
        .kpi-trend {
          font-size: 11px;
          color: #22c55e;
        }
        .grid-main {
          display: grid;
          grid-template-columns: minmax(0, 2.4fr) minmax(0, 2fr) minmax(0, 2.2fr);
          gap: 12px;
        }
        .panel-header h3 {
          font-size: 14px;
          font-weight: 500;
        }
        .panel-header p {
          font-size: 12px;
          color: #9ca3af;
        }
        .agents-list {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .agent-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 8px;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(55, 65, 81, 0.9);
        }
        .agent-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .agent-pill {
          border-radius: 999px;
          border-width: 1px;
          border-style: solid;
          padding: 2px 8px;
          font-size: 11px;
        }
        .agent-kpi {
          font-size: 11px;
          color: #cbd5f5;
        }
        .agent-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .agent-status {
          font-size: 11px;
          color: #22c55e;
        }
        .agent-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
        }
        .actions-list {
          margin-top: 8px;
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .action-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(55, 65, 81, 0.9);
        }
        .action-bullet {
          font-size: 14px;
          color: #6366f1;
        }
        .action-text {
          flex: 1;
          font-size: 12px;
        }
        .action-btn {
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.9);
          background: transparent;
          color: #e5e7eb;
          font-size: 11px;
          padding: 4px 8px;
          cursor: pointer;
        }
        .action-btn:hover {
          background: rgba(37, 99, 235, 0.9);
          border-color: rgba(191, 219, 254, 0.9);
        }
        .feed-list {
          margin-top: 8px;
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .feed-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 6px;
          align-items: center;
          padding: 6px 8px;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(55, 65, 81, 0.9);
          font-size: 12px;
        }
        .feed-agent {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }
        .feed-text {
          color: #e5e7eb;
        }
        .feed-meta {
          font-size: 11px;
          color: #9ca3af;
        }
        @media (max-width: 1024px) {
          .grid-top {
            grid-template-columns: minmax(0, 1fr);
          }
          .hero {
            grid-template-columns: minmax(0, 1fr);
          }
          .grid-main {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </ShellLayout>
  );
}
