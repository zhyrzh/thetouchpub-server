const authRouter = require("express").Router();
const verifyUser = require("../middleware/verify-user");

// VERIFY user
authRouter.get("/", verifyUser, (req, res) => {
  res.status(200).json({ success: true, message: "user verified" });
});

// LOGIN user
authRouter.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "invalid credentials" });

  if (
    username !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASSWORD
  )
    return res
      .status(400)
      .json({ success: false, message: "invalid credentials" });

  req.session.admin = username;
  return res
    .status(200)
    .json({ success: true, message: "you are now logged in" });
});

authRouter.delete("/", (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res.json({ success: false, message: "something went wrong" });

    res.status(200).json({ success: true, message: "logged out" });
  });
});

module.exports = authRouter;
