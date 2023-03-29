const auth = require("../middleware/auth");
const sessions = require("../controllers/sessions");

module.exports = (app) => {
  app.get("/api/login", auth.login, (req, res) => {
    res.status(200).send(req.session);
  });

  app.get("/api/auth", auth.check, (req, res) => {
    res.status(200).send(req.session);
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.set("Authorization", "");
    res.status(200).send({ message: "Logged out" });
  });
};
