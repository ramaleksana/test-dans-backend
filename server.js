const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/config/routers");
const app = express();

class Server {
    constructor(PORT = 8080) {
        this.port = PORT;
    }

    LoadLibrary() {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }

    handleRouter() {
        app.use(routes);
    }

    run() {
        this.LoadLibrary();
        this.handleRouter();

        app.listen(this.port, () => {
            console.log(`Aplikasi berjalan pada port ${this.port}`);
        });
    }
}

module.exports = Server;
