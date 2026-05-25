import React, { useState } from "react";
import axios from "axios";
import DocOutput from "../components/DocOutput";
import API_BASE from "../config";
import "./Page.css";

export default function UpdateDocPage() {
  const [existingDoc, setExistingDoc] = useState("");
  const [newCode, setNewCode] = useState("");
  const [language, setLanguage] = useState("");
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!existingDoc.trim() || !newCode.trim()) return;
    setLoading(true); setError(""); setDoc("");
    try {
      const { data } = await axios.post(`${API_BASE}/api/docs/update`, { existingDoc, newCode, language });
      setDoc(data.doc);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="split-layout">
        <div className="input-panel">
          <div className="field">
            <label>📄 Existing Documentation (Markdown)</label>
            <textarea rows={8} value={existingDoc} onChange={e => setExistingDoc(e.target.value)}
              placeholder={"# My API\n\n## getUser(id)\nReturns a user by ID..."} />
          </div>
          <div className="field">
            <label>🔧 New / Updated Code</label>
            <textarea rows={8} value={newCode} onChange={e => setNewCode(e.target.value)}
              placeholder="// Paste the updated code here..." />
          </div>
          <div className="field">
            <label>🌐 Language (optional)</label>
            <input value={language} onChange={e => setLanguage(e.target.value)} placeholder="e.g. TypeScript" />
          </div>
          <button className="primary-btn" onClick={handleUpdate} disabled={loading || !existingDoc.trim() || !newCode.trim()}>
            {loading ? "Updating..." : "🔄 Update Documentation"}
          </button>
        </div>
        <div className="output-panel">
          <DocOutput doc={doc} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
