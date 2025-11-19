import React from "react";

export default function AgentAvatar({ seed, accent="green", size=56 }){
  const palette = {
    green:["#0affc6","#00ff88"],
    cyan:["#00f0ff","#3be8ff"],
    purple:["#bf00ff","#7b2cff"],
    amber:["#ffaa00","#ffd36b"],
    red:["#ff0055","#ff6b9e"]
  }[accent] || ["#00f0ff","#3be8ff"];
  const id = `grad-${seed}-${accent}`;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className="halo-green" role="img" aria-label={`Avatar ${seed}`}>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={palette[0]} /><stop offset="1" stopColor={palette[1]} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="80" height="80" rx="18" fill={`url(#${id})`} opacity=".18"/>
      <circle cx="40" cy="34" r="16" fill={`url(#${id})`} />
      <rect x="18" y="52" width="44" height="16" rx="8" fill={`url(#${id})`} />
    </svg>
  );
}

