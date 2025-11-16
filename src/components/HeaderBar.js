import React from "react";
import styles from "./HeaderBar.module.css";

export default function HeaderBar({ title = "Sync GPT Hub" }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <button className={styles.ghost} onClick={() => (window.location.href="/agents")}>Agents</button>
        <button className={styles.cta} onClick={() => (window.location.href="/opportunities")}>Voir le pipeline</button>
      </div>
    </header>
  );
}