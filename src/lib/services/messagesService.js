const path = require('path');
const { readJson, writeJson } = require('../storage/jsonStore');

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'messages.json');

async function listMessages(options = {}) {
  const { limit = 50 } = options;
  const all = await readJson(MESSAGES_FILE, []);
  return all.slice(-limit).reverse();
}

async function addMessage(message) {
  const all = await readJson(MESSAGES_FILE, []);

  const newMessage = {
    id: message.id || Date.now().toString(),
    createdAt: new Date().toISOString(),
    channel: message.channel || 'internal',
    author: message.author || 'system',
    direction: message.direction || 'outbound',
    subject: message.subject || null,
    body: message.body || '',
    meta: message.meta || {},
  };

  all.push(newMessage);
  await writeJson(MESSAGES_FILE, all);
  return newMessage;
}

async function getThreadBy(filter = {}) {
  const all = await readJson(MESSAGES_FILE, []);
  return all.filter((msg) => {
    return Object.entries(filter).every(([key, value]) => msg[key] === value);
  });
}

module.exports = {
  listMessages,
  addMessage,
  getThreadBy,
};
