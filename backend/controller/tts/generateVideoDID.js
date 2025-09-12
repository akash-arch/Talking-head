require("dotenv").config();
const axios = require("axios");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// --- Cloudinary config ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// helper: upload buffer to cloudinary
const uploadToCloudinary = (buffer, folder, resourceType = "auto") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

const generateVideoWithDID = async (req, res) => {
  if (!req.files?.image?.[0] || !req.files?.audio?.[0]) {
    return res.status(400).json({
      message: "Bad Request: please provide body",
    });
  }

  try {
    // Step 1: upload image + audio
    const [imageUrl, audioUrl] = await Promise.all([
      uploadToCloudinary(req.files.image[0].buffer, "did_images", "image"),
      uploadToCloudinary(req.files.audio[0].buffer, "did_audio", "video"), // ✅ audio needs video
    ]);

    const response = await axios.post(
      "https://api.d-id.com/talks",
      {
        script: {
          type: "audio",
          audio_url: audioUrl,
        },
        source_url: imageUrl,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.DID_API_KEY + ":"
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
        timeout: 60000, // 60s safety timeout
      }
    );

    // Check if response contains required fields
    if (!response.data || !response.data.id) {
      return res.status(502).json({ error: "Invalid response from D-ID API" });
    }
    res.json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Talking head generation failed",
      detail: error?.message,
    });
  }
};

module.exports = generateVideoWithDID;
