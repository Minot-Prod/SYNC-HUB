import React, { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Identifiants incorrects");
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#020617",
      color: "#e2e8f0",
    }}>
      <div style={{
        width: "340px",
        padding: "32px",
        borderRadius: "24px",
        background: "rgba(15,23,42,0.8)",
        border: "1px solid rgba(148,163,184,0.4)",
        boxShadow: "0 24px 60px rgba(15,23,42,0.8)",
        backdropFilter: "blur(12px)",
      }}>
        <h1 style={{ fontSize: "24px", marginBottom: "16px", fontWeight: 700 }}>
          Connexion Sync
        </h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email employé"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(148,163,184,0.4)",
              background: "rgba(20,28,45,0.9)",
              color: "#fff",
              fontSize: "14px",
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(148,163,184,0.4)",
              background: "rgba(20,28,45,0.9)",
              color: "#fff",
              fontSize: "14px",
            }}
          />
          {error && (
            <div style={{ fontSize: "12px", color: "#f87171" }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",
              color: "#020617",
              fontWeight: 700,
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
