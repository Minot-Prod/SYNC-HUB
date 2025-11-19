import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "ðŸ“Š" },
  { href: "/assistant", label: "Assistant", icon: "ðŸ¤" },
  { href: "/agents", label: "Agents", icon: "ðŸ§‘â€ðŸ’»" },
  { href: "/opportunities", label: "OpportunitÃ©s", icon: "ðŸ’¼" },
  { href: "/notes", label: "Notes", icon: "ðŸ“" },
  { href: "/settings", label: "RÃ©glages", icon: "âš™ï¸" }
];

export default function Sidebar() {
  const router = useRouter();
  const isActive = (href) => router.pathname === href;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandDot} />
        <span className={styles.brandText}>Sync GPT Hub</span>
      </div>
      <nav className={styles.nav}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive(item.href) ? styles.active : ""}`}>
            <span className={styles.icon} aria-hidden>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className={styles.footer}>
        <span className={styles.version}>v0.2.0</span>
      </div>
    </aside>
  );
}
