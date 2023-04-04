const basicAuth = require("basic-auth");
const authConfig = require("../config/auth");
const { WebClient } = require("@slack/web-api");

const web = new WebClient(process.env.SLACK_BOT_TOKEN);

exports.slackLoggedIn = async (req, res, next) => {
  const email = req.session?.user?.email || "no email";
  const date = new Date().toLocaleString();
  const ip = req.ip;
  const message = `New user logged in: ${email} on ${date} from IP Address: ${ip}.`;

  try {
    if (process.env.ENV !== "local") {
      const result = await web.chat.postMessage({
        channel: process.env.SLACK_CHANNEL_ID,
        text: message,
      });
      console.log("Slack message sent: ", result.ts);
    } else {
      console.log("Slack message sent for session");
    }
  } catch (error) {
    console.log(error);
  }

  next();
};

exports.session = async (req, res) => {
  const date = new Date().toLocaleString();
  const ip = req.ip;

  if (req.session.isNew) {
    req.session.isNew = false;

    try {
      if (process.env.ENV !== "local") {
        const result = await web.chat.postMessage({
          channel: process.env.SLACK_CHANNEL_ID,
          text: `New session started on ${date} from IP Address: ${ip}.`,
        });
        console.log("Slack message sent: ", result.ts);
      } else {
        console.log("Slack message sent for login");
      }
    } catch (error) {
      console.log(error);
    }

    return res.status(200).send({ isNew: true });
  }
  return res.status(200).send({ isNew: false });
};

exports.check = (req, res) => {
  if (req.session.user) {
    return res.status(200).send(req.session);
  }
  return res.status(200).send({ message: "Unauthorized" });
};

exports.login = (req, res, next) => {
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
    const allowedPasswords = authConfig.pass.split(",");
    if (
      user?.name &&
      user?.name !== authConfig.user &&
      user?.pass &&
      !allowedPasswords.includes(user?.pass)
    ) {
      errors.push("User name and password are incorrect");
      return false;
    }
    if (user?.name && user?.name !== authConfig.user) {
      errors.push("User name is incorrect");
      return false;
    }
    if (user?.pass && !allowedPasswords.includes(user?.pass)) {
      errors.push("Password is incorrect");
      return false;
    }

    return true;
  };

  const checkAdminCredentials = (user) => {
    if (user?.pass && user?.pass !== authConfig.adminPass) {
      errors.push("Password is incorrect");
      return false;
    }

    return true;
  };

  if (!checkUser(user)) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    console.log(`Bad Request: ${errors.join(", ")}`);
    return res.status(400).send(`Bad Request: ${errors.join(", ")}`);
  }

  if (user?.name === authConfig.adminUser && !checkAdminCredentials(user)) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    console.log(`Bad Request: ${errors.join(", ")}`);
    return res.status(400).send(`Bad Request: ${errors.join(", ")}`);
  }

  if (user?.name !== authConfig.adminUser && !checkUserCredentials(user)) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    console.log(`Bad Request: ${errors.join(", ")}`);
    return res.status(400).send(`Bad Request: ${errors.join(", ")}`);
  }

  req.session.user = {
    user: user.name,
    email: req.query.email || null,
    role: user.name === authConfig.adminUser ? "admin" : "user",
  };

  req.session.ipAddress = req.ip;
  req.session.sid = Date.now();
  req.session.userAgent = req.get("User-Agent");
  req.session.referer = req.get("Referer");
  req.session.expiresAt = Date.now() + authConfig.session.cookie.maxAge;

  console.log(
    `Login: ${
      req.session.user.email || req.session.user.user
    } at ${new Date().toLocaleString()}`
  );

  next();
};

exports.logout = async (req, res) => {
  console.log(
    `Logout: ${
      req.session?.user?.email || req.session?.user?.user
    } at ${new Date().toLocaleString()}`
  );
  try {
    await req.session.destroy((err) => {
      if (err) {
        return res.status(400).send("Error: Could not log out");
      } else {
        return res.status(200).send("Logged out");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.requireAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.status(400).send({ message: "Unauthorized" });
};

exports.requireAdminAuth = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.status(400).send({ message: "Unauthorized" });
};
