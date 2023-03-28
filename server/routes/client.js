const clientRoutes = (app, path) => {
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/build", "index.html"),
      (err) => {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
};

module.exports = clientRoutes;
