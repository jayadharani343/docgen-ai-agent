import React, { useState } from "react";
import axios from "axios";
import DocOutput from "../components/DocOutput";
import API_BASE from "../config";
import "./Page.css";

export default function PRDocPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [diff, setDiff] = useState("");
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!title.trim()) return;
    setLoading(true); setError(""); setDoc("");
    try {
      const { data } = await axios.post(`${API_BASE}/api/docs/pr`, { title, description, diff });
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
            <label>🏷️ PR Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. feat: add JWT refresh token support" />
          </div>
          <div className="field">
            <label>📝 PR Description</label>
            <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe what this PR does, why, and any breaking changes..." />
          </div>
          <div className="field">
            <label>🔧 Code Diff (optional but recommended)</label>
            <textarea rows={10} value={diff} onChange={e => setDiff(e.target.value)} placeholder={"Paste git diff output here...\n\n+ async refreshToken(userId: string) {\n+   const token = await this.jwtService.sign(...)\n- }"} />
          </div>
          <button className="primary-btn" onClick={handleGenerate} disabled={loading || !title.trim()}>
            {loading ? "Generating..." : "🔀 Generate PR Docs"}
          </button>
        </div>
        <div className="output-panel">
          <DocOutput doc={doc} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
