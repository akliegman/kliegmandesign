const sessions = require("../controllers/sessions.js");
const auth = require("../middleware/auth.js");

module.exports = (app) => {
  app.get("/api/sessions", auth.requireAdminAuth, sessions.findAll);
};
