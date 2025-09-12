const express = require("express");
const router = express.Router();
const multer = require("multer");

const generateTTS = require("./controller/tts/generateTTS");
const getVoices = require("./controller/tts/getVoices");
const generateVideoDID = require("./controller/tts/generateVideoDID");
const getVideo = require("./controller/tts/getVideo");

// --- Multer (in-memory storage) ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/tts", generateTTS);
router.get("/get-voices", getVoices);
router.post(
  "/generate-video",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  generateVideoDID
);
router.get("/get-video/:id", getVideo);

module.exports = router;
