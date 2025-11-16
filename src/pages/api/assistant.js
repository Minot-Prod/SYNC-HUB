export default async function handler(req, res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  try{
    const { agentId="assistant", message="", persona="Pascal", memory={} } = req.body || {};
    const key = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    if(!key) return res.status(500).json({error:"OPENAI_API_KEY missing"});

    const sysBrand = `
Tu es un agent du Sync GPT Hub (Parlios). Style: pro, clair, neon glass, halo vert (Parlios).
Toujours: structure en sections courtes, puces si utile, et "Prochaine action" explicite.`;

    const sysAgent =
      agentId==="prospection" ? "Rôle: trouver cibles B2B au Québec, scoring, 3 approches." :
      agentId==="redaction"   ? "Rôle: écrire messages LinkedIn/emails/scripts, 2 variantes A/B, ton ${persona}." :
      agentId==="analyste"    ? "Rôle: portrait entreprise 1‑page, risques, opportunités Sync, 3 questions discovery." :
      agentId==="radar"       ? "Rôle: détecter signaux/opportunités, proposer prochaine action priorisée." :
                                "Rôle: assistant principal, clarifier intention et router vers l’agent adapté.";

    const sysPersona = `Persona: ${persona}. Préférences: concision, concret, FR‑CA. Mémoire: ${JSON.stringify(memory).slice(0,700)}`;

    const systemPrompt = [sysBrand, sysAgent, sysPersona].join("\n\n");

    const payload = {
      model, temperature: 0.3,
      messages: [
        { role:"system", content: systemPrompt },
        { role:"user", content: message }
      ]
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${key}` },
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    const text = j?.choices?.[0]?.message?.content || "(Aucune sortie)";
    return res.status(200).json({ ok:true, output: text });
  }catch(e){
    return res.status(500).json({error:String(e)});
  }
}
