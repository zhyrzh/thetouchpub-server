require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const session = require("./middleware/session");
const cookieParser = require("cookie-parser");
dayjs.extend(customParseFormat);

app.set("trust proxy", 1);
app.enable("trust proxy");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://thetouchpub.netlify.app",
      "https://thetouchpublication.site",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(session);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50MB" }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(dayjs("2021-11-09 09:44:08").format("MMM D, YYYY HH:MM:ss A"));
});
