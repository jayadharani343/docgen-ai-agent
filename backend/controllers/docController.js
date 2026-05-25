const axios = require("axios");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

async function callGroq(systemPrompt, userContent) {
  const res = await axios.post(
    GROQ_URL,
    {
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      temperature: 0.3,
    },
    { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" } }
  );
  return res.data.choices[0].message.content;
}

const SYSTEM_CODE = `You are a senior technical writer. Given source code, generate clear, structured Markdown documentation including:
- Overview
- Functions/Classes with parameters, return types, and descriptions
- Usage examples
- Any important notes or warnings`;

const SYSTEM_CSV = `You are a data analyst and technical writer. Given CSV data, generate a detailed Markdown report including:
- Dataset Overview (number of rows, columns, data types)
- Column Descriptions (name, type, sample values, description)
- Key Statistics (min, max, average for numeric columns)
- Data Quality Notes (missing values, duplicates, anomalies)
- Suggested Use Cases for this dataset
Be concise, structured and use tables where appropriate.`;

const SYSTEM_UPDATE = `You are a technical documentation updater. Given existing documentation and new/changed code, produce an updated Markdown doc that reflects only what changed. Preserve unchanged sections.`;

const SYSTEM_PR = `You are a changelog and documentation agent. Given a pull request title, description, and diff, generate:
- A concise changelog entry
- Updated API/function documentation if any endpoints or functions changed
- Migration notes if breaking changes exist
Output in Markdown.`;

async function generateDoc(req, res) {
  try {
    const { code, language, filename } = req.body;
    if (!code) return res.status(400).json({ error: "code is required" });
    const userContent = `Language: ${language || "auto-detect"}\nFilename: ${filename || "unknown"}\n\n\`\`\`\n${code}\n\`\`\``;
    const doc = await callGroq(SYSTEM_CODE, userContent);
    res.json({ doc });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
}

async function updateDoc(req, res) {
  try {
    const { existingDoc, newCode, language } = req.body;
    if (!existingDoc || !newCode) return res.status(400).json({ error: "existingDoc and newCode are required" });
    const userContent = `Existing Documentation:\n${existingDoc}\n\nNew/Updated Code (${language || ""}):\n\`\`\`\n${newCode}\n\`\`\``;
    const doc = await callGroq(SYSTEM_UPDATE, userContent);
    res.json({ doc });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
}

async function generateFromPR(req, res) {
  try {
    const { title, description, diff } = req.body;
    if (!title) return res.status(400).json({ error: "PR title is required" });
    const userContent = `PR Title: ${title}\nDescription: ${description || "N/A"}\n\nDiff:\n\`\`\`\n${diff || "No diff provided"}\n\`\`\``;
    const doc = await callGroq(SYSTEM_PR, userContent);
    res.json({ doc });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
}

module.exports = { generateDoc, updateDoc, generateFromPR };
