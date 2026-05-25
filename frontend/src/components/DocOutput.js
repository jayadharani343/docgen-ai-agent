import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./DocOutput.css";

export default function DocOutput({ doc, loading, error }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(doc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([doc], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "documentation.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="doc-output loading">
      <div className="spinner" />
      <p className="loading-text">Generating documentation...</p>
      <p className="loading-sub">AI is analyzing your code ✨</p>
    </div>
  );

  if (error) return (
    <div className="doc-output error">
      <span>⚠️</span> {error}
    </div>
  );

  if (!doc) return (
    <div className="doc-output empty">
      <div className="empty-icon">📝</div>
      <p className="empty-text">Your generated documentation<br/>will appear here</p>
      <p className="empty-hint">Paste code and click Generate →</p>
    </div>
  );

  return (
    <div className="doc-output">
      <div className="doc-toolbar">
        <span className="doc-label">✨ Generated Documentation</span>
        <div className="doc-actions">
          <button className="action-btn" onClick={handleCopy}>
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
          <button className="action-btn green" onClick={handleDownload}>
            ⬇️ Download .md
          </button>
        </div>
      </div>
      <div className="doc-body">
        <ReactMarkdown>{doc}</ReactMarkdown>
      </div>
    </div>
  );
}
