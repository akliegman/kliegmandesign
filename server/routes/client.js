const clientRoutes = (app) => {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
};

module.exports = clientRoutes;
