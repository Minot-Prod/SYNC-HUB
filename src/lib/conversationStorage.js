import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();
const CONVERSATIONS_DIR = path.join(ROOT_DIR, "data", "conversations");

function ensureDir() {
  try {
    if (!fs.existsSync(CONVERSATIONS_DIR)) {
      fs.mkdirSync(CONVERSATIONS_DIR, { recursive: true });
    }
  } catch (e) {
    console.error("[conversationStorage] ensureDir error", e);
  }
}

export function loadConversation(agentId) {
  try {
    ensureDir();
    const filePath = path.join(CONVERSATIONS_DIR, `${agentId}.json`);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (e) {
    console.error("[conversationStorage] loadConversation error", e);
    return [];
  }
}

export function saveConversation(agentId, messages) {
  try {
    ensureDir();
    const filePath = path.join(CONVERSATIONS_DIR, `${agentId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf-8");
  } catch (e) {
    console.error("[conversationStorage] saveConversation error", e);
  }
}

export function appendMessages(agentId, newMessages) {
  const existing = loadConversation(agentId);
  const merged = [...existing, ...newMessages];
  saveConversation(agentId, merged);
  return merged;
}
