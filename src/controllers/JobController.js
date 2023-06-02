const response = require("../helpers/response");

const axios = require("axios").default;

const httpApi = axios.create({
    baseURL: "http://dev3.dansmultipro.co.id/api/recruitment/",
    headers: {
        "Content-type": "application/json",
    },
});

module.exports = {
    get: async (req, res) => {
        let queryParams = req.query;
        let q = `?page=${queryParams.page}&description=${queryParams.description}&location=${queryParams.location}`;
        q += queryParams.full_time ? `&full_time=true` : "";
        let callApi = await httpApi.get(`positions.json${q}`);

        res.send(response(200, "Success", callApi.data));
    },
    detail: async (req, res) => {
        let id = req.params.id;
        let callApi = await httpApi.get(`positions/${id}`);

        res.send(response(200, "Success", callApi.data));
    },
};
