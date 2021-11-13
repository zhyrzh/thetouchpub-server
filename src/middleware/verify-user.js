module.exports = (req, res, next) => {
  console.log(req.session.thetouchpub, "bump");
  if (!req.session.admin)
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized to do this" });

  next();
};
