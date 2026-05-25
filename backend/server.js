require("dotenv").config();
const express = require("express");
const cors = require("cors");
const docRoutes = require("./routes/docRoutes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "2mb" }));

app.use("/api/docs", docRoutes);

app.get("/", (req, res) => res.json({ status: "DocGen Agent API running" }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
