import React from "react";
import styles from "./HeaderBar.module.css";

export default function HeaderBar() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>SYNC-HUB</h1>
          <p className={styles.subtitle}>Cockpit IA des vendeurs Sync</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.tag}>Dark Mode</div>
        <div className={styles.statusPill}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>IA prête</span>
        </div>
      </div>
    </header>
  );
}
