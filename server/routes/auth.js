const auth = require("../middleware/auth");
const sessions = require("../controllers/sessions");

module.exports = (app) => {
  app.get(
    "/api/login",
    auth.login,
    auth.slackLoggedIn,
    sessions.create,
    (req, res) => {
      res.status(200).send(req.session);
    }
  );

  app.get("/api/auth", auth.check);

  app.get("/api/logout", auth.logout);
};
