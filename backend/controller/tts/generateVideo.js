require("dotenv").config();
const fetch = require("node-fetch");

const generateVideo = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Bad Request: please provide body",
    });
  }

  const { imageUrl, audioUrl, options } = req?.body;

  if (!imageUrl || !audioUrl) {
    return res.status(400).json({
      message: "Bad Request: imageUrl and audioUrl are required",
    });
  }

  try {
    // 1) Fetch files into Blobs (Node 18+ has Blob & File globally)

    const img = await fetch(imageUrl).then((r) => r.blob());
    const aud = await fetch(audioUrl).then((r) => r.blob());

    const app = await Client.connect(process.env.HF_SPACE_ID, {
      hf_token: process.env.HF_TOKEN,
    });

    const args = [
      handle_file(img),
      handle_file(aud),
      options?.preprocess ?? "full",
      options?.size ?? 256,
      options?.still ?? true,
      options?.expression_scale ?? 1.0,
      options?.enhancer ?? null,
    ];
    const result = await app.predict("/predict", args);

    const output = result.data?.[0];
    if (!output) throw new Error("No video returned");

    const url = typeof output === "string" ? output : output?.url || output;
    const vidResp = await fetch(url);
    res.setHeader("Content-Type", "video/mp4");
    vidResp.body.pipe(res);

  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: "Talking head generation failed",
      detail: err?.message,
    });
  }
};

module.exports = generateVideo;
