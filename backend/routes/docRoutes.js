const express = require("express");
const router = express.Router();
const { generateDoc, updateDoc, generateFromPR } = require("../controllers/docController");

router.post("/generate", generateDoc);
router.post("/update", updateDoc);
router.post("/pr", generateFromPR);

module.exports = router;
