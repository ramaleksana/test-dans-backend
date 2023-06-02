const { SALTROUND, SECRET_KEY_JWT_TOKEN } = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    hash: (password) => {
        return bcrypt.hash(password, SALTROUND);
    },
    compare: (password, hashPassword) => {
        return bcrypt.compare(password, hashPassword);
    },
    createToken: (data) => {
        return jwt.sign(data, SECRET_KEY_JWT_TOKEN, {
            expiresIn: 60 * 60,
        });
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, SECRET_KEY_JWT_TOKEN);
        } catch (e) {
            return false;
        }
    },
};
