﻿import React, { useState, useEffect } from "react";

/**
 * Plan de la journée / To-do intelligente
 * - tâches alimentées par les suggestions de Sacha (props.suggestions)
 * - stockage localStorage
 * - feedback positif + progression
 */
export default function TodoWidget({ suggestions = [] }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState(null);

  const fallbackSuggestions = [
    {
      title: "Relancer 5 prospects chauds",
      agentSlug: "redaction",
      badge: "Agent Rédaction",
    },
    {
      title: "Lister 10 entreprises cibles",
      agentSlug: "prospection",
      badge: "Agent Prospection",
    },
    {
      title: "Analyser 1 entreprise prioritaire",
      agentSlug: "analyse",
      badge: "Analyste Entreprise",
    },
    {
      title: "Répondre aux DM / emails en attente",
      agentSlug: "redaction",
      badge: "Agent Rédaction",
    },
    {
      title: "Scanner le marché (mots-clés / tendances)",
      agentSlug: "radar",
      badge: "Radar Opportunités",
    },
  ];

  // Chargement initial depuis localStorage
  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined"
          ? window.localStorage.getItem("syncHub.dailyTasks")
          : null;
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Synchronisation dans localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "syncHub.dailyTasks",
          JSON.stringify(tasks)
        );
      }
    } catch {}
  }, [tasks]);

  // Alimentation par les suggestions de Sacha si aucune tâche n’existe encore
  useEffect(() => {
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      if (tasks.length === 0) {
        const base = fallbackSuggestions;
        const initial = base.map((s, idx) => ({
          id: Date.now() + idx,
          label: s.title,
          agentSlug: s.agentSlug,
          badge: s.badge,
          completed: false,
        }));
        setTasks(initial);
      }
      return;
    }
    if (tasks.length > 0) return;
    const initial = suggestions.map((s, idx) => ({
      id: Date.now() + idx,
      label: s.title,
      agentSlug: s.agentSlug,
      badge: s.badge || "",
      completed: false,
    }));
    setTasks(initial);
  }, [suggestions, tasks.length]);

  function addTask(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: trimmed,
        agentSlug: "",
        badge: "Tâche perso",
        completed: false,
      },
    ]);
    setInput("");
  }

  function toggleTask(id) {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    const toggled = updated.find((task) => task.id === id);
    setTasks(updated);
    if (toggled && toggled.completed) {
      // Affiche un toast de félicitations
      setToast(`✔ ${toggled.label} accomplie !`);
      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  }

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  let feedback = "";
  if (completedCount >= 1 && completedCount < 3) {
    feedback = "✔ Bravo, tu as enclenché la machine.";
  } else if (completedCount >= 3 && completedCount < 5) {
    feedback = "🔥 Solide rythme, tu prends le contrôle de ta journée.";
  } else if (completedCount >= 5) {
    feedback = "🚀 Mode Sync activé : tu enchaînes comme un pro.";
  }

  return (
    <section style={{ marginTop: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "4px" }}>
        Plan de la journée
      </h2>
      <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>
        Les actions proposées par Sacha pour aujourd’hui.
      </p>

      {/* Progression */}
      <div
        style={{
          fontSize: "12px",
          color: "#e5e7eb",
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>
          Aujourd’hui : {completedCount} tâche
          {completedCount > 1 ? "s" : ""} complétée
          {total > 0 ? ` / ${total}` : ""}
        </span>
        <span>{progress}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: "6px",
          borderRadius: "999px",
          background: "rgba(30,64,175,0.8)",
          overflow: "hidden",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #22c55e, #a3e635, #facc15)",
          }}
        />
      </div>

      {/* Formulaire ajout tâche perso */}
      <form
        onSubmit={addTask}
        style={{ display: "flex", gap: "8px", marginBottom: "12px" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une tâche perso…"
          style={{
            flex: "1",
            borderRadius: "8px",
            padding: "8px 12px",
            border: "1px solid rgba(148,163,184,0.4)",
            background: "rgba(20,28,45,0.9)",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background:
              "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
            color: "#020617",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Ajouter
        </button>
      </form>

      {/* Liste de tâches */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 8px 0",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 8px",
              borderRadius: "8px",
              background: task.completed
                ? "rgba(22,163,74,0.12)"
                : "rgba(15,23,42,0.6)",
              border: "1px solid rgba(148,163,184,0.35)",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.6 : 1,
                  fontSize: "14px",
                }}
              >
                {task.label}
              </span>
              {(task.badge || task.agentSlug) && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    border: "1px solid rgba(148,163,184,0.6)",
                    fontSize: "11px",
                    color: task.completed ? "#bbf7d0" : "#e5e7eb",
                  }}
                >
                  {task.badge ||
                    (task.agentSlug
                      ? `Agent ${task.agentSlug}`
                      : "Agent")}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Feedback motivant */}
      {feedback && (
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#bbf7d0",
            marginBottom: "8px",
          }}
        >
          {feedback}
        </div>
      )}

      {/* Encart récap bientôt + aide stockage */}
      <div
        style={{
          marginTop: "4px",
          borderRadius: "12px",
          padding: "12px",
          background: "rgba(15,23,42,0.8)",
          border: "1px dashed rgba(148,163,184,0.6)",
          fontSize: "12px",
          color: "#e5e7eb",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "4px" }}>Récap bientôt</div>
        <p style={{ margin: 0, marginBottom: "4px" }}>
          Pour l’instant, Sacha suit tes tâches sur ce poste. Bientôt : bilan
          automatique de ta semaine (RDV, relances, deals) quand Sync sera
          connecté à ton CRM.
        </p>
        <p style={{ margin: 0, color: "#9ca3af" }}>
          Les tâches cochées restent enregistrées sur ce navigateur.
        </p>
      </div>

      {/* Toast félicitations */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "rgba(22,163,74,0.9)",
            color: "#ecfdf5",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          {toast}
        </div>
      )}
    </section>
  );
}
