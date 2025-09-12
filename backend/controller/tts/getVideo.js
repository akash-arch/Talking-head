const axios = require("axios");

const getVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.d-id.com/talks/${id}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.DID_API_KEY + ":"
        ).toString("base64")}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching video:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch video", detail: error.message });
  }
};

module.exports = getVideo;
