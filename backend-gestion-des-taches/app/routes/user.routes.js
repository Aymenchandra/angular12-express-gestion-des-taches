const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { verifySignUp } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", controller.findAllEmploye);
  app.get("/api/users/:id", controller.findOneCompte);
  app.delete("/api/users/:id", controller.deleteOneCompte);
  app.put("/api/users/:id",[verifySignUp.checkDuplicateEmail], controller.updateCompte);
  
};
