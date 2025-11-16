import fs from "fs";
import path from "path";

function getFilePath() {
  return path.join(process.cwd(), "data", "opportunities.json");
}

function loadOpportunities() {
  try {
    const filePath = getFilePath();
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
    console.error("[API /opportunities] loadOpportunities error:", err);
    return [];
  }
}

function saveOpportunities(items) {
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[API /opportunities] saveOpportunities error:", err);
    return false;
  }
}

function createOpportunity(payload) {
  const existing = loadOpportunities();

  const now = new Date().toISOString();
  const nextId = existing.length > 0
    ? Math.max(
        ...existing
          .map((o) => Number(o.id || 0))
          .filter((n) => !Number.isNaN(n))
      ) + 1
    : 1;

  const base = payload || {};

  const opp = {
    id: nextId,
    name: base.name || "Nouvelle opportunit?",
    stage: Number(base.stage || 1),
    status: base.status || "open",
    value: Number(base.value || 0),
    owner: base.owner || "Sync Team",
    probability: typeof base.probability === "number" ? base.probability : 0.3,
    source: base.source || "manual",
    tags: Array.isArray(base.tags) ? base.tags : [],
    createdAt: base.createdAt || now,
    updatedAt: now,
  };

  existing.unshift(opp);
  const ok = saveOpportunities(existing);
  if (!ok) {
    throw new Error("Erreur lors de la sauvegarde des opportunit?s");
  }

  return opp;
}

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const items = loadOpportunities();
      return res.status(200).json(items);
    } catch (err) {
      console.error("[API /opportunities] GET error:", err);
      return res.status(500).json({ error: "Erreur serveur (GET opportunities)" });
    }
  }

  if (req.method === "POST") {
    try {
      const payload = req.body || {};
      const created = createOpportunity(payload);
      return res.status(201).json(created);
    } catch (err) {
      console.error("[API /opportunities] POST error:", err);
      return res.status(500).json({ error: "Erreur serveur (POST opportunities)" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "M?thode non autoris?e" });
}
