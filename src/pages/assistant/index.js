import React, { useState } from "react";
import ShellLayout from "@/components/ShellLayout";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([{ role:"assistant", text:"Salut, je suis Sacha agent Assistant principal. On s’attaque à quoi ?" }]);
  async function onSend(e){ e.preventDefault(); const t=input.trim(); if(!t) return; setItems(p=>[...p,{role:"user",text:t}]); setInput(""); }
  return (
    <ShellLayout title="Assistant">
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16}}>
        <section style={{border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,background:"linear-gradient(135deg, rgba(20,24,36,0.85), rgba(10,14,24,0.92))",boxShadow:"0 18px 40px rgba(0,0,0,0.7)",display:"flex",flexDirection:"column",minHeight:"60vh"}}>
          <div style={{padding:"12px 14px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(148,163,184,0.9)"}}>Chat avec Sacha agent Assistant principal</div>
          </div>
          <div style={{padding:14,flex:1,overflowY:"auto"}}>
            {items.map((m,i)=>(
              <div key={i} style={{marginBottom:10,display:"flex",gap:10}}>
                <div style={{width:26,height:26,borderRadius:6,background:m.role==="assistant"?"linear-gradient(135deg, #4f8cff, #7b5cff)":"rgba(255,255,255,0.1)"}}/>
                <div>
                  <div style={{fontSize:12,color:"rgba(148,163,184,0.9)"}}>{m.role==="assistant"?"Sacha":"Toi"}</div>
                  <div style={{fontSize:14}}>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSend} style={{padding:12,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Écris ta demande…" style={{flex:1,borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(10,14,24,0.95)",color:"#fff",padding:"10px 12px"}}/>
            <button type="submit" style={{padding:"10px 14px",borderRadius:10,border:"none",background:"linear-gradient(135deg, #00f0ff, #3b82f6, #8b5cff)",color:"#020617",fontWeight:700,cursor:"pointer"}}>Envoyer</button>
          </form>
        </section>
        <aside style={{border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,background:"linear-gradient(135deg, rgba(20,24,36,0.85), rgba(10,14,24,0.92))",boxShadow:"0 18px 40px rgba(0,0,0,0.7)",padding:14}}>
          <div style={{fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(148,163,184,0.9)",marginBottom:8}}>Infos Assistant</div>
          <ul style={{margin:0,paddingLeft:16,color:"rgba(209,213,219,0.95)",fontSize:13,lineHeight:1.6}}>
            <li>Clarifie l’intention et route vers Léo/Maya/Eliot/Zoé.</li>
            <li>Next step clair, ton vendeur, pas de blabla.</li>
          </ul>
        </aside>
      </div>
    </ShellLayout>
  );
}