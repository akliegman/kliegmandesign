const db = require("../models");
const Sessions = db.sessions;

exports.create = async (req, res, next) => {
  try {
    const sessionData = {
      sid: req.session.sid,
      user: req.session.user.user,
      email: req.session.user.email,
      role: req.session.user.role,
      ipAddress: req.session.ipAddress,
      userAgent: req.session.userAgent,
      referer: req.session.referer,
      expiresAt: req.session.expiresAt,
    };

    const session = await Sessions.create(sessionData);

    next();
  } catch (error) {
    console.log(error);
  }
};
