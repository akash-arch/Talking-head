require("dotenv").config();
const { ElevenLabsClient } = require("elevenlabs");
const webStreamToNodeStream = require("./webStreamToNodeStream");

const apiKey = process.env.ELEVEN_LABS_API_KAY;

const client = new ElevenLabsClient({
  apiKey: apiKey,
});

const generateAudio = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Bad Request: please provide body",
    });
  }

  const { text, voiceId } = req?.body;

  if (!text || !voiceId) {
    return res.status(400).json({
      message: "Bad Request: please provide text and voice in body",
    });
  }

  try {
    const buffer = await client.textToSpeech.convert(voiceId, {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
      voice_settings: {
        stability: 0.4,
      },
    });

    const nodeStream = webStreamToNodeStream(buffer);
    res.setHeader("Content-Type", "audio/mpeg");
    nodeStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "TTS failed" });
  }
};

module.exports = generateAudio;
