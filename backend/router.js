const express = require("express");
const router = express.Router();

const generateTTS = require("./controller/tts/generateTTS");
const getVoices = require("./controller/tts/getVoices");

router.post("/tts", generateTTS);
router.get("/get-voices", getVoices);

module.exports = router;
