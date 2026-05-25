import React, { useState } from "react";
import axios from "axios";
import DocOutput from "../components/DocOutput";
import API_BASE from "../config";
import "./Page.css";

const LANGUAGES = ["auto-detect","javascript","typescript","python","java","go","rust","c","c++","c#","php","ruby","swift","kotlin","sql","shell"];

export default function CodeDocPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("auto-detect");
  const [filename, setFilename] = useState("");
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!code.trim()) return;
    setLoading(true); setError(""); setDoc("");
    try {
      const { data } = await axios.post(`${API_BASE}/api/docs/generate`, { code, language, filename });
      setDoc(data.doc);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFilename(file.name);
    const ext = file.name.split(".").pop().toLowerCase();
    const langMap = { js:"javascript", ts:"typescript", py:"python", java:"java", go:"go", rs:"rust", rb:"ruby", php:"php", cs:"c#", kt:"kotlin", sh:"shell", sql:"sql" };
    if (langMap[ext]) setLanguage(langMap[ext]);
    const reader = new FileReader();
    reader.onload = (ev) => setCode(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="page">
      <div className="split-layout">
        <div className="input-panel">
          <div className="field-row">
            <div className="field">
              <label>🌐 Language</label>
              <select value={language} onChange={e => setLanguage(e.target.value)}>
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="field flex1">
              <label>📁 Filename (optional)</label>
              <input value={filename} onChange={e => setFilename(e.target.value)} placeholder="e.g. auth.service.ts" />
            </div>
            <div className="field">
              <label>⬆️ Upload</label>
              <label className="upload-btn">
                📂 Browse
                <input type="file" accept=".js,.ts,.py,.java,.go,.rs,.rb,.php,.cs,.kt,.sh,.sql,.c,.cpp" onChange={handleFileUpload} hidden />
              </label>
            </div>
          </div>
          <div className="field">
            <label>💻 Source Code</label>
            <textarea
              rows={18}
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="// Paste your code here..."
            />
          </div>
          <button className="primary-btn" onClick={handleGenerate} disabled={loading || !code.trim()}>
            {loading ? "Generating..." : "⚡ Generate Documentation"}
          </button>
        </div>
        <div className="output-panel">
          <DocOutput doc={doc} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
