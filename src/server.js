require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50MB" }));
app.use(routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
