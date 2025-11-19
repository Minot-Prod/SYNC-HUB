// src/pages/api/agent.js

import { agentOrchestrator } from '../../lib/agents/agentOrchestrator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      ok: false,
      error: 'Method Not Allowed. Use POST.',
    });
  }

  try {
    const { agent, input, context } = req.body || {};

    const result = await agentOrchestrator({
      agent,
      input,
      context,
    });

    return res.status(200).json({
      ok: true,
      result,
    });
  } catch (error) {
    console.error('[api/agent] Error:', error);

    return res.status(500).json({
      ok: false,
      error: 'Internal Server Error',
    });
  }
}

