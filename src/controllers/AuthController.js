const response = require("../helpers/response");
const { hash } = require("../helpers/security");
const AuthModel = require("../models/AuthModel");

module.exports = {
    login: async (req, res) => {
        let body = req.body;
        let model = new AuthModel();
        let result = await model.login(body.username, body.password);
        if (!result.status) {
            res.status(400).send(response(400, "Error", result.message));
            return;
        }

        res.status(200).send(response(200, "success", result.payload));
    },
    register: async (req, res) => {
        let body = req.body;
        let model = new AuthModel();
        try {
            body.password = await hash(body.password);

            let save = await model.register(body);

            res.send(response(200, "Success", save));
        } catch (e) {
            res.status(500).send(response(500, "error", e.message));
        }
    },
};
