const db = require("../models");
const Sessions = db.sessions;

exports.create = async (sessionData) => {
  try {
    const session = await Sessions.create(sessionData);
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (req, res) => {
  try {
    const session = await Sessions.findOne({
      where: {
        sid: req.sessionID,
      },
    });
    return session;
  } catch (error) {
    console.log(error);
  }
};
