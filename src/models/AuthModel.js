const { compare, createToken } = require("../helpers/security");
const Models = require("./base");

class AuthModel extends Models {
    async login(username, password) {
        let user = await this.db.oneOrNone(
            `select * from users where username=$1`,
            [username]
        );

        if (!user) {
            return {
                status: false,
                message: "User not found",
            };
        }

        let comparePassword = await compare(password, user.password);
        if (!comparePassword) {
            return {
                status: false,
                message: "Worng password",
            };
        }

        let dataPayload = {
            email: user.email,
            username: user.username,
            id: user.userId,
        };

        let token = await createToken(dataPayload);

        return {
            status: true,
            payload: {
                ...dataPayload,
                token: token,
            },
            message: "Success",
        };
    }

    async register(body) {
        try {
            return await this.insert("users", body);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = AuthModel;
