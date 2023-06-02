const database = require("../config/database");

class Models {
    constructor() {
        this.db = database;
    }

    query(sql = "") {
        return this.db
            .query(sql)
            .then((res) => {
                return res;
            })
            .catch((e) => {
                throw new Error(e);
            });
    }

    insert(table = "", data = null) {
        let sql = `INSERT INTO ${table}${generateDataInsert(data)} RETURNING *`;
        return this.db
            .oneOrNone(sql)
            .then((res) => {
                return res;
            })
            .catch((e) => {
                throw new Error(e);
            });
    }
}

const generateDataInsert = (params = {}) => {
    let data = Object.keys(params);
    let result = data.reduce(
        (r, i, k) => {
            if (k === 0) {
                r.column += "(";
                r.value += "(";
            }
            r.column += `"${i}"`;
            r.value += `'${params[i]}'`;
            if (k !== data.length - 1) {
                r.column += ", ";
                r.value += ", ";
            }

            if (k === data.length - 1) {
                r.column += ")";
                r.value += ")";
            }

            return r;
        },
        { column: "", value: "" }
    );
    return result.column + " VALUES" + result.value;
};

module.exports = Models;
