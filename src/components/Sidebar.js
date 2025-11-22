import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

const navItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    key: "agents",
    label: "Agents IA",
    href: "/agents",
  },
  {
    key: "chat",
    label: "Assistant",
    href: "/chat",
  },
  {
    key: "opportunities",
    label: "Opportunités",
    href: "/opportunities",
  },
  {
    key: "notes",
    label: "Notes",
    href: "/notes",
  },
  {
    key: "settings",
    label: "Paramètres",
    href: "/settings",
  },
];

export default function Sidebar() {
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/dashboard" && router.pathname === "/") return true;
    return router.pathname.startsWith(href);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoBlock}>
        <div className={styles.logoCircle}>S</div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>SYNC-HUB</span>
          <span className={styles.logoSubtitle}>Sales AI Cockpit</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link key={item.key} href={item.href} legacyBehavior>
            <a
              className={
                isActive(item.href)
                  ? `${styles.navItem} ${styles.navItemActive}`
                  : styles.navItem
              }
            >
              <span className={styles.navBullet} />
              <span className={styles.navLabel}>{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>

      <div className={styles.bottomBlock}>
        <div className={styles.statusDot} />
        <div className={styles.statusText}>
          <span className={styles.statusLabel}>Mode démo Sync</span>
          <span className={styles.statusSub}>Hub connecté</span>
        </div>
      </div>
    </aside>
  );
}
