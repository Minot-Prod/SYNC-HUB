export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
  const { email = "", password = "" } = req.body || {};
  const allowedEmail = process.env.SYNC_EMAIL || "employee@sync.fr";
  const allowedPass = process.env.SYNC_PASS || "sync1234";
  if (email === allowedEmail && password === allowedPass) {
    // Génère un token simple (à complexifier si besoin)
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");
    // Cookie HttpOnly valable 24h
    res.setHeader("Set-Cookie", `sync_token=${token}; HttpOnly; Path=/; Max-Age=86400`);
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: "Identifiants incorrects" });
}

