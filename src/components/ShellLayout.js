import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import styles from "./ShellLayout.module.css";

export default function ShellLayout({ children }) {
  return (
    <div className={styles.shellRoot}>
      <aside className={styles.sidebarArea} aria-label="Navigation principale">
        <Sidebar />
      </aside>

      <main className={styles.mainArea} id="main-content">
        <HeaderBar />
        <div className={styles.pageContent}>{children}</div>
      </main>
    </div>
  );
}

