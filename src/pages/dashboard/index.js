import React, { useState } from "react";
import ShellLayout from "../../components/ShellLayout";
import SachaHeader from "../../components/SachaHeader";
import AgentGrid from "../../components/AgentGrid";
import TodoWidget from "../../components/TodoWidget";
import {
  listOpportunities,
  getOpportunitiesStats,
} from "../../lib/services/opportunitiesService";
import { checkAuth } from "../../lib/auth";

export async function getServerSideProps(context) {
  // Vérifie l'auth côté serveur
  const authorized = checkAuth(context.req);
  if (!authorized) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const opportunities = listOpportunities();
  const stats = getOpportunitiesStats();
  return { props: { opportunities, stats } };
}

const defaultStats = {
  total: 0,
  byStage: {},
  totalPipelineValue: 0,
  totalWonValue: 0,
};

export default function DashboardPage(props) {
  const [suggestions, setSuggestions] = useState([]);

  const safeOpportunities = props.opportunities || [];
  const safeStats = props.stats || defaultStats;

  const { total, byStage, totalPipelineValue, totalWonValue } = safeStats;

  // ... (garde le reste du code DashboardPage inchangé, utilise suggestions pour TodoWidget)
  return (
    <ShellLayout>
      <main style={{ padding: "24px", width: "100%", height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: "32px", color: "white" }}>
        <SachaHeader onSuggestionsChange={setSuggestions} />
        <AgentGrid />
        {/* Stats, actions, deals, opportunités... */}
        {/* ... code existant de la page ... */}
        <TodoWidget suggestions={suggestions} />
      </main>
    </ShellLayout>
  );
}
