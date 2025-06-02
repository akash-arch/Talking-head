require("dotenv").config();
const { ElevenLabsClient } = require("elevenlabs");

const apiKey = process.env.ELEVEN_LABS_API_KAY;

const client = new ElevenLabsClient({
  apiKey: apiKey,
});

const getVoices = async (req, res) => {
  try {
    const voiceList = await client.voices.search({
      include_total_count: true,
    });

    if (voiceList?.voices?.length) {
      return res.status(200).json({
        ...voiceList
      });
    } else {
      return res.status(500).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getVoices;
