const AuthController = require("../controllers/AuthController");
const JobController = require("../controllers/JobController");
const middleware = require("../middleware");

const routes = require("express").Router();

routes.route("/login").post(AuthController.login);
routes.route("/register").post(AuthController.register);

routes.route("/job").get(middleware, JobController.get);
routes.route("/job/:id").get(middleware, JobController.detail);

module.exports = routes;
