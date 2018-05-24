const request = require("superagent");
const token = "";

module.exports = app => {
  app.get("/user/signin/callback", (req, res, next) => {
    const { query } = req;
    const { code } = query;
    if (!code) {
      res.send({
        success: false,
        message: "Error: no code"
      });
    }
    // POST
    console.log("code ", code);
    request
      .post("https://github.com/login/oauth/access_token")
      .send({
        client_id: "b4835d3d7e23771765a8",
        client_secret: "6e39a862e59d57249cff7a9928a694d3945a9c97",
        code: code
      })
      .set("Accept", "application/json")
      .then(result => {
        token = result.body.token;
        res.send(data);
      });
  });

  app.get("/user/", (req, res, next) => {
    request
      .get("https://api.github.com/user")
      .set("Authorization", "token " + token)
      .then(result => {
        res.send(result.body);
      });
  });
};
