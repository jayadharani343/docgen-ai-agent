import React, { useState } from "react";
import axios from "axios";
import DocOutput from "../components/DocOutput";
import "./Page.css";
import "./CSVDocPage.css";

export default function CSVDocPage() {
  const [csvData, setCsvData] = useState("");
  const [filename, setFilename] = useState("");
  const [preview, setPreview] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parseCSV = (text) => {
    const lines = text.trim().split("\n").filter(Boolean);
    if (lines.length === 0) return;
    const heads = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
    const rows = lines.slice(1, 6).map(line =>
      line.split(",").map(cell => cell.trim().replace(/"/g, ""))
    );
    setHeaders(heads);
    setPreview(rows);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => { setCsvData(ev.target.result); parseCSV(ev.target.result); };
    reader.readAsText(file);
  };

  const handlePaste = (e) => {
    const text = e.target.value;
    setCsvData(text);
    parseCSV(text);
  };

  const handleGenerate = async () => {
    if (!csvData.trim()) return;
    setLoading(true); setError(""); setDoc("");
    try {
      const { data } = await axios.post("/api/docs/csv", { csvData, filename });
      setDoc(data.doc);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const rowCount = csvData ? csvData.trim().split("\n").length - 1 : 0;

  return (
    <div className="page">
      <div className="split-layout">
        <div className="input-panel">

          <div className="csv-upload-zone" onClick={() => document.getElementById("csv-file-input").click()}>
            <div className="upload-zone-icon">📂</div>
            <div className="upload-zone-text">
              <strong>Click to upload CSV file</strong>
              <span>or paste data below</span>
            </div>
            <span className="upload-zone-hint">.csv files supported</span>
            <input id="csv-file-input" type="file" accept=".csv" onChange={handleFileUpload} hidden />
          </div>

          {filename && (
            <div className="csv-file-info">
              <span className="file-icon">📄</span>
              <span className="file-name">{filename}</span>
              <span className="file-rows">{rowCount} rows</span>
            </div>
          )}

          <div className="field">
            <label>📝 Or Paste CSV Data</label>
            <textarea
              rows={7}
              value={csvData}
              onChange={handlePaste}
              placeholder={"name,age,city,salary\nAlice,28,New York,75000\nBob,34,London,82000"}
            />
          </div>

          {headers.length > 0 && (
            <div className="csv-preview">
              <div className="preview-label">👁️ Preview — first 5 rows</div>
              <div className="preview-table-wrap">
                <table className="preview-table">
                  <thead>
                    <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="preview-stats">
                <span>🗂️ {headers.length} columns</span>
                <span>📊 {rowCount} rows</span>
              </div>
            </div>
          )}

          <button className="primary-btn csv-btn" onClick={handleGenerate} disabled={loading || !csvData.trim()}>
            {loading ? "Analyzing..." : "📊 Analyze & Generate Report"}
          </button>
        </div>

        <div className="output-panel">
          <DocOutput doc={doc} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
