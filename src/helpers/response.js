module.exports = (code = 200, message = "", payload = null) => {
    return {
        code: code,
        message: message,
        payload: payload,
    };
};
