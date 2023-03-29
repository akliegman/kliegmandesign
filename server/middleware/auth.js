const basicAuth = require("basic-auth");
const authConfig = require("../config/auth");
const sessions = require("../controllers/sessions");

exports.check = (req, res, next) => {
  if (req.session?.user) {
    return next();
  }
  res.status(401).send({ message: "Unauthorized" });
};

exports.login = (req, res, next) => {
  console.log(req.session);
  const user = basicAuth(req);
  let errors = [];

  const checkUser = (user) => {
    if (!user) {
      errors.push("No user name or password");
      return false;
    }
    if (!user.name && user?.pass) {
      errors.push("No user name");
      return false;
    }
    if (!user.pass && user?.name) {
      errors.push("No password");
      return false;
    }

    return true;
  };

  const checkUserCredentials = (user) => {
    if (user?.name === authConfig.adminUser) {
      return false;
    }
    if (
      user?.name &&
      user?.name !== authConfig.user &&
      user?.pass &&
      user?.pass !== authConfig.pass
    ) {
      errors.push("User name and password are incorrect");
      return false;
    }
    if (user?.name && user?.name !== authConfig.user) {
      errors.push("User name is incorrect");
      return false;
    }
    if (user?.pass && user?.pass !== authConfig.pass) {
      errors.push("Password is incorrect");
      return false;
    }

    return true;
  };

  const checkAdminCredentials = (user) => {
    if (user?.name && user?.name !== authConfig.adminUser) {
      errors.push("Admin user name is incorrect");
      return false;
    }
    if (user?.pass && user?.pass !== authConfig.adminPass) {
      errors.push("Admin password is incorrect");
      return false;
    }

    return true;
  };

  if (!checkUser(user)) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    return res.status(400).send(`Bad Request: ${errors.join(", ")}`);
  }

  if (!checkUserCredentials(user) && !checkAdminCredentials(user)) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    return res.status(400).send(`Bad Request: ${errors.join(", ")}`);
  }

  req.session.role = user.name === authConfig.adminUser ? "admin" : "user";
  req.session.email = req.query.email;
  req.session.user = user.name;
  req.session.ipAddress = req.ip;
  req.session.originalUrl = req.originalUrl;
  req.session.userAgent = req.get("User-Agent");
  req.session.referer = req.get("Referer");
  req.session.expiresAt = Date.now() + authConfig.session.cookie.maxAge;

  const sessionData = {
    sid: "12345",
    user: req.session.user,
    originalUrl: req.session.originalUrl,
    expiresAt: req.session.expiresAt,
    ipAddress: req.session.ipAddress,
    userAgent: req.session.userAgent,
    referer: req.session.referer,
    role: req.session.role,
    email: req.session.email,
  };

  sessions.create(sessionData);

  return next();
};
