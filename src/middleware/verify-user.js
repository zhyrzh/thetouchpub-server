module.exports = (req, res, next) => {
  console.log(req.session, "bump");
  console.log(req.cookie, "bump cookie");
  if (!req.session.admin)
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized to do this" });

  next();
};
