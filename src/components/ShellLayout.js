import React from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import styles from "./ShellLayout.module.css";

export default function ShellLayout({ title = "Sync GPT Hub", children }) {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <div className={styles.mainCol}>
        <HeaderBar title={title} />
        <main className={styles.mainArea}>{children}</main>
      </div>
    </div>
  );
}