const path = require('path');
const { readJson, writeJson } = require('../storage/jsonStore');

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function listLeads(options = {}) {
  const { status, minScore } = options;
  const all = await readJson(LEADS_FILE, []);

  return all.filter((lead) => {
    if (status && lead.status !== status) return false;
    if (typeof minScore === 'number' && (lead.score || 0) < minScore) return false;
    return true;
  });
}

async function createLead(data) {
  const all = await readJson(LEADS_FILE, []);

  const newLead = {
    id: data.id || Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    companyName: data.companyName || '',
    contactName: data.contactName || '',
    email: data.email || null,
    phone: data.phone || null,
    city: data.city || null,
    country: data.country || 'CA',
    source: data.source || 'manual',
    status: data.status || 'new', // new | qualified | nurture | lost
    score: typeof data.score === 'number' ? data.score : 0,
    tags: data.tags || [],
    notes: data.notes || '',
    meta: data.meta || {},
  };

  all.push(newLead);
  await writeJson(LEADS_FILE, all);
  return newLead;
}

async function updateLead(id, patch) {
  const all = await readJson(LEADS_FILE, []);
  const index = all.findIndex((lead) => lead.id === id);
  if (index === -1) {
    throw new Error(`Lead not found: ${id}`);
  }

  const updated = {
    ...all[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  all[index] = updated;
  await writeJson(LEADS_FILE, all);
  return updated;
}

async function getLeadById(id) {
  const all = await readJson(LEADS_FILE, []);
  return all.find((lead) => lead.id === id) || null;
}

module.exports = {
  listLeads,
  createLead,
  updateLead,
  getLeadById,
};
