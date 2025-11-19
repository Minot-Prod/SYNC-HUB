﻿import React from "react";
import AgentGrid from "../../components/AgentGrid";

export default function AgentsIndex() {
  return (
    <main
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
      }}
    >
      <AgentGrid />
    </main>
  );
}

