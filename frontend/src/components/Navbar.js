import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <div className="logo-icon">
            <span>📄</span>
          </div>
          <div className="logo-text">
            <span className="logo-name">Doc<span className="logo-gradient">Gen</span></span>
            <span className="logo-badge">AI AGENT</span>
          </div>
        </div>
        <div className="navbar-tagline">Automated Technical Documentation</div>
      </div>

      <div className="navbar-center">
        <div className="stat-pill">
          <span className="stat-dot purple" />
          <span>Code Analysis</span>
        </div>
        <div className="stat-pill">
          <span className="stat-dot cyan" />
          <span>CSV Reports</span>
        </div>
        <div className="stat-pill">
          <span className="stat-dot green" />
          <span>PR Changelogs</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="live-badge">
          <span className="live-dot" />
          <span>LIVE</span>
        </div>
        <div className="model-badge">🤖 LLaMA 3.3 70B</div>
      </div>
    </nav>
  );
}
