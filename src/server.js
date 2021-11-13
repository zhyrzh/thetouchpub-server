require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const session = require("./middleware/session");
dayjs.extend(customParseFormat);

app.use(
  cors({
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : "https://thetouchpub.netlify.app",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Forwarded-Proto",
      "Cookie",
      "Set-Cookie",
    ],
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Forwarded-Proto",
      "Cookie",
      "Set-Cookie",
    ],
    credentials: true,
  })
);
app.use(session);
app.set("trust proxy", 1);
app.enable("trust proxy");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50MB" }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  const date_now = dayjs();
  console.log(dayjs("2021-11-09 09:44:08").format("MMM D, YYYY HH:MM:ss A"));
});
