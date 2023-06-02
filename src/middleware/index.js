const response = require("../helpers/response");
const { verifyToken } = require("../helpers/security");

module.exports = async (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res
            .status(401)
            .send(response(401, "Error", "Failed to authenticate token"));
    }

    token = token.split("Bearer ");
    token = token[1];

    if (!token) {
        return res
            .status(401)
            .send(response(401, "Error", "Failed to authenticate token"));
    }

    let verify = await verifyToken(token, false);

    if (!verify) {
        return res
            .status(401)
            .send(response(401, "Error", "Failed to authenticate token"));
    }

    req.decoded = verify.data;

    next();
};
