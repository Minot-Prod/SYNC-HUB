import { useState } from "react";

const AGENTS = [
  { id: "sales", label: "Sales", color: "#22C55E" },
  { id: "prospection", label: "Prospection", color: "#0EA5E9" },
  { id: "messages", label: "Messages", color: "#EC4899" },
  { id: "analyste", label: "Analyste", color: "#F97316" },
  { id: "radar", label: "Radar", color: "#6366F1" },
];

const RADAR_PROMPT = `
Tu es l'agent Radar d'un hub de vente B2B pour une équipe vidéo / Sync Productions.
À partir du contexte fourni, tu dois identifier des opportunités commerciales concrètes.

Réponds STRICTEMENT en JSON valide, SANS texte avant ou après, au format suivant :
{
  "opportunities": [
    {
      "id": "string-unique",
      "title": "Titre court et actionnable",
      "description": "Description concrète de l'opportunité",
      "agentId": "sales | prospection | messages | analyste | radar",
      "score": 0-100,
      "stage": "discovery | demo | proposal | closing",
      "estimatedValue": number,
      "currency": "EUR",
      "source": "Radar AI",
      "createdAt": "ISO-8601"
    }
  ]
}
`;

function parseOpportunities(raw) {
  if (!raw || typeof raw !== "string") return [];

  try {
    const direct = JSON.parse(raw);
    if (direct && Array.isArray(direct.opportunities)) {
      return direct.opportunities;
    }
  } catch (_) {}

  const jsonBlockMatch = raw.match(/```json([\s\S]*?)```/i);
  if (jsonBlockMatch && jsonBlockMatch[1]) {
    try {
      const fromBlock = JSON.parse(jsonBlockMatch[1].trim());
      if (fromBlock && Array.isArray(fromBlock.opportunities)) {
        return fromBlock.opportunities;
      }
    } catch (_) {}
  }

  return [
    {
      id: "fallback-" + Date.now(),
      title: "Opportunités détectées (texte libre)",
      description: raw,
      agentId: "radar",
      score: 60,
      stage: "discovery",
      estimatedValue: 0,
      currency: "EUR",
      source: "Radar AI (fallback)",
      createdAt: new Date().toISOString(),
    },
  ];
}

function computeAgentStats(opportunities) {
  const stats = {};
  for (const opp of opportunities) {
    const agentId = opp.agentId || "radar";
    if (!stats[agentId]) {
      stats[agentId] = {
        count: 0,
        totalScore: 0,
        totalValue: 0,
      };
    }
    const s = stats[agentId];
    s.count += 1;
    const score = typeof opp.score === "number" ? opp.score : 0;
    s.totalScore += score;
    const val =
      typeof opp.estimatedValue === "number" ? opp.estimatedValue : 0;
    s.totalValue += val;
  }
  return stats;
}

