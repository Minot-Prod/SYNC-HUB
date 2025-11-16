import { useState } from "react";

const AGENTS = [
  { id: "sales", label: "Sales (general)" },
  { id: "prospection", label: "Prospection" },
  { id: "messages", label: "Messages & Scripts" },
  { id: "analyste", label: "Analyste entreprise" },
  { id: "radar", label: "Radar opportunites" },
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [agent, setAgent] = useState("sales");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      role: "user",
      content: trimmed,
      agent,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent, message: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur reseau");
      }

      const data = await res.json();

      const assistantMessage = {
        role: "assistant",
        content: data.reply || "Aucune reponse generee.",
        agent: data.agent || agent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#050816",
        color: "#f9fafb",
      }}
    >
      <header style={{ marginBottom: "16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600 }}>Sync Hub — Multi-agents IA</h1>
        <p style={{ fontSize: "14px", color: "#9ca3af" }}>
          Hub MVP des agents de vente Sync Productions (sales, prospection, scripts, analyste, radar).
        </p>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "900px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="agent-select"
            style={{ fontSize: "14px", color: "#e5e7eb", minWidth: "120px" }}
          >
            Agent actif
          </label>
          <select
            id="agent-select"
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "999px",
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#e5e7eb",
              fontSize: "14px",
              outline: "none",
            }}
          >
            {AGENTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
          {loading && (
            <span style={{ fontSize: "12px", color: "#a5b4fc" }}>
              L&apos;agent pense...
            </span>
          )}
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid #1f2937",
            background:
              "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 60%), #020617",
            overflowY: "auto",
          }}
        >
          {messages.length === 0 && (
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Choisis un agent puis pose une question.  
              Exemples : &quot;Prospection : ecris un message LinkedIn&quot;,  
              &quot;Analyste : analyse ce type de client&quot;,  
              &quot;Messages : donne un script d&apos;appel&quot;.
            </p>
          )}

          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            const bubbleAgent = msg.agent || agent;
            return (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    backgroundColor: isUser ? "#2563eb" : "rgba(15,23,42,0.9)",
                    color: "#f9fafb",
                    border: isUser
                      ? "none"
                      : "1px solid rgba(148,163,184,0.3)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {!isUser && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#a5b4fc",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Agent : {bubbleAgent}
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        {error && (
          <div
            style={{
              fontSize: "13px",
              color: "#f97373",
              backgroundColor: "rgba(127,29,29,0.3)",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(248,113,113,0.4)",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "8px", marginTop: "8px" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pose une question a l agent selectionne..."
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "999px",
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#e5e7eb",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 16px",
              borderRadius: "999px",
              border: "none",
              fontSize: "14px",
              fontWeight: 500,
              cursor: loading ? "default" : "pointer",
              background: loading
                ? "#4b5563"
                : "linear-gradient(to right, #22c55e, #22d3ee)",
              color: "#020617",
              minWidth: "80px",
            }}
          >
            {loading ? "..." : "Envoyer"}
          </button>
        </form>
      </main>
    </div>
  );
}
