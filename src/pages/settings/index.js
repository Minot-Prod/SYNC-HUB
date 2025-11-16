import React from "react";
import ShellLayout from "@/components/ShellLayout";
export default function SettingsPage(){
  return (
    <ShellLayout title="Réglages">
      <div style={{border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,background:"linear-gradient(135deg, rgba(20,24,36,0.85), rgba(10,14,24,0.92))",boxShadow:"0 18px 40px rgba(0,0,0,0.7)",padding:16}}>
        <div style={{fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(148,163,184,0.9)",marginBottom:6}}>Préférences (bientôt)</div>
        <div style={{fontSize:14,color:"rgba(209,213,219,0.95)"}}>Style vendeur, intégrations (Supabase/Netlify), etc.</div>
      </div>
    </ShellLayout>
  );
}