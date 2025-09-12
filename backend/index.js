const express = require("express");
const path = require("path");
const router = require("./router");
const cors = require("cors");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
