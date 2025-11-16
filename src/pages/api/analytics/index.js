import fs from "fs";
import path from "path";

function loadOpportunities() {
  try {
    const filePath = path.join(process.cwd(), "data", "opportunities.json");
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw?.trim()) {
      return [];
    }
    const json = JSON.parse(raw);
    if (Array.isArray(json)) {
      return json;
    }
    if (Array.isArray(json.items)) {
      return json.items;
    }
    return [];
  } catch (err) {
    console.error("[API /analytics] loadOpportunities error:", err);
    return [];
  }
}

function computeAnalytics(opportunities) {
  const totalCount = opportunities.length;

  let pipelineCount = 0;
  let wonCount = 0;
  let pipelineValue = 0;

  for (const opp of opportunities) {
    const status = (opp.status || "open").toLowerCase();
    const value = Number(opp.value || 0);

    if (status === "won" || status === "closed won") {
      wonCount += 1;
    }

    if (status !== "won" && status !== "closed won" && status !== "lost" && status !== "closed lost") {
      pipelineCount += 1;
      pipelineValue += value;
    }
  }

  return {
    totalCount,
    pipelineCount,
    wonCount,
    pipelineValue,
  };
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "M?thode non autoris?e" });
  }

  try {
    const opportunities = loadOpportunities();
    const stats = computeAnalytics(opportunities);

    return res.status(200).json(stats);
  } catch (err) {
    console.error("[API /analytics] handler error:", err);
    return res.status(500).json({ error: "Erreur serveur analytics" });
  }
}
