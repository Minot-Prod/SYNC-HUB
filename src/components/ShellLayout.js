import React from "react";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import styles from "./ShellLayout.module.css";

export default function ShellLayout({ children }) {
  return (
    <div className={styles.appRoot}>
      <Sidebar />
      <div className={styles.mainArea}>
        <HeaderBar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
