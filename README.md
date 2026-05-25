# 📄 DocGen AI Agent

> Automatically generate and update technical documentation from codebases, APIs, pull requests, and deployment changes.

## 🚀 Features

| Feature | Description |
|---|---|
| ⚡ Code → Docs | Paste any source code and get full structured Markdown documentation |
| 🔄 Update Docs | Feed existing docs + new code → AI merges and updates only what changed |
| 🔀 PR Changelog | Paste PR title, description, and diff → get changelog + migration notes |
| ⬇️ Download | Export any generated doc as `.md` file |
| 📋 Copy | One-click copy to clipboard |

## 🛠️ Tech Stack

- **Frontend**: React 18, ReactMarkdown
- **Backend**: Node.js, Express
- **AI**: Groq API (LLaMA 3 70B) — free tier available

## ⚙️ Setup

### 1. Get a Free Groq API Key
Go to [https://console.groq.com](https://console.groq.com) → Create account → API Keys → Create key

### 2. Configure Backend
```bash
cd backend
# Edit .env file
GROQ_API_KEY=your_actual_key_here
PORT=5000
```

### 3. Install & Run Backend
```bash
cd backend
npm install
npm start
```

### 4. Install & Run Frontend
```bash
cd frontend
npm install
npm start
```

### 5. Open App
Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
docgen-agent/
├── backend/
│   ├── controllers/docController.js   # AI doc generation logic
│   ├── routes/docRoutes.js            # API routes
│   ├── server.js                      # Express server
│   └── .env                           # API keys (never commit!)
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── DocOutput.js           # Markdown renderer + copy/download
    │   ├── pages/
    │   │   ├── CodeDocPage.js         # Code → Docs tab
    │   │   ├── UpdateDocPage.js       # Update Docs tab
    │   │   └── PRDocPage.js           # PR Changelog tab
    │   └── App.js
    └── public/index.html
```

## 🔌 API Endpoints

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/docs/generate` | `{ code, language, filename }` | Generate docs from code |
| POST | `/api/docs/update` | `{ existingDoc, newCode, language }` | Update existing docs |
| POST | `/api/docs/pr` | `{ title, description, diff }` | Generate PR changelog |
