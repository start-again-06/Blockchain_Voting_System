const express = require("express");
const { fetchResults } = require("./blockchain");

const router = express.Router();

router.get("/results", async (req, res) => {
  try {
    const data = await fetchResults();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
