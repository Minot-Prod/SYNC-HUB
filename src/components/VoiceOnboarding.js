import { useEffect, useState } from "react";

const script = [
  "Bienvenue dans le Sync GPT Hub.",
  "Ici, tu choisis un agent partenaire: prospection, rédaction, analyste, radar.",
  "Commence par le tableau de bord, puis ouvre l’assistant si tu hésites.",
  "Tu peux me demander: Trouve 10 entreprises, ou Rédige un message LinkedIn, ou Analyse cette entreprise.",
  "Bonne route."
];

export default function VoiceOnboarding(){
  const [open,setOpen] = useState(false);
  const [speaking,setSpeaking] = useState(false);

  useEffect(()=>{
    const seen = localStorage.getItem("onboarded");
    if(!seen){ setOpen(true); }
  },[]);

  function speak(){
    const synth = window.speechSynthesis;
    if(!synth) return;
    setSpeaking(true);
    const utterances = script.map(t => {
      const u = new SpeechSynthesisUtterance(t);
      u.lang = "fr-CA"; u.rate = 1; u.pitch = 1;
      u.onend = ()=>{ /* noop */ };
      return u;
    });
    utterances.forEach(u => synth.speak(u));
  }

  function stop(){
    const synth = window.speechSynthesis;
    if(synth){ synth.cancel(); }
    setSpeaking(false);
  }

  function close(){
    localStorage.setItem("onboarded","1");
    stop(); setOpen(false);
  }

  if(!open) return null;
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.45)", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center"
    }}>
      <div className="glass" style={{maxWidth:560,padding:24}}>
        <h2 style={{marginBottom:8}}>Onboarding Sync GPT Hub</h2>
        <p style={{color:"var(--text-2)"}}>Besoin d’un tour guidé vocal rapide ?</p>
        <div style={{display:"flex",gap:12, marginTop:16}}>
          <button className="btn btn-primary" onClick={speak} disabled={speaking}>▶️ Écouter</button>
          <button className="btn btn-secondary" onClick={stop}>⏹️ Stop</button>
          <button className="btn btn-secondary" onClick={close}>Fermer</button>
        </div>
      </div>
    </div>
  );
}

