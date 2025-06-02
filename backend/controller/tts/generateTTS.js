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
      message: "Bad Request: please provide text in body",
    });
  }

  const { text } = req?.body;

  if (!text) {
    return res.status(400).json({
      message: "Bad Request: please provide text in body",
    });
  }

  try {
    const voiceId = "JBFqnCBsd6RMkjVDRZzb"; // Rachel's voice
    const buffer = await client.textToSpeech.convert(voiceId, {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
    });

    const nodeStream = webStreamToNodeStream(buffer)
    res.setHeader("Content-Type", "audio/mpeg");
    nodeStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "TTS failed" });
  }
};

module.exports = generateAudio;