function exportOpportunitiesToCsv(opportunities) {
  if (!opportunities || opportunities.length === 0) return;

  const headers = [
    "id",
    "title",
    "description",
    "agentId",
    "score",
    "stage",
    "estimatedValue",
    "currency",
    "source",
    "createdAt",
  ];

  const rows = [
    headers.join(";"),
    ...opportunities.map((o) =>
      headers
        .map((key) => {
          const v = o[key];
          if (v == null) return "";
          const str = String(v).replace(/"/g, '""').replace(/\r?\n/g, " ");
          return `"${str}"`;
        })
        .join(";")
    ),
  ];

  const blob = new Blob([rows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `opportunities_${new Date().toISOString().slice(0, 19)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function OpportunitiesPage() {
  const [context, setContext] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRaw, setLastRaw] = useState("");

  const filtered =
    selectedAgent === "all"
      ? opportunities
      : opportunities.filter((o) => o.agentId === selectedAgent);

  const stats = computeAgentStats(opportunities);

  async function handleGenerate(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setLastRaw("");

    try {
      const payloadMessage = `${RADAR_PROMPT}

Contexte deals / pipeline de vente :
${context || "(aucun contexte fourni, reste générique mais actionnable)"}
`;

      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "radar",
          message: payloadMessage,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Erreur API Radar (${res.status})`);
      }

      const data = await res.json();
      const reply =
        data.reply || data.message || (typeof data === "string" ? data : "");

      setLastRaw(reply || "");
      const parsed = parseOpportunities(reply || "");
      setOpportunities(parsed);
    } catch (err) {
      console.error(err);
      setError(
        "Erreur lors de la génération des opportunités. Vérifie la console et les logs Netlify."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setOpportunities([]);
    setLastRaw("");
    setError("");
  }

  function getAgentLabel(agentId) {
    if (agentId === "all") return "Tous";
    return AGENTS.find((a) => a.id === agentId)?.label || agentId;
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="eyebrow">Sync GPT Hub · Radar IA</p>
            <h1 className="hero-title">Radar d&apos;opportunités</h1>
            <p className="hero-subtitle">
              Vue premium des opportunités détectées par l&apos;IA&nbsp;: scoring, agents et valeur
              potentielle pour Sync Productions.
            </p>
          </div>
        </div>
      </section>

      <main className="shell">
        <section className="top-grid">
          <form className="panel panel-main" onSubmit={handleGenerate}>
            <header className="panel-header">
              <div>
                <h2>Contexte pipeline</h2>
                <p>
                  Décris rapidement ton pipeline (types de clients, offres, deals en cours).
                  Le Radar transforme ça en opportunités actionnables.
                </p>
              </div>
            </header>

            <textarea
              className="textarea"
              rows={6}
              placeholder="Ex : agences sans abonnement vidéo, clients one-shot, leads tièdes sur LinkedIn..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />

            {error && <div className="error">{error}</div>}

            <div className="actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Analyse en cours..." : "Générer les opportunités"}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={handleReset}
                disabled={loading || opportunities.length === 0}
              >
                Réinitialiser
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => exportOpportunitiesToCsv(opportunities)}
                disabled={opportunities.length === 0}
              >
                Export CSV
              </button>
            </div>

            <p className="hint">
              Tout reste côté hub pour l&apos;instant. Plus tard, on branchera directement ton CRM / Supabase.
            </p>
          </form>

          <aside className="panel panel-side">
            <header className="panel-header">
              <div>
                <h2>Scoring par agent</h2>
                <p>Répartition des opportunités & priorité moyenne par agent IA.</p>
              </div>
            </header>

            <div className="filter">
              <label>Filtrer les cartes par agent</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                <option value="all">Tous les agents</option>
                {AGENTS.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="stats-list">
              {AGENTS.map((agent) => {
                const s = stats[agent.id];
                const count = s?.count || 0;
                const avgScore =
                  s && s.count > 0
                    ? Math.round(s.totalScore / s.count)
                    : 0;
                const totalValue = s?.totalValue || 0;

                return (
                  <div key={agent.id} className="stats-row">
                    <div className="stats-left">
                      <span
                        className="stats-dot"
                        style={{ background: agent.color }}
                      />
                      <div>
                        <div className="stats-agent">{agent.label}</div>
                        <div className="stats-sub">
                          {count} opportunité{count > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="stats-right">
                      <div className="stats-chip">
                        <span>Score moyen</span>
                        <strong>{avgScore}</strong>
                      </div>
                      <div className="stats-chip">
                        <span>Valeur totale</span>
                        <strong>
                          {totalValue.toLocaleString("fr-FR")} €
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="panel panel-list">
          <header className="panel-header panel-header-row">
            <div>
              <h2>Opportunités détectées</h2>
              <p>
                Chaque carte correspond à une opportunité IA. Utilise les scores pour prioriser ton pipe.
              </p>
            </div>
            <div className="panel-count">
              {filtered.length} opportunité(s) – vue&nbsp;
              <span className="badge-light">{getAgentLabel(selectedAgent)}</span>
            </div>
          </header>

          {filtered.length === 0 ? (
            <div className="empty">
              <h3>Aucune opportunité pour l&apos;instant.</h3>
              <p>
                Donne un peu de contexte au Radar puis clique sur “Générer les opportunités”.
              </p>
            </div>
          ) : (
            <div className="cards-grid">
              {filtered.map((opp) => {
                const agent = AGENTS.find((a) => a.id === opp.agentId);
                const created =
                  opp.createdAt &&
                  !Number.isNaN(Date.parse(opp.createdAt))
                    ? new Date(opp.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                      })
                    : "-";

                return (
                  <article key={opp.id} className="card">
                    <header className="card-header">
                      <div className="card-title-wrap">
                        {agent && (
                          <span
                            className="agent-pill"
                            style={{
                              borderColor: `${agent.color}80`,
                              background: `${agent.color}1a`,
                              color: agent.color,
                            }}
                          >
                            {agent.label}
                          </span>
                        )}
                        <h3 className="card-title">{opp.title}</h3>
                      </div>
                      <div className="card-score">
                        <div className="card-score-value">
                          {typeof opp.score === "number"
                            ? Math.round(opp.score)
                            : "-"}
                        </div>
                        <div className="card-score-label">Score</div>
                      </div>
                    </header>

                    <p className="card-description">{opp.description}</p>

                    <dl className="card-meta">
                      <div>
                        <dt>Stage</dt>
                        <dd>{opp.stage || "N/A"}</dd>
                      </div>
                      <div>
                        <dt>Valeur estimée</dt>
                        <dd>
                          {typeof opp.estimatedValue === "number"
                            ? `${opp.estimatedValue.toLocaleString("fr-FR")} ${
                                opp.currency || "EUR"
                              }`
                            : "-"}
                        </dd>
                      </div>
                      <div>
                        <dt>Créée le</dt>
                        <dd>{created}</dd>
                      </div>
                      <div>
                        <dt>Source</dt>
                        <dd>{opp.source || "Radar IA"}</dd>
                      </div>
                    </dl>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {lastRaw && (
          <section className="panel panel-raw">
            <details>
              <summary>Voir la réponse brute de l&apos;agent Radar (debug)</summary>
              <pre className="raw-pre">{lastRaw}</pre>
            </details>
          </section>
        )}
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #020617 0, #02020a 40%, #000 100%);
          color: #e5e7eb;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }
        .hero {
          position: relative;
          height: 260px;
          background-image: url("/design/sync-hero.jpg");
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(15,23,42,0.2), rgba(3,7,18,0.9)),
            linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(3,7,18,0.95));
        }
        .hero-content {
          max-width: 1120px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px 20px;
          gap: 8px;
        }
        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          color: #a5b4fc;
        }
        .hero-title {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .hero-subtitle {
          max-width: 560px;
          font-size: 14px;
          color: #cbd5f5;
        }
        .shell {
          max-width: 1120px;
          margin: 0 auto;
          padding: 20px 20px 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: -40px;
        }
        .top-grid {
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2.2fr);
          gap: 16px;
        }
        .panel {
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: radial-gradient(circle at top left, rgba(15,23,42,0.92), rgba(15,23,42,0.98));
          background-clip: padding-box;
          box-shadow: 0 18px 45px rgba(15,23,42,0.8);
          padding: 14px 14px 12px;
          backdrop-filter: blur(16px);
        }
        .panel-main {
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .panel-side {
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .panel-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .panel-header h2 {
          font-size: 15px;
          font-weight: 500;
        }
        .panel-header p {
          font-size: 13px;
          color: #9ca3af;
        }
        .panel-header-row {
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
        }
        .panel-count {
          font-size: 12px;
          color: #9ca3af;
        }
        .badge-light {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.6);
          background: rgba(15,23,42,0.9);
          font-size: 11px;
          color: #e5e7eb;
        }
        .textarea {
          border-radius: 12px;
          border: 1px solid rgba(75, 85, 99, 0.9);
          background: rgba(15, 23, 42, 0.92);
          padding: 8px 10px;
          font-size: 14px;
          color: #e5e7eb;
          resize: vertical;
          min-height: 120px;
        }
        .textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.6);
        }
        .error {
          font-size: 12px;
          color: #fecaca;
          background: rgba(127,29,29,0.6);
          border-radius: 10px;
          padding: 6px 8px;
        }
        .hint {
          font-size: 12px;
          color: #9ca3af;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .btn-primary {
          border-radius: 999px;
          border: none;
          padding: 6px 18px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          background: linear-gradient(to right, #4f46e5, #6366f1);
          color: #f9fafb;
          box-shadow: 0 14px 30px rgba(79,70,229,0.55);
          transition: transform 0.08s ease-out, box-shadow 0.08s ease-out,
            opacity 0.1s;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 20px 40px rgba(79,70,229,0.7);
        }
        .btn-primary:disabled {
          opacity: 0.55;
          cursor: default;
          box-shadow: none;
        }
        .btn-ghost {
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.8);
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: #e5e7eb;
        }
        .btn-ghost:hover:not(:disabled) {
          background: rgba(15,23,42,0.96);
        }
        .btn-ghost:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .filter {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }
        .filter label {
          color: #e5e7eb;
        }
        .filter select {
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.9);
          background: rgba(15,23,42,0.98);
          color: #e5e7eb;
          padding: 5px 10px;
          font-size: 13px;
        }
        .stats-list {
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 8px 8px;
          border-radius: 12px;
          background: rgba(15,23,42,0.92);
          border: 1px solid rgba(55,65,81,0.9);
        }
        .stats-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stats-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
        }
        .stats-agent {
          font-size: 13px;
          font-weight: 500;
        }
        .stats-sub {
          font-size: 11px;
          color: #9ca3af;
        }
        .stats-right {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
        }
        .stats-chip {
          font-size: 11px;
          color: #9ca3af;
        }
        .stats-chip strong {
          display: block;
          font-size: 13px;
          color: #e5e7eb;
        }
        .panel-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .empty {
          padding: 12px 6px;
          font-size: 13px;
          color: #d1d5db;
        }
        .empty h3 {
          font-size: 14px;
          margin-bottom: 4px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
        }
        .card {
          border-radius: 14px;
          border: 1px solid rgba(55,65,81,0.9);
          background: radial-gradient(circle at top left, rgba(15,23,42,0.96), #020617);
          padding: 10px 10px 9px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: 0 10px 25px rgba(15,23,42,0.9);
          transition: transform 0.09s ease-out, box-shadow 0.09s ease-out,
            border-color 0.09s ease-out;
        }
        .card:hover {
          transform: translateY(-2px);
          border-color: rgba(129,140,248,0.9);
          box-shadow: 0 16px 34px rgba(37,99,235,0.55);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: flex-start;
        }
        .card-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .agent-pill {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 999px;
          border-width: 1px;
          border-style: solid;
          font-size: 11px;
        }
        .card-title {
          font-size: 14px;
          font-weight: 500;
        }
        .card-score {
          text-align: right;
        }
        .card-score-value {
          font-size: 18px;
          font-weight: 600;
        }
        .card-score-label {
          font-size: 10px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }
        .card-description {
          font-size: 13px;
          color: #e5e7eb;
        }
        .card-meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
          font-size: 11px;
        }
        .card-meta dt {
          color: #9ca3af;
        }
        .card-meta dd {
          margin: 0;
          color: #e5e7eb;
        }
        .panel-raw {
          font-size: 12px;
        }
        .raw-pre {
          margin-top: 6px;
          border-radius: 10px;
          background: #020617;
          border: 1px solid rgba(55,65,81,0.9);
          padding: 8px 10px;
          white-space: pre-wrap;
          max-height: 220px;
          overflow: auto;
        }
        details summary {
          cursor: pointer;
        }
        @media (max-width: 960px) {
          .hero {
            height: 220px;
          }
          .hero-content {
            padding: 24px 16px;
          }
          .hero-title {
            font-size: 24px;
          }
          .shell {
            padding: 16px 14px 24px;
            margin-top: -30px;
          }
          .top-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
