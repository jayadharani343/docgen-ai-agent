import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CodeDocPage from "./pages/CodeDocPage";
import UpdateDocPage from "./pages/UpdateDocPage";
import PRDocPage from "./pages/PRDocPage";
import "./App.css";

const TABS = [
  { id: "code",   icon: "⚡", label: "Code → Docs",    sub: "Generate from source",  color: "#8b5cf6" },
  { id: "update", icon: "🔄", label: "Update Docs",    sub: "Sync with new code",     color: "#34d399" },
  { id: "pr",     icon: "🔀", label: "PR Changelog",   sub: "From pull requests",     color: "#f472b6" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("code");
  const active = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <aside className="sidebar">
          <div className="sidebar-label">FEATURES</div>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`sidebar-btn ${activeTab === t.id ? "active" : ""}`}
              style={{ "--tab-color": t.color }}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="sidebar-icon">{t.icon}</span>
              <div className="sidebar-text">
                <span className="sidebar-title">{t.label}</span>
                <span className="sidebar-sub">{t.sub}</span>
              </div>
              {activeTab === t.id && <span className="sidebar-arrow">›</span>}
            </button>
          ))}

          <div className="sidebar-divider" />

          <div className="sidebar-info">
            <div className="info-card">
              <div className="info-icon">🤖</div>
              <div className="info-text">
                <strong>LLaMA 3.3 70B</strong>
                <span>via Groq API</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <div className="info-text">
                <strong>Ultra Fast</strong>
                <span>~3s generation</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-hero" style={{ "--hero-color": active.color }}>
            <div className="hero-icon">{active.icon}</div>
            <div className="hero-text">
              <h1>{active.label}</h1>
              <p>{active.sub}</p>
            </div>
            <div className="hero-glow" />
          </div>

          {activeTab === "code"   && <CodeDocPage />}
          {activeTab === "update" && <UpdateDocPage />}
          {activeTab === "pr"     && <PRDocPage />}
        </main>
      </div>
    </div>
  );
}
