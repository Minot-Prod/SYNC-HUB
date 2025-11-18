import React, { useState, useEffect } from "react";

/**
 * Widget de to-do list pour la journée.
 * Les tâches sont stockées en localStorage.
 */
export default function TodoWidget() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("syncHub.tasks");
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("syncHub.tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [...prev, { id: Date.now(), label: trimmed, completed: false }]);
    setInput("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const showCongrats = completedCount >= 3;

  return (
    <section style={{ marginTop: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>To‑do du jour</h2>
      <form onSubmit={addTask} style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une tâche…"
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
            background: "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
            color: "#020617",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Ajouter
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.5 : 1,
                fontSize: "14px",
              }}
            >
              {task.label}
            </span>
          </li>
        ))}
      </ul>

      {showCongrats && (
        <div style={{ marginTop: "8px", fontSize: "12px", fontWeight: 600, color: "#facc15" }}>
          Bravo ! Tu as complété {completedCount} tâches aujourd’hui. 🚀
        </div>
      )}
    </section>
  );
}
