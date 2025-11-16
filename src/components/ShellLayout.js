import Link from "next/link";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "📊" },
  { id: "chat", label: "Chat", href: "/chat", icon: "💬" },
  { id: "opportunities", label: "Opportunities", href: "/opportunities", icon: "🎯" },
];

export default function ShellLayout({ active = "dashboard", title, children }) {
  return (
    <div className="app">
      <div className="shell">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-dot" />
            <span className="logo-text">Parlios</span>
          </div>

          <nav className="nav">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === active;
              const classes = isActive ? "nav-item nav-item-active" : "nav-item";
              return (
                <Link key={item.id} href={item.href} className={classes}>
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {isActive && <span className="nav-active-glow" />}
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="user-pill">
              <div className="user-avatar">M</div>
              <div className="user-meta">
                <div className="user-name">Max</div>
                <div className="user-role">Sync Productions</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="main">
          <header className="topbar">
            <div className="topbar-left">
              <h1 className="page-title">{title}</h1>
            </div>
            <div className="topbar-right">
              <div className="search-wrap">
                <input
                  className="search-input"
                  placeholder="Search in Sync GPT Hub..."
                />
              </div>
              <div className="topbar-icons">
                <button className="top-icon" aria-label="Notifications">
                  🔔
                </button>
                <button className="top-icon" aria-label="Account">
                  👤
                </button>
              </div>
            </div>
          </header>

          <main className="content">{children}</main>
        </div>
      </div>

      <style jsx>{`
        .app {
          min-height: 100vh;
          background: radial-gradient(circle at top, #020617 0, #02020a 45%, #000 100%);
          color: #e5e7eb;
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: 18px;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }
        .shell {
          width: 100%;
          max-width: 1320px;
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 16px;
        }
        .sidebar {
          border-radius: 22px;
          padding: 14px 12px 12px;
          background: radial-gradient(
              circle at top left,
              rgba(56, 189, 248, 0.14),
              transparent 55%
            ),
            radial-gradient(
              circle at bottom,
              rgba(249, 115, 22, 0.22),
              transparent 60%
            ),
            rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.45);
          backdrop-filter: blur(22px);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.9);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px 10px;
        }
        .logo-dot {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: conic-gradient(from 180deg, #22c55e, #6366f1, #f97316);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.8);
        }
        .logo-text {
          font-weight: 600;
          letter-spacing: 0.08em;
          font-size: 13px;
          text-transform: uppercase;
          color: #f9fafb;
        }
        .nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 8px;
        }
        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 999px;
          color: #e5e7eb;
          font-size: 13px;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .nav-item:hover {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(148, 163, 184, 0.5);
        }
        .nav-item-active {
          background: linear-gradient(
            to right,
            rgba(56, 189, 248, 0.13),
            rgba(249, 115, 22, 0.18)
          );
          border-color: rgba(96, 165, 250, 0.9);
          box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.6);
        }
        .nav-icon {
          width: 22px;
          text-align: center;
          font-size: 14px;
        }
        .nav-label {
          flex: 1;
        }
        .nav-active-glow {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.9);
          opacity: 0.4;
          pointer-events: none;
        }
        .sidebar-footer {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(30, 64, 175, 0.7);
        }
        .user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(148, 163, 184, 0.6);
        }
        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 20%, #22c55e, #0f172a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
        }
        .user-meta {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .user-name {
          font-size: 12px;
          font-weight: 500;
        }
        .user-role {
          font-size: 10px;
          color: #9ca3af;
        }
        .main {
          border-radius: 26px;
          background: radial-gradient(
              circle at top left,
              rgba(37, 99, 235, 0.25),
              transparent 60%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(244, 63, 94, 0.2),
              transparent 55%
            ),
            rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(148, 163, 184, 0.4);
          backdrop-filter: blur(28px);
          box-shadow: 0 26px 70px rgba(15, 23, 42, 0.95);
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .page-title {
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .search-wrap {
          min-width: 260px;
        }
        .search-input {
          width: 100%;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: radial-gradient(
              circle at top left,
              rgba(56, 189, 248, 0.2),
              transparent 70%
            ),
            rgba(15, 23, 42, 0.96);
          padding: 6px 12px;
          font-size: 13px;
          color: #e5e7eb;
        }
        .search-input::placeholder {
          color: #9ca3af;
        }
        .search-input:focus {
          outline: none;
          border-color: rgba(56, 189, 248, 0.9);
          box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.8);
        }
        .topbar-icons {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .top-icon {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.96);
          color: #e5e7eb;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .top-icon:hover {
          background: rgba(30, 64, 175, 0.9);
          border-color: rgba(129, 140, 248, 0.9);
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 4px;
        }
        @media (max-width: 960px) {
          .shell {
            grid-template-columns: minmax(0, 1fr);
          }
          .sidebar {
            flex-direction: row;
            align-items: center;
            gap: 8px;
            padding: 10px;
          }
          .nav {
            flex-direction: row;
            justify-content: space-around;
          }
          .sidebar-footer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
